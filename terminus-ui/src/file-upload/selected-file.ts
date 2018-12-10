import { BehaviorSubject } from 'rxjs';

import { TsFileImageDimensionConstraints } from './image-dimension-constraints';
import { TsImageDimensions } from './image-dimensions';
import { TsFileAcceptedMimeTypes, TS_ACCEPTED_MIME_TYPES } from './mime-types';
import { ImageRatio } from './file-upload.module';


/**
 * The structure of the object to track file validations internally
 */
export interface TsFileValidations {
  fileType: boolean;
  fileSize: boolean;
  imageDimensions: boolean;
  imageRatio: boolean;
}


/**
 * The number of bytes per kilobyte (for calculations)
 */
const BYTES_PER_KB = 1024;
const typesWithoutDimensionValidation = ['text/csv', 'video/mp4'];


/**
 * Manage a single selected file
 *
 * @param file - The selected file
 * @param imageDimensionConstraints - An array of image dimension constraints {@link TsFileImageDimensionConstraints}
 * @param typeConstraint - An array of allowed MIME types {@link TsFileAcceptedMimeTypes}
 * @param maxSize - The maximum size in kilobytes
 * @param ratioConstraint - An array of allowed image ratios in form of ImageRatio
 */
export class TsSelectedFile {
  public name: string | undefined;
  public mimeType: string;
  public dimensions: TsImageDimensions | undefined;
  public ratio: number | undefined;
  public size: number;
  public validations: TsFileValidations = {
    fileType: false,
    fileSize: false,
    imageDimensions: false,
    imageRatio: false,
  };
  private fileReader: FileReader = new FileReader();

  /**
   * Only needed to appease TypeScript when defining `fileLoaded$`
   */
  private fileReference?: TsSelectedFile;

  /**
   * BehaviorSubject to alert consumers when all calculations are complete
   */
  public fileLoaded$: BehaviorSubject<TsSelectedFile | undefined> = new BehaviorSubject(this.fileReference);


  constructor(
    public file: File,
    private imageDimensionConstraints: TsFileImageDimensionConstraints | undefined,
    private typeConstraint: TsFileAcceptedMimeTypes[] | undefined,
    private maxSize: number,
    private ratioConstraint: Array<ImageRatio> | undefined,
  ) {
    this.mimeType = this.file.type;
    this.size = Math.ceil(this.file.size / BYTES_PER_KB);
    this.name = this.file.name;

    // Begin the validation chain by validating image dimensions
    this.determineImageDimensions(() => {
      // Validate mime-type
      // istanbul ignore else
      if (this.typeConstraint && this.typeConstraint.indexOf(this.file.type as TsFileAcceptedMimeTypes) >= 0) {
        this.validations.fileType = true;
      }

      // Validate file size
      // istanbul ignore else
      if (this.size <= this.maxSize) {
        this.validations.fileSize = true;
      }

      // Emit the file once all calculations are complete
      this.fileLoaded$.next(this);
    });
  }

  /**
   * Get the image width
   *
   * @return The width of the image if it exists
   */
  public get width(): number {
    return this.dimensions ? this.dimensions.width : 0;
  }

  /**
   * Get the image height
   *
   * @return The height of the image if it exists
   */
  public get height(): number {
    return this.dimensions ? this.dimensions.height : 0;
  }

  /**
   * Get a boolean representing if the file is a CSV
   *
   * @return Is a CSV
   */
  public get isCSV(): boolean {
    return this.mimeType.includes('csv');
  }

  /**
   * Get a boolean representing if the file is an image
   *
   * @return Is an image
   */
  public get isImage(): boolean {
    return this.mimeType.includes('image');
  }

  /**
   * Get a boolean representing if the file is a video
   *
   * @return Is a video
   */
  public get isVideo(): boolean {
    return this.mimeType.includes('video');
  }

  /**
   * Get the file contents
   *
   * @return The FileReader results
   */
  public get fileContents(): string {
    return this.fileReader.result;
  }

  /**
   * Get the validation status
   *
   * @return Is valid
   */
  public get isValid(): boolean {
    return (this.validations.fileType && this.validations.fileSize && this.validations.imageDimensions);
  }


  /**
   * Determine the dimensions and ratio of an image
   *
   * @param callback - A function to call after the dimensions have been calculated (asynchronously)
   */
  private determineImageDimensions(callback?: Function): void {
    let img: HTMLImageElement | undefined;

    if (typeNeedsDimensionValidation(this.mimeType as TsFileAcceptedMimeTypes)) {
      // Create an image so that dimensions can be determined
      img = new Image();

      this.fileReader.onload = (v: Event) => {
        // istanbul ignore else
        if (img) {
          img.src = this.fileReader.result;
        }
      };
      img.onload = (v: Event) => {
        // istanbul ignore else
        if (img) {
          this.dimensions = new TsImageDimensions(img.naturalWidth, img.naturalHeight);
        }

        // Validate dimensions and ratio
        this.validations.imageDimensions = this.validateImageDimensions(this.imageDimensionConstraints);
        this.validations.imageRatio = this.validateImageRatio(this.ratioConstraint);
        // Call the callback if one exists
        // istanbul ignore else
        if (callback) {
          callback();
        }
      };
    } else {
      // We are not dealing with an image:
      // istanbul ignore else
      if (callback) {
        callback();
      }

      // Since this is not an image, set dimension/ratio validation to `true` to 'bypass'
      this.validations.imageDimensions = true;
      this.validations.imageRatio = true;
    }

    // Read the file (this triggers the FileReader load event)
    this.fileReader.readAsDataURL(this.file);
  }


  /**
   * Validate the image dimensions
   *
   * @param constraints - The constraints this the image dimensions must fit
   * @return The validation result
   */
  private validateImageDimensions(constraints: TsFileImageDimensionConstraints | undefined): boolean {
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

  /**
   * Validate the image ratios
   *
   * @param constraints - The constrains that the image ratio must fit
   * @return The validation result
   */

  private validateImageRatio(constraints: Array<ImageRatio> | undefined): boolean {
    if (!constraints) {
      return true;
    }

    const ratios = constraints.map((r) => r.widthRatio / r.heightRatio);
    for (const r of ratios) {
      const ratio = this.width / this.height;
      if (this.isSame(r, ratio)) {
        return true;
      }
    }

    return false;
  }

  /**
   * A utility function to determine whether two numbers are the same
   * @param number1 - one number
   * @param number2 - another number
   * @return Whether these two numbers are the same
   */

  private isSame(number1: number, number2: number) {
    if (Math.abs((number1 - number2) / number1) < 0.001) {
      return true;
    } else {
      return false;
    }
  }

}


/**
 * Determine if the passed in type needs dimension validation
 *
 * @param type - The file type
 * @return If it needs dimension validation
 */
function typeNeedsDimensionValidation(type: TsFileAcceptedMimeTypes): boolean {
  const allTypes = TS_ACCEPTED_MIME_TYPES.slice();
  const itemsNeedingValidation = allTypes.filter((item) => {
    return !typesWithoutDimensionValidation.includes(item);
  });
  return itemsNeedingValidation.indexOf(type) >= 0;
}
