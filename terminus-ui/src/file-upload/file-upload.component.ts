import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  inputHasChanged,
  TsDocumentService,
} from '@terminus/ngx-tools';
import {
  coerceArray,
  coerceBooleanProperty,
} from '@terminus/ngx-tools/coercion';
import { BehaviorSubject, fromEvent, of } from 'rxjs';
import { delay, switchMap, tap } from 'rxjs/operators';

import { TS_SPACING } from './../spacing/spacing.constant';
import { isDragEvent } from './../utilities/type-coercion/is-drag-event';
import { isHTMLInputElement } from './../utilities/type-coercion/is-html-input-element';
import { TsDroppedFile } from './dropped-file';
import {
  TsFileAcceptedMimeTypes,
  TS_ACCEPTED_MIME_TYPES,
} from './mime-types';
import { TsImageDimensions } from './image-dimensions';
import { TsFileUploadSizeConstraints } from './size-constraints';


const CONSTRAINTS_MOCK: TsFileUploadSizeConstraints = [
  {
    height: {
      min: 50,
      max: 100,
    },
    width: {
      min: 50,
      max: 100,
    },
  },
  {
    height: {
      min: 72,
      max: 72,
    },
    width: {
      min: 72,
      max: 72,
    },
  },
  {
    height: {
      min: 400,
      max: 500,
    },
    width: {
      min: 700,
      max: 800,
    },
  },
];


/**
 * The maximum file size in bytes
 */
// TODO: what is default max? Currently 3000kb (3MB)
const MAXIMUM_KILOBYTES_PER_FILE = 3000;

/**
 * Unique ID for each instance
 */
let nextUniqueId = 0;


