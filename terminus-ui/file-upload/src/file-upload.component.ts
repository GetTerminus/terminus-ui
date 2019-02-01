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
  isDevMode,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormControl,
  ValidationErrors,
} from '@angular/forms';
import {
  isBoolean,
  isNumber,
  TsDocumentService,
  untilComponentDestroyed,
} from '@terminus/ngx-tools';
import {
  coerceArray,
  coerceBooleanProperty,
  coerceNumberProperty,
} from '@terminus/ngx-tools/coercion';
import { ENTER } from '@terminus/ngx-tools/keycodes';
import { filter } from 'rxjs/operators';
import { TS_SPACING } from '@terminus/ui/spacing';
import {
  ControlValueAccessorProviderFactory,
  inputHasChanged,
  isDragEvent,
  isHTMLInputElement,
  TsReactiveFormBaseComponent,
  TsStyleThemeTypes,
} from '@terminus/ui/utilities';

import { TsSelectedFile } from './selected-file';
import { TsFileAcceptedMimeTypes, TS_ACCEPTED_MIME_TYPES } from './mime-types';
import { TsFileImageDimensionConstraints } from './image-dimension-constraints';
import { TsDropProtectionService } from './drop-protection.service';


export interface ImageRatio {
  widthRatio: number;
  heightRatio: number;
}

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
 *              accept="['image/png', 'image/jpg']"
 *              id="my-id"
 *              maximumKilobytesPerFile="{{ 10 * 1024 }}"
 *              ratioConstraints="['2:1', '3:4']"
 *              [multiple]="false"
 *              [formControl]="myForm.get('myControl')"
 *              [progress]="myUploadProgress"
 *              [seedFile]="myFile"
 *              dimensionConstraints="myConstraints" (see TsFileImageDimensionConstraints)
 *              theme="primary"
 *              (enter)="userDragBegin($event)"
 *              (exit)="userDragEnd($event)"
 *              (selected)="handleFile($event)"
 *              (selectedMultiple)="handleMultipleFiles($event)"
 *              (cleared)="fileWasCleared($event)"
 * ></ts-file-upload>
 *
 * <example-url>https://getterminus.github.io/ui-demos-master/components/file-upload</example-url>
 */
