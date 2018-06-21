import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
  isDevMode,
} from '@angular/core';
import {
  FormControl,
  ValidationErrors,
} from '@angular/forms';
import {
  inputHasChanged,
  TsDocumentService,
} from '@terminus/ngx-tools';
import {
  coerceArray,
  coerceBooleanProperty,
  coerceNumberProperty,
} from '@terminus/ngx-tools/coercion';

import { TS_SPACING } from './../spacing/spacing.constant';
import { isDragEvent } from './../utilities/type-coercion/is-drag-event';
import { isHTMLInputElement } from './../utilities/type-coercion/is-html-input-element';
import { TsDroppedFile } from './dropped-file';
import {
  TsFileAcceptedMimeTypes,
  TS_ACCEPTED_MIME_TYPES,
} from './mime-types';
import { TsFileImageDimensionConstraints } from './image-dimension-constraints';
import { TsStyleThemeTypes } from '../utilities/types/style-theme.types';
import { TsDropProtectionService } from './drop-protection.service';


/**
 * The maximum file size in bytes
 *
 * NOTE: Currently nginx has a hard limit of 10mb
 */
const MAXIMUM_KILOBYTES_PER_FILE = 10 * 1024;


/**
 * Unique ID for each instance
 */
let nextUniqueId = 0;


/**
 * This is the file-upload UI Component
 *
 * #### QA CSS CLASSES
 * - `qa-file-upload`: Placed on the primary container
 * - `qa-file-upload-empty`: Placed on the container shown when no file exists
 * - `qa-file-upload-preview`: The file preview container
 * - `qa-file-upload-name`: The filename container
 * - `qa-file-upload-remove`: The button to remove a loaded file
 * - `qa-file-upload-prompt`: The button to open the native file picker
 * - `qa-file-upload-validation-messages`: The container for validation messages
 * - `qa-file-upload-hints`: The container for input hints
 * - `qa-file-upload-progress`: The upload progress bar
 *
 * @example
 * <ts-file-upload
 *              item="Value"
 * ></ts-file-upload>
 *
 * <example-url>https://goo.gl/ieUPaG</example-url>
 */