/**
 * TODO: Fill this section out
 * This is the file-upload UI Component
 *
 * #### QA CSS CLASSES
 * - `qa-file-upload`: Placed on the primary container
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
export class TsFileUploadComponent implements OnChanges, OnDestroy, AfterContentInit {
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
  public file: File | undefined;

  /**
   * Define the flexbox layout gap
   */
  public layoutGap: string = TS_SPACING.small[0];

  /**
   * Store reference to the generated file input
   */
  private virtualFileInput: HTMLInputElement;

  private imageSize$ = new BehaviorSubject<TsImageDimensions>({width: 0, height: 0});

  /**
   * Reflect the ID back to the DOM
   */
  @HostBinding('attr.id')
  public publicID: string = this.id;

  /**
   * Provide access to the file preview
   */
  @ViewChild('preview')
  public preview!: ElementRef;

  /**
   * Define the accepted mime types
   * TODO: Can we define a mimeTypes type to use rather than string?
   */
  @Input()
  public set accept(value: string | string[] | undefined) {
    if (!value) {
      return;
    }

    this._accept = coerceArray(value);
  }
  public get accept(): string | string[] | undefined {
    return this._accept;
  }
  private _accept: string | string[] | undefined;

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
  // TODO: Switch back to bytes internally for easier math.
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
   * Define maximum and minimum pixel dimensions for images
   */
  @Input()
  public set sizeConstraints(value: TsFileUploadSizeConstraints | undefined) {
    this._sizeConstraints = value;
  }
  public get sizeConstraints(): TsFileUploadSizeConstraints | undefined {
    return this._sizeConstraints;
  }
  private _sizeConstraints: TsFileUploadSizeConstraints | undefined = CONSTRAINTS_MOCK;



  @Output()
  public hoverBegin: EventEmitter<any> = new EventEmitter();

  @Output()
  public hoverEnd: EventEmitter<any> = new EventEmitter();

  @Output()
  public accepted: EventEmitter<File> = new EventEmitter();

  @Output()
  public rejected: EventEmitter<File> = new EventEmitter();

  @Output()
  public dropped: EventEmitter<TsDroppedFile> = new EventEmitter();

  @Output()
  public droppedMultiple: EventEmitter<File[]> = new EventEmitter();


  @HostListener('dragover', ['$event'])
  public handleDragover(e: DragEvent) {
    this.preventAndStopEventPropagation(e);
    /*
     *console.log('handleDragover: ', e);
     */

    this.dragInProgress = true;
  }

  @HostListener('dragleave', ['$event'])
  public handleDragleave(e: DragEvent) {
    this.preventAndStopEventPropagation(e);
    /*
     *console.log('handleDragleave: ', e);
     */

    this.dragInProgress = false;
  }

  @HostListener('drop', ['$event'])
  public handleDrop(e: DragEvent) {
    console.log('COMP: handleDrop: ', e);

    this.preventAndStopEventPropagation(e);
    this.dragInProgress = false;

    this.collectFilesFromEvent(e);
  }

  @HostListener('click', ['$event'])
  public handleClick(e: Event) {
    this.promptForFiles();
  }

  @HostListener('keydown.enter', ['$event'])
  public handleEnter(e: KeyboardEvent) {
    this.promptForFiles();
    this.elementRef.nativeElement.blur();
  }


  constructor(
    private documentService: TsDocumentService,
    private elementRef: ElementRef,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    this.virtualFileInput = this.createFileInput();

    // Force setter to be called in case the ID was not specified.
    this.id = this.id;
  }


  public ngAfterContentInit(): void {
    this.virtualFileInput.addEventListener('change', this.onVirtualInputElementChange.bind(this));
    this.updateVirtualFileInputAttrs(this.virtualFileInput);

    this.imageSize$.subscribe((v) => {
      /*
       *console.log('IMAGE SIZE: ', v);
       */
    });
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


  public ngOnDestroy(): void {
    if (this.virtualFileInput) {
      this.virtualFileInput.removeEventListener('change', this.onVirtualInputElementChange.bind(this));
    }
  }


  public promptForFiles(): void {
    this.virtualFileInput.click();
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


  private collectFilesFromEvent(event: DragEvent | Event): void {
    let files: FileList | undefined;

    if (isDragEvent(event)) {
      files = event.dataTransfer.files;
    } else if (event.target) {
      if (isHTMLInputElement(event.target)) {
        files = event.target.files ? event.target.files : undefined;
      }
    }

    if (!files) {
      throw Error('Fired event contains no file');
    }

    // Convert the FileList to an Array
    const filesArray: File[] = Array.from(files);

    if (filesArray.length > 1) {
      this.droppedMultiple.emit(filesArray);
      console.log('dropped multiple: ', filesArray);
      return;
    }


    this.file = filesArray[0] ? filesArray[0] : undefined;


    if (this.file) {
      const file = new TsDroppedFile(this.file, this.sizeConstraints, this.maximumKilobytesPerFile);
    }

    /*
     *this.dropped.emit(filesArray);
     */
  }


  private validateCSV(file: File): boolean {
    return true;
  }


  private onVirtualInputElementChange(e: Event): void {
    this.collectFilesFromEvent(e);
    this.virtualFileInput.value = '';
  }


  /*
   * Stops event propogation
   */
  private preventAndStopEventPropagation(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
  }


  private updateVirtualFileInputAttrs(input: HTMLInputElement): void {
    const hasMultipleSetting: boolean = input.hasAttribute('multiple');
    const hasAcceptSetting: boolean = input.hasAttribute('accept');

    // Should set multiple
    if (this.multiple && !hasMultipleSetting) {
      this.virtualFileInput.setAttribute('multiple', 'true');
    }

    // Should remove multiple
    if (!this.multiple && hasMultipleSetting) {
      this.virtualFileInput.removeAttribute('multiple');
    }

    // Should set accept
    if (this.accept && !hasAcceptSetting) {
      this.virtualFileInput.setAttribute('accept', this.accept.toString());
    }

    // Should remove accept
    if (!this.accept && hasAcceptSetting) {
      this.virtualFileInput.removeAttribute('accept');
    }
  }


  public removeFile(e: Event): void {
    this.file = undefined;
    this.preventAndStopEventPropagation(e);
  }

}