@Component({
  selector: 'ts-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  host: {
    class: 'ts-file-upload',
    '(keydown)': 'handleKeydown($event)',
  },
  providers: [ControlValueAccessorProviderFactory(TsFileUploadComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'tsFileUpload',
})
export class TsFileUploadComponent extends TsReactiveFormBaseComponent implements OnInit , OnChanges, OnDestroy, AfterContentInit {
  /**
   * Define the default component ID
   */
  protected _uid = `ts-file-upload-${nextUniqueId++}`;

  /**
   * A flag that represents an in-progress drag movement
   */
  public dragInProgress = false;

  /**
   * Store the selected file
   */
  public file: TsSelectedFile | undefined;

  /**
   * Define the flexbox layout gap
   */
  public layoutGap: string = TS_SPACING.small[0];

  /**
   * Store reference to the generated file input
   */
  private virtualFileInput: HTMLInputElement;

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
   * Get the file select button text
   */
  public get buttonMessage(): string {
    if (this.dragInProgress) {
      return `Drop File${this.multiple ? 's' : ''}`;
    } else {
      return `Select File${this.multiple ? 's' : ''}`;
    }
  }

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
    const allowsImage =
      (this.acceptedTypes.indexOf('image/png') >= 0) ||
      (this.acceptedTypes.indexOf('image/jpeg') >= 0) ||
      (this.acceptedTypes.indexOf('image/jpg') >= 0);

    if (allowsImage && this.supportedImageDimensions.length > 0) {
      hints.push(`Must be a valid dimension: ${this.supportedImageDimensions}`);
    }

    hints.push(`Must be ${types}`);
    hints.push(`Must be under ${this.maximumKilobytesPerFile.toLocaleString()}kb`);
    if (this.ratioConstraints) {
      hints.push(`Must have valid image ratio of ${this.ratioConstraints.join(' or ')} `);
    }

    return hints;
  }

  /**
   * Compose supported image dimensions as a string
   *
   * @return A string containing all allowed image dimensions
   */
  private get supportedImageDimensions(): string {
    let myString = '';

    // istanbul ignore else
    if (this.dimensionConstraints) {
      const constraints = this.dimensionConstraints.slice();

      for (const c of constraints) {
        // If not the first item, add a comma between the last item and the new
        if (myString.length > 0) {
          myString += ', ';
        }

        // If a fixed size
        if ((c.height.min === c.height.max) && (c.width.min === c.width.max)) {
          myString += `${c.width.min.toLocaleString()}x${c.height.min.toLocaleString()}`;
        } else {
          // Dealing with a size range
          const height = (c.height.min === c.height.max)
            ? c.height.min.toLocaleString()
            : `${c.height.min.toLocaleString()}-${c.height.max.toLocaleString()}`;
          const width = (c.width.min === c.width.max)
            ? c.width.min.toLocaleString()
            : `${c.width.min.toLocaleString()}-${c.width.max.toLocaleString()}`;
          const range = `${width}x${height}`;
          myString += range;
        }
      }
    }

    return myString;
  }

  /**
   * Define the accepted mime types
   */
  @Input()
  public set accept(value: TsFileAcceptedMimeTypes | TsFileAcceptedMimeTypes[] | undefined) {
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
   * Create a form control to manage validation messages
   */
  @Input()
  public set formControl(ctrl: FormControl) {
    this._formControl = ctrl ? ctrl : new FormControl();
  }
  public get formControl(): FormControl {
    return this._formControl;
  }
  private _formControl: FormControl = new FormControl();

  /**
   * Define if the 'select files' button should be visible. DO NOT USE.
   *
   * TODO: This should be removed once UX/Product decide if they want the button.
   */
  @Input()
  public set hideButton(value: boolean) {
    /* istanbul ignore if */
    if (!isBoolean(value) && value && isDevMode()) {
      console.warn(`TsFileUploadComponent: "hideButton" value is not a boolean. ` +
      `String values of 'true' and 'false' will no longer be coerced to a true boolean with the next release.`);
    }
    this._hideButton = coerceBooleanProperty(value);
  }
  public get hideButton(): boolean {
    return this._hideButton;
  }
  private _hideButton = false;

  /**
   * Define an ID for the component
   */
  @Input()
  public set id(value: string) {
    this._id = value || this._uid;
  }
  public get id(): string {
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
   * Define supported ratio for images
   */

  @Input()
  public set ratioConstraints(values: Array<string> | undefined) {
    if (values) {
      for (const value of values) {
        const v = value.split(':');
        if ((v.length !== 2) || (!isNumber(v[0]) && !isNumber(v[1]))) {
          throw new Error('An array of image ratio should be as ["1:2", "3:4"]');
        }
      }
    }
    this._ratioConstraints = this.parseRatioStringToObject(values);
  }
  public get ratioConstraints(): Array<string> | undefined {
    return this.parseRatioToString(this._ratioConstraints);
  }
  private _ratioConstraints: Array<ImageRatio> | undefined;


  /**
   * Define if multiple files may be uploaded
   */
  @Input()
  public set multiple(value: boolean) {
    /* istanbul ignore if */
    if (!isBoolean(value) && value && isDevMode()) {
      console.warn(`TsFileUploadComponent: "multiple" value is not a boolean. ` +
      `String values of 'true' and 'false' will no longer be coerced to a true boolean with the next release.`);
    }
    this._multiple = coerceBooleanProperty(value);
  }
  public get multiple(): boolean {
    return this._multiple;
  }
  private _multiple: boolean = false;

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
      const newFile = new TsSelectedFile(
        file,
        this.dimensionConstraints,
        this.acceptedTypes,
        this.maximumKilobytesPerFile,
        this._ratioConstraints,
      );

      newFile.fileLoaded$.pipe(
        filter((t: TsSelectedFile | undefined): t is TsSelectedFile => t !== undefined),
        untilComponentDestroyed(this),
      ).subscribe((f) => {
        this.formControl.setValue(f.file);
        this.selected.emit(f);
        this.setUpNewFile(f);
      });
    }

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
   * Event emitted when the user's cursor enters the field while dragging a file
   */
  @Output()
  public enter: EventEmitter<boolean> = new EventEmitter();

  /**
   * Event emitted when the user's cursor exits the field while dragging a file
   */
  @Output()
  public exit: EventEmitter<boolean> = new EventEmitter();

  /**
   * Event emitted when the user drops or selects a file
   */
  @Output()
  public selected: EventEmitter<TsSelectedFile> = new EventEmitter();

  /**
   * Event emitted when the user drops or selects multiple files
   */
  @Output()
  public selectedMultiple: EventEmitter<File[]> = new EventEmitter();

  /**
   * Event emitted when the user clears a loaded file
   */
  @Output()
  public cleared: EventEmitter<boolean> = new EventEmitter();

  /**
   * HostListeners
   */
  @HostListener('dragover', ['$event'])
  public handleDragover(event: DragEvent) {
    this.preventAndStopEventPropagation(event);
    this.enter.emit(true);
    this.dragInProgress = true;
  }

  @HostListener('dragleave', ['$event'])
  public handleDragleave(event: DragEvent) {
    this.preventAndStopEventPropagation(event);
    this.exit.emit(true);
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


  constructor(
    private documentService: TsDocumentService,
    private elementRef: ElementRef,
    private changeDetectorRef: ChangeDetectorRef,
    private dropProtectionService: TsDropProtectionService,
  ) {
    super();
    this.virtualFileInput = this.createFileInput();

    // Force setter to be called in case the ID was not specified.
    this.id = this.id;
  }

  /**
   * Update the inner value when the formControl value is updated
   *
   * @param value - The value to set
   */
  public updateInnerValue = (value: string): void => {
    this.value = value;
    this.changeDetectorRef.detectChanges();
  }


  /**
   * Enable drop protection
   */
  public ngOnInit(): void {
    this.dropProtectionService.add();
    if (this.formControl) {
      this.formControl.valueChanges.pipe(
        untilComponentDestroyed(this),
      ).subscribe(() => {
        this.changeDetectorRef.detectChanges();
      });
    }
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
    // istanbul ignore else
    if (inputHasChanged(changes, 'multiple') || inputHasChanged(changes, 'accept')) {
      this.updateVirtualFileInputAttrs(this.virtualFileInput);
      this.registerOnChangeFn(this.updateInnerValue);
    }
  }


  /**
   * Remove event listener when the component is destroyed
   */
  public ngOnDestroy(): void {
    // istanbul ignore else
    if (this.virtualFileInput) {
      this.virtualFileInput.removeEventListener('change', this.onVirtualInputElementChange.bind(this));
    }
    this.dropProtectionService.remove();
  }


  /**
   * Handle the 'enter' keydown event
   *
   * @param event - The keyboard event
   */
  public handleKeydown(event: KeyboardEvent): void {
    if (event.keyCode === ENTER) {
      this.promptForFiles();
      this.elementRef.nativeElement.blur();
    }
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
  public removeFile(event?: Event): void {
    if (event) {
      this.preventAndStopEventPropagation(event);
    }
    this.file = undefined;
    this.clearValidationMessages();
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
   * Get all selected files from an event
   *
   * @param event - The event
   */
  private collectFilesFromEvent(event: DragEvent | Event): void {
    let files: FileList | undefined;

    if (isDragEvent(event)) {
      files = (event.dataTransfer && event.dataTransfer.files) ? event.dataTransfer.files : undefined;
    }

    if (event.target && isHTMLInputElement(event.target)) {
      files = event.target.files ? event.target.files : undefined;
    }

    if ((!files || files.length < 1) && isDevMode()) {
      throw Error('TsFileUpload: Event contained no file.');
    }

    // Convert the FileList to an Array
    const filesArray: File[] = files ? Array.from(files) /* istanbul ignore next - Unreachable */ : [];

    // If multiple were selected, simply emit the event and return. Currently, this component only supports single files.
    if (filesArray.length > 1) {
      this.selectedMultiple.emit(filesArray);
      return;
    }

    const file = filesArray[0] ? filesArray[0] /* istanbul ignore next - Unreachable */ : undefined;

    // istanbul ignore else
    if (file) {
      const newFile = new TsSelectedFile(
        file,
        this.dimensionConstraints,
        this.acceptedTypes,
        this.maximumKilobytesPerFile,
        this._ratioConstraints);

      newFile.fileLoaded$.pipe(
        filter((t: TsSelectedFile | undefined): t is TsSelectedFile => !!t),
        untilComponentDestroyed(this),
      ).subscribe((f) => {
        this.formControl.setValue(f.file);
        this.selected.emit(f);
        this.setUpNewFile(f);
      });
    }
  }

  /**
   * Register our custom onChange function
   *
   * @param fn - The onChange function
   */
  private registerOnChangeFn(fn: Function): void {
    // istanbul ignore else
    if (this.formControl) {
      this.formControl.registerOnChange(fn);
    }
  }


  /**
   * Set file and set up preview and validations
   *
   * @param file - The file
   */
  private setUpNewFile(file: TsSelectedFile): void {
    if (!file) {
      return;
    }
    this.file = file;
    this.setValidationMessages(file);
    this.changeDetectorRef.markForCheck();
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
    if (this.acceptedTypes) {
      this.virtualFileInput.setAttribute('accept', this.acceptedTypes.toString());
    }
  }


  /**
   * Set validation messages
   *
   * @param file - The file
   */
  private setValidationMessages(file: TsSelectedFile | undefined): void {
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
      imageRatio: {
        valid: false,
        actual: file.width / file.height,
      },
    };

    const validations = Object.keys(file.validations);

    for (let i = 0; i < validations.length; i += 1) {
      const key: string = validations[i];
      if (!file.validations[key]) {
        errors[key] = responses[key];
      }
    }

    if (Object.keys(errors).length === 0) {
      this.formControl.setErrors(null);
    } else {
      this.formControl.setErrors(errors);
    }
    this.formControl.markAsTouched();
    this.changeDetectorRef.markForCheck();
  }


  /**
   * Clear all validation messages
   */
  private clearValidationMessages(): void {
    this.formControl.setErrors(null);
    this.changeDetectorRef.markForCheck();
  }

  /**
   * Parse ratio from Array of string to Array of ImageRatio
   * @param ratios - Array of string
   * @return - Array of ImageRatio
   */
  private parseRatioStringToObject(ratios: Array<string> | undefined): Array<ImageRatio> | undefined {
    if (!ratios) {
      return;
    }
    const parsedImageRatio: Array<ImageRatio> = [];
    ratios.map((r) => parsedImageRatio.push({
      widthRatio: Number(r.split(':')[0]),
      heightRatio: Number(r.split(':')[1]),
    }));
    return parsedImageRatio;
  }

  /**
   * Parse ratio from Array of ImageRatio to Array of string
   * @param ratios - Array of ImageRatio
   * @return - Array of string
   */

  private parseRatioToString(ratios: Array<ImageRatio> | undefined): Array<string> | undefined {
    if (!ratios) {
      return;
    }
    const parsedRatio: Array<string> = [];
    ratios.map((r) => parsedRatio.push(r.widthRatio.toString() + ':' + r.heightRatio.toString()));
    return parsedRatio;
  }

}
