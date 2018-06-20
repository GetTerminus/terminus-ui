import {
  fromEvent,
  Observable,
} from 'rxjs';
import {
  delay,
  take,
  tap,
} from 'rxjs/operators';

import { TsFileUploadSizeConstraints } from './size-constraints';
import { TsImageDimensions } from './image-dimensions';
import {
  TsFileAcceptedMimeTypes,
  TS_ACCEPTED_MIME_TYPES,
} from './mime-types';


/**
 * Verify a type is one of the allowed MIME types
 *
 * @param x - The MIME type to test
 * @return If the MIME type is allowed
 */
export function isAllowedMimeType(x: any): x is TsFileAcceptedMimeTypes {
  return TS_ACCEPTED_MIME_TYPES.includes(x);
}

export interface TsFileValidations {
  fileType: boolean;
  fileSize: boolean;
  imageDimensions: boolean;
}

const BYTES_PER_KB = 1024;


export class TsDroppedFile {
  public name: string | undefined;
  public mimeType: string;
  public dimensions: TsImageDimensions | undefined;
  public size: number;
  public validations: TsFileValidations = {
    fileType: false,
    fileSize: false,
    imageDimensions: false,
  };
  private fileLoaded$!: Observable<Event>;
  private imgLoaded$!: Observable<Event>;
  private fileReader: FileReader = new FileReader();
  private img: HTMLImageElement = new Image();


  constructor(
    public file: File,
    private sizeConstraints: TsFileUploadSizeConstraints | undefined,
    private maxSize: number,
  ) {
    console.warn('TsDroppedFile');
    this.mimeType = this.file.type;
    this.size = Math.ceil(this.file.size / BYTES_PER_KB);
    this.name = this.file.name;

    // Begin the validation chain by validating image dimensions
    this.determineImageDimensions(() => {
      // Validate mime-type
      if (isAllowedMimeType) {
        console.log('mimeType: ', this.file.type);
        console.log('check: ', TS_ACCEPTED_MIME_TYPES.includes(this.file.type as TsFileAcceptedMimeTypes));
        if (TS_ACCEPTED_MIME_TYPES.includes(this.file.type as TsFileAcceptedMimeTypes)) {
          this.validations.fileType = true;
        }
      }

      // Validate file size
      if (this.size <= this.maxSize) {
        this.validations.fileSize = true;
      }
    });

    // TODO: FOR DEV
    setTimeout(() => {
      console.log('this: ', this);
    }, 100);
  }


  public get width(): number {
    return this.dimensions ? this.dimensions.width : 0;
  }

  public get height(): number {
    return this.dimensions ? this.dimensions.height : 0;
  }

  public get isCSV(): boolean {
    return this.mimeType.includes('csv');
  }

  public get isImage(): boolean {
    return this.mimeType.includes('image');
  }

  public get fileContents(): string {
    return this.fileReader.result;
  }

  public get isValid(): boolean {
    return (this.validations.fileType && this.validations.fileSize && this.validations.imageDimensions);
  }


  /**
   * Determine the dimensions of an image
   *
   * @param callback - A function to call after the dimensions have been calculated (asynchronously)
   */
  private determineImageDimensions(callback?: Function): void {
    console.log('determineImageDimensions: ', !this.isImage);
    // If we are not dealing with an image, exit
    if (!this.isImage) {
      if (callback) {
        callback();
      }

      // Since this is not an image, set dimension validation to true to 'bypass'
      this.validations.imageDimensions = true;
      return;
    }

    // Once the file is parsed, set the base64'd image as the source of the fake image
    this.fileLoaded$ = fromEvent(this.fileReader, 'load').pipe(
      // NOTE: This delay is needed since the image will have dimensions of 0 at first.
      delay(5),
      tap((v: Event) => {
        this.img.src = this.fileReader.result;
      }),
      take(1),
    );

    // Set the size once the fake image has loaded
    this.imgLoaded$ = fromEvent(this.img, 'load').pipe(
      tap((v: Event) => {
        this.dimensions = new TsImageDimensions(this.img.naturalWidth, this.img.naturalHeight);

        // Validate dimensions
        this.validations.imageDimensions = this.validateImageDimensions(this.sizeConstraints);

        // Call the callback if one exists
        if (callback) {
          callback();
        }
      }),
      take(1),
    );

    // Read the file (this triggers the FileReader load event)
    this.fileReader.readAsDataURL(this.file);

    // Subscriptions are needed so Observables fire
    this.imgLoaded$.subscribe((v) => {});
    this.fileLoaded$.subscribe((v) => {});
  }


  /**
   * Validate the image dimensions
   *
   * @param constraints - The constraints that the image dimensions must fit
   * @return The validation result
   */
  private validateImageDimensions(constraints: TsFileUploadSizeConstraints | undefined): boolean {
    if (!constraints || constraints.length < 1) {
      return true;
    }

    const width = this.width;
    const height = this.height;

    for (const constraint of constraints) {
      const heightIsValid: boolean = height >= constraint.height.min && height <= constraint.height.max;
      const widthIsValid: boolean = width >= constraint.width.min && width <= constraint.width.max;

      if (heightIsValid && widthIsValid) {
        return true;
      }
    }

    return false;
  }

}