@Component({
  selector: 'ts-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  host: {
    class: 'ts-file-upload',
  },
  exportAs: 'tsFileUpload',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TsFileUploadComponent implements OnInit , OnChanges, OnDestroy, AfterContentInit {
  /**
   * Define the default component ID
   */
  protected _uid = `ts-file-upload-${nextUniqueId++}`;

  /**
   * A flag that represents an in-progress drag movement
   */
  public dragInProgress: boolean = false;

  /**
   * Expose a list of names for selected file
   */
  public file: TsDroppedFile | undefined;

  /**
   * Define the flexbox layout gap
   */
  public layoutGap: string = TS_SPACING.small[0];

  /**
   * Store reference to the generated file input
   */
  private virtualFileInput: HTMLInputElement;

  /**
   * Create a form control to manage validation messages
   */
  public control = new FormControl();

  /**
   * Reflect the ID back to the DOM
   */
  @HostBinding('attr.id')
  public publicID: string = this.id;

  /**
   * Provide access to the file preview element
   */
  @ViewChild('preview')
  public preview!: ElementRef;

  /**
   * Compose and expose all hints to the template
   *
   * @return An array of hints
   */
  public get hints(): string[] {
    const hints: string[] = [];
    const types: string = this.acceptedTypes.slice().map((v) => {
      return v.split('/')[1];
    }).join(', ');

    if ((this.acceptedTypes.indexOf('text/csv') < 0) && this.supportedImageDimensions) {
      hints.push(`Must be a valid dimension: ${this.supportedImageDimensions}`);
    }

    hints.push(`Must be ${types}`);
    hints.push(`Must be under ${this.maximumKilobytesPerFile}kb`);

    return hints;
  }

  /**
   * Compose supported image dimensions as a string
   */
  private get supportedImageDimensions(): string {
    let myString = '';

    if (this.dimensionConstraints) {
      const constraints = this.dimensionConstraints.slice();

      for (const c of constraints) {
        // If not the first item, add a comma between the last item and the new
        if (myString.length > 0) {
          myString += ', ';
        }

        // If a fixed size
        if ((c.height.min === c.height.max) && (c.width.min === c.width.max)) {
          myString += `${c.height.min}x${c.height.min}`;
        } else {
          // Dealing with a size range
          const height = (c.height.min === c.height.max) ? c.height.min : `${c.height.min}-${c.height.max}`;
          const width = (c.width.min === c.width.max) ? c.width.min : `${c.width.min}-${c.width.max}`;
          const range = `${height}x${width}`;
          myString += range;
        }
      }

      return myString;
    } else {
      return '';
    }
  }

  /**
   * Define the accepted mime types
   */
  @Input()
  public set accept(value: TsFileAcceptedMimeTypes | TsFileAcceptedMimeTypes[]) {
    if (!value) {
      this._acceptedTypes = TS_ACCEPTED_MIME_TYPES.slice();
    } else {
      this._acceptedTypes = coerceArray(value);
    }
  }
  // NOTE: Setter name is different to allow different types passed in vs returned
  public get acceptedTypes(): TsFileAcceptedMimeTypes[] {
    return this._acceptedTypes;
  }
  private _acceptedTypes: TsFileAcceptedMimeTypes[] = TS_ACCEPTED_MIME_TYPES.slice();

  /**
   * Define an ID for the component
   */
  @Input()
  set id(value: string) {
    this._id = value || this._uid;
  }
  get id(): string {
    return this._id;
  }
  protected _id!: string;

  /**
   * Define the maximum file size in kilobytes
   */
  @Input()
  public set maximumKilobytesPerFile(value: number) {
    if (!value) {
      return;
    }

    this._maximumKilobytesPerFile = value;
  }
  public get maximumKilobytesPerFile(): number {
    return this._maximumKilobytesPerFile;
  }
  private _maximumKilobytesPerFile: number = MAXIMUM_KILOBYTES_PER_FILE;

  /**
   * Define if multiple files may be uploaded
   */
  @Input()
  public set multiple(value: boolean) {
    this._multiple = coerceBooleanProperty(value);
  }
  public get multiple(): boolean {
    return this._multiple;
  }
  private _multiple: boolean = true;

  /**
   * Define the upload progress
   */
  @Input()
  public set progress(value: number) {
    this._progress = coerceNumberProperty(value);
  }
  public get progress(): number {
    return this._progress;
  }
  private _progress: number = 0;

  /**
   * Seed an existing file (used for multiple upload hack)
   */
  @Input()
  public set seedFile(file: File | undefined) {
    this._seedFile = file;

    if (file) {
      const newFile = new TsDroppedFile(file, this.dimensionConstraints, this.acceptedTypes, this.maximumKilobytesPerFile);
      this.dropped.emit(newFile);
      this.setUpNewFile(newFile);
    }

    // Trigger change detection to update after creating the TsDroppedFile (some validations won't be registered correctly without this)
    this.changeDetectorRef.markForCheck();
  }
  public get seedFile(): File | undefined {
    return this._seedFile;
  }
  private _seedFile: File | undefined;

  /**
   * Define maximum and minimum pixel dimensions for images
   */
  @Input()
  public set dimensionConstraints(value: TsFileImageDimensionConstraints | undefined) {
    this._sizeConstraints = value;
  }
  public get dimensionConstraints(): TsFileImageDimensionConstraints | undefined {
    return this._sizeConstraints;
  }
  private _sizeConstraints: TsFileImageDimensionConstraints | undefined;

  /**
   * Define the theme. See {@link TsStyleThemeTypes}.
   */
  @Input()
  public theme: TsStyleThemeTypes = 'primary';

  /**
   * Event Emitters
   */
  @Output()
  public hoverBegin: EventEmitter<boolean> = new EventEmitter();

  @Output()
  public hoverEnd: EventEmitter<boolean> = new EventEmitter();

  @Output()
  public dropped: EventEmitter<TsDroppedFile> = new EventEmitter();

  @Output()
  public droppedMultiple: EventEmitter<File[]> = new EventEmitter();

  @Output()
  public cleared: EventEmitter<boolean> = new EventEmitter();

  /**
   * HostListeners
   */
  @HostListener('dragover', ['$event'])
  public handleDragover(event: DragEvent) {
    this.preventAndStopEventPropagation(event);
    this.hoverBegin.emit(true);
    this.dragInProgress = true;
  }

  @HostListener('dragleave', ['$event'])
  public handleDragleave(event: DragEvent) {
    this.preventAndStopEventPropagation(event);
    this.hoverEnd.emit(true);
    this.dragInProgress = false;
  }

  @HostListener('drop', ['$event'])
  public handleDrop(event: DragEvent) {
    this.preventAndStopEventPropagation(event);
    this.dragInProgress = false;
    this.collectFilesFromEvent(event);
  }

  @HostListener('click')
  public handleClick() {
    this.promptForFiles();
  }

  @HostListener('keydown.enter')
  public handleEnter() {
    this.promptForFiles();
    this.elementRef.nativeElement.blur();
  }


  constructor(
    private documentService: TsDocumentService,
    private elementRef: ElementRef,
    private changeDetectorRef: ChangeDetectorRef,
    private dropProtectionService: TsDropProtectionService,
  ) {
    this.virtualFileInput = this.createFileInput();

    // Force setter to be called in case the ID was not specified.
    this.id = this.id;
  }


  public ngOnInit(): void {
    this.dropProtectionService.add();
  }


  /**
   * Update the virtual file imput when the change event is fired
   */
  public ngAfterContentInit(): void {
    this.virtualFileInput.addEventListener('change', this.onVirtualInputElementChange.bind(this));
    this.updateVirtualFileInputAttrs(this.virtualFileInput);
  }


  /**
   * Update the virtual file input's attrs when specific inputs change
   *
   * @param changes - The changed inputs
   */
  public ngOnChanges(changes: SimpleChanges): void {
    if (inputHasChanged(changes, 'multiple') || inputHasChanged(changes, 'accept')) {
      this.updateVirtualFileInputAttrs(this.virtualFileInput);
    }
  }


  /**
   * Remove event listener when the component is destroyed
   */
  public ngOnDestroy(): void {
    if (this.virtualFileInput) {
      this.virtualFileInput.removeEventListener('change', this.onVirtualInputElementChange.bind(this));
    }
    this.dropProtectionService.remove();
  }


  /**
   * Open the file selection window when the user interacts
   */
  public promptForFiles(): void {
    this.virtualFileInput.click();
  }


  /**
   * Remove a loaded file, clear validation and emit event
   *
   * @param event - The event
   */
  public removeFile(event: Event): void {
    this.file = undefined;
    this.clearValidationMessages();
    this.preventAndStopEventPropagation(event);
    this.cleared.emit(true);
  }


  /**
   * Create a virtual file input
   *
   * @return The HTMLInputElement for file collection
   */
  private createFileInput(): HTMLInputElement {
    const input: HTMLInputElement = this.documentService.document.createElement('input');
    input.setAttribute('type', 'file');
    input.style.display = 'none';
    return input;
  }


  /**
   * Get all dropped files from an event
   *
   * @param event - The event
   */
  private collectFilesFromEvent(event: DragEvent | Event): void {
    let files: FileList | undefined;

    if (isDragEvent(event)) {
      files = event.dataTransfer.files;
    } else if (event.target) {
      if (isHTMLInputElement(event.target)) {
        files = event.target.files ? event.target.files : undefined;
      }
    }

    if (!files && isDevMode()) {
      throw Error('TsFileUpload: Event contained no file.');
    }

    // Convert the FileList to an Array
    const filesArray: File[] = files ? Array.from(files) : [];

    // If multiple were dropped, simply emit the event and return. Currently this component only supports single files.
    if (filesArray.length > 1) {
      this.droppedMultiple.emit(filesArray);
      return;
    }

    const file = filesArray[0] ? filesArray[0] : undefined;

    if (file) {
      const newFile = new TsDroppedFile(file, this.dimensionConstraints, this.acceptedTypes, this.maximumKilobytesPerFile);
      this.dropped.emit(newFile);
      this.setUpNewFile(newFile);
    }
  }


  /**
   * Set file and set up preview and validations
   *
   * @param file - The file
   */
  private setUpNewFile(file: TsDroppedFile): void {
    if (!file) {
      return;
    }
    this.file = file;
    this.changeDetectorRef.markForCheck();

    // TODO
    // TODO
    // TODO: I think the need for this timeout is due to the async nature of newing up the image?
    setTimeout(() => {
      if (this.file && this.file.isImage) {
        this.preview.nativeElement.src = file.fileContents;
      }
      this.setValidationMessages(file);
    }, 50);
  }


  /**
   * Listen for changes to the virtual input
   *
   * @param event - The event
   */
  private onVirtualInputElementChange(event: Event): void {
    this.collectFilesFromEvent(event);
    this.virtualFileInput.value = '';
  }


  /*
   * Stops event propogation
   */
  private preventAndStopEventPropagation(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
  }


  /**
   * Update the attributes of the virtual file input based on @Inputs
   *
   * @param input - The HTML input element
   */
  private updateVirtualFileInputAttrs(input: HTMLInputElement): void {
    const hasMultipleSetting: boolean = input.hasAttribute('multiple');
    const hasAcceptSetting: boolean = input.hasAttribute('accept');

    // Should set multiple
    // istanbul ignore else
    if (this.multiple && !hasMultipleSetting) {
      this.virtualFileInput.setAttribute('multiple', 'true');
    }

    // Should remove multiple
    // istanbul ignore else
    if (!this.multiple && hasMultipleSetting) {
      this.virtualFileInput.removeAttribute('multiple');
    }

    // Should set accept
    // istanbul ignore else
    if (this.accept && !hasAcceptSetting) {
      this.virtualFileInput.setAttribute('accept', this.accept.toString());
    }

    // Should remove accept
    // istanbul ignore else
    if (!this.accept && hasAcceptSetting) {
      this.virtualFileInput.removeAttribute('accept');
    }
  }


  /**
   * Set validation messages
   *
   * @param file - The file
   */
  private setValidationMessages(file: TsDroppedFile | undefined): void {
    if (!file) {
      return;
    }

    const errors: ValidationErrors = {};
    const responses: {[key: string]: ValidationErrors} = {
      fileSize: {
        valid: false,
        actual: file.size,
        max: this.maximumKilobytesPerFile,
      },
      fileType: {
        valid: false,
        actual: file.mimeType,
        accepted: this.acceptedTypes.join(', '),
      },
      imageDimensions: {
        valid: false,
        actual: file.dimensions,
      },
    };

    const validations = Object.keys(file.validations);

    for (let i = 0; i < validations.length; i += 1) {
      const key: string = validations[i];
      if (!file.validations[key]) {
        errors[key] = responses[key];
      }
    }

    this.control.setErrors(errors);
    this.control.markAsTouched();
    this.changeDetectorRef.markForCheck();
  }


  /**
   * Clear all validation messages
   */
  private clearValidationMessages(): void {
    this.control.setErrors(null);
    this.changeDetectorRef.markForCheck();
  }

}
