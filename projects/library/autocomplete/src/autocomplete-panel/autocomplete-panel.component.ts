import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

import {
  TS_OPTION_PARENT_COMPONENT,
  TsOptgroupComponent,
  TsOptionComponent,
} from '@terminus/ui/option';


/**
 * Event object that is emitted when an autocomplete option is selected
 */
export class TsAutocompletePanelSelectedEvent {
  constructor(
    // Reference to the autocomplete panel that emitted the event
    public source: TsAutocompletePanelComponent,
    // The option that was selected
    public option: TsOptionComponent,
  ) {}
}

// Unique ID for each instance
let nextUniqueId = 0;


/**
 * The panel used to display autocomplete options when {@link TsOptionComponent} is in autocomplete mode.
 *
 * #### QA CSS CLASSES
 * - `qa-autocomplete-panel`: The panel container
 *
 * @example
 * <ts-autocomplete-panel
 *              [options]="myOptionsQueryList"
 *              [optionGroups]="myOptionGroupsQueryList"
 *              (optionsSelected)="doSomething($event)"
 * ></ts-autocomplete-panel>
 */
@Component({
  selector: 'ts-autocomplete-panel',
  templateUrl: './autocomplete-panel.component.html',
  styleUrls: ['./autocomplete-panel.component.scss'],
  host: { class: 'ts-autocomplete-panel qa-autocomplete-panel' },
  providers: [
    {
      provide: TS_OPTION_PARENT_COMPONENT,
      useExisting: TsAutocompletePanelComponent,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'tsAutocompletePanel',
})
export class TsAutocompletePanelComponent implements AfterContentInit {
  /**
   * Manages active item in option list based on key events
   *
   * NOTE: {@link TsAutocompleteTriggerDirective} needs access.
   */
  public keyManager!: ActiveDescendantKeyManager<TsOptionComponent>;

  /**
   * Whether the autocomplete panel should be visible
   */
  public showPanel = false;

  /**
   * Define the default component ID
   */
  public readonly uid = `ts-select-autocomplete-${nextUniqueId++}`;

  /**
   * Access the template. Used by {@link TsAutocompleteTriggerDirective}
   */
  @ViewChild(TemplateRef)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public template!: TemplateRef<any>;

  /**
   * Access the element for the panel containing the autocomplete options
   */
  @ViewChild('panel', { static: true })
  public panel!: ElementRef;

  /**
   * Whether the autocomplete panel is open
   */
  public isOpen = false;

  /**
   * Function that maps an option's control value to its display value in the trigger
   */
  @Input()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public displayWith: ((value: any) => string) | null = null;

  /**
   * Define an ID for the component
   *
   * @param value
   */
  @Input()
  public set id(value: string) {
    // Note: this ID is being set internally by `TsSelectComponent` so no fallback is needed.
    this._id = value;
  }
  public get id(): string {
    return this._id;
  }
  protected _id: string = this.uid;

  /**
   * Access the list of option groups
   *
   * NOTE: Since we are nested so deep, the query selectors can't seem to find these components. So now we are letting the parent pass them
   * in explicitly.
   */
  @Input()
  public optionGroups!: QueryList<TsOptgroupComponent>;

  /**
   * Access the list of options
   *
   * NOTE: Since we are nested so deep, the query selectors can't seem to find these components. So now we are letting the parent pass them
   * in explicitly.
   */
  @Input()
  public options!: QueryList<TsOptionComponent>;

  /**
   * Event that is emitted whenever an option from the list is selected
   */
  @Output()
  public readonly optionSelected = new EventEmitter<TsAutocompletePanelSelectedEvent>();

  /**
   * Event that is emitted when the autocomplete panel is opened
   */
  @Output()
  public readonly opened = new EventEmitter<void>();

  /**
   * Event that is emitted when the autocomplete panel is closed
   */
  @Output()
  public readonly closed = new EventEmitter<void>();


  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    public elementRef: ElementRef,
  ) {}


  /**
   * Set up
   */
  public ngAfterContentInit(): void {
    this.keyManager = new ActiveDescendantKeyManager<TsOptionComponent>(this.options).withWrap();

    // Set the initial visibility state.
    this.setVisibility();
  }


  /**
   * Emit the `select` event
   *
   * @param option
   */
  public emitSelectEvent(option: TsOptionComponent): void {
    const event = new TsAutocompletePanelSelectedEvent(this, option);
    this.optionSelected.emit(event);
  }


  /**
   * Return the panel's scrollTop
   *
   * @returns The scrolltop number
   */
  public getScrollTop(): number {
    return this.panel ? this.panel.nativeElement.scrollTop : 0;
  }


  /**
   * Set the panel scrollTop.
   *
   * This allows us to manually scroll to display options above or below the fold, as they are not actually being focused when active.
   *
   * @param scrollTop - The number of pixels to move
   */
  public setScrollTop(scrollTop: number): void {
    // istanbul ignore else
    if (this.panel) {
      this.panel.nativeElement.scrollTop = scrollTop;
    }
  }


  /**
   * Set the visibility of the panel based on whether options exist
   */
  public setVisibility(): void {
    this.showPanel = !!this.options.length;
    this.changeDetectorRef.markForCheck();
  }
}
