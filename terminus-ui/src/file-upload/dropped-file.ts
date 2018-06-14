import {
  BehaviorSubject,
  fromEvent,
  Observable,
  of,
} from 'rxjs';
import {
  combineLatest,
  delay,
  take,
  tap,
  withLatestFrom,
  switchMap
} from 'rxjs/operators';

import { TsFileUploadSizeConstraints } from './size-constraints';
import { TsImageDimensions } from './image-dimensions';
import {
  TsFileAcceptedMimeTypes,
  TS_ACCEPTED_MIME_TYPES,
} from './mime-types';



// use withlatestfrom to get values of all my observables
// filter until all observables have value
// then complete all observables by using take(1) or calling next/complete


const BYTES_PER_KB = 1024;

export class TsDroppedFile {
  public mimeType: string;
  public dimensions: TsImageDimensions | undefined;
  public size: number | undefined;
  public valid = false;
  private fileLoaded$!: Observable<Event>;
  private imgLoaded$!: Observable<Event>;
  private fileReader: FileReader = new FileReader();
  private img = new Image();
  private typeIsValid$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private sizeIsValid$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private dimensionsAreValid$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  // Verify:
  //  accepted mimetype
  //  valid size
  // IF type is image
  //  check dimensions

  constructor(
    public file: File,
    private sizeConstraints: TsFileUploadSizeConstraints | undefined,
    private maxSize: number,
  ) {
    console.warn('TsDroppedFile');
    this.mimeType = this.file.type;
    this.size = Math.ceil(this.file.size / BYTES_PER_KB);

    // Validate mime-type
    if (TS_ACCEPTED_MIME_TYPES.indexOf(this.file.type) >= 0) {
      this.typeIsValid$.next(true);
    }

    // Validate file size
    if (this.size <= this.maxSize) {
      this.sizeIsValid$.next(true);
    }

    // Check dimensions if any image type
    if (this.isImage) {
      console.info('is type image');
      this.determineImageDimensions();
    } else {
      // Not an image so set dimension validation to true
      this.dimensionsAreValid$.next(true);
    }

    if (this.isCSV) {
      console.log('is type csv');
      // Currently not validating since there is no consistent way to do so
    }

    // TODO: Currently this is called before all validation completes because determineImageDimensions is async
    setTimeout(() => {
      this.isValidFile().subscribe((v) => {
        console.warn('Final File Validation: ', v);
        this.valid = v;
      });
    }, 20);

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

  private isValidFile() {
    return this.typeIsValid$.pipe(
      withLatestFrom(this.dimensionsAreValid$, this.sizeIsValid$),
      switchMap((v, index) => {
        console.log('Validation results: ', v, index);
        const validType = v[0];
        const validDimensions = v[1];
        const validSize = v[2];
        console.log('validDimensions', validDimensions);

        // For CSV files we only care about the type validation
        if (this.isCSV && validType) {
          return of(true);
        }

        if (this.isImage && validType && validDimensions && validSize) {
          return of(true);
        }

        return of(false);
      }),
    );
  }



  private determineImageDimensions() {
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
        this.dimensionsAreValid$.next(this.validateImageDimensions(this.sizeConstraints));
      }),
      take(1),
    );

    // Read the file (this triggers the FileReader load event)
    this.fileReader.readAsDataURL(this.file);

    // Subscriptions are needed so Observables fire
    this.imgLoaded$.subscribe((v) => {});
    this.fileLoaded$.subscribe((v) => {});
  }


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
        console.log('image valid');
        return true;
      }
    }

    return false;
  }

}
