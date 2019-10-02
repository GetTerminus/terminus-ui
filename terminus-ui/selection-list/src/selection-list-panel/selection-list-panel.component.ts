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
 * Event object that is emitted when a {@link TsOptionComponent} is selected
 */
export class TsSelectionListPanelSelectedEvent {
  constructor(
    // Reference to the panel that emitted the event
    public source: TsSelectionListPanelComponent,
    // The option that was selected
    public option: TsOptionComponent,
  ) {}
}

// Unique ID for each instance
let nextUniqueId = 0;


/**
 * The panel used to display selection list  {@link TsOptionComponent}s
 *
 * @example
 * <ts-selection-list-panel
 *              [options]="myOptionsQueryList"
 *              [optionGroups]="myOptionGroupsQueryList"
 *              (optionsSelected)="doSomething($event)"
 * ></ts-selection-list-panel>
 */
@Component({
  selector: 'ts-selection-list-panel',
  templateUrl: './selection-list-panel.component.html',
  styleUrls: ['./selection-list-panel.component.scss'],
  host: { class: 'ts-selection-list-panel qa-selection-list-panel' },
  providers: [
    {
      provide: TS_OPTION_PARENT_COMPONENT,
      useExisting: TsSelectionListPanelComponent,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'tsSelectionListPanel',
})
export class TsSelectionListPanelComponent implements AfterContentInit {
  /**
   * Manages active item in option list based on key events
   *
   * NOTE: {@link TsSelectionListTriggerDirective} needs access.
   */
  public keyManager!: ActiveDescendantKeyManager<TsOptionComponent>;

  /**
   * Whether the panel should be visible
   */
  public showPanel = false;

  /**
   * Define the default component ID
   */
  public readonly uid = `ts-selection-list-panel-${nextUniqueId++}`;

  /**
   * Return the panel's scrollTop
   *
   * @return The scrolltop number
   */
  public get scrollTop(): number {
    return this.panel ? this.panel.nativeElement.scrollTop : 0;
  }

  /**
   * Set the panel scrollTop
   *
   * This allows us to manually scroll to display options above or below the fold, as they are not actually being focused when active.
   *
   * @param scrollTop - The number of pixels to move
   */
  public set scrollTop(scrollTop: number) {
    // istanbul ignore else
    if (this.panel) {
      this.panel.nativeElement.scrollTop = scrollTop;
    }
  }

  /**
   * Access the template. Used by {@link TsSelectionListTriggerDirective}
   */
  @ViewChild(TemplateRef, { static: false })
  // tslint:disable-next-line no-any
  public template!: TemplateRef<any>;

  /**
   * Access the element for the panel containing the options
   */
  @ViewChild('panel', { static: false })
  public panel!: ElementRef;

  /**
   * Whether the panel is open
   */
  public isOpen = false;

  /**
   * Function that maps an option's control value to its display value in the trigger
   */
  @Input()
  // tslint:disable-next-line no-any
  public displayWith: ((value: any) => string) | null = null;

  /**
   * Define an ID for the component
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
   * Event that is emitted when the panel is closed
   */
  @Output()
  public readonly closed = new EventEmitter<void>();

  /**
   * Event that is emitted when the panel is opened
   */
  @Output()
  public readonly opened = new EventEmitter<void>();

  /**
   * Event that is emitted whenever an option from the list is selected
   */
  @Output()
  public readonly optionSelected = new EventEmitter<TsSelectionListPanelSelectedEvent>();


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
   */
  public emitSelectEvent(option: TsOptionComponent): void {
    const event = new TsSelectionListPanelSelectedEvent(this, option);
    this.optionSelected.emit(event);
  }


  /**
   * Set the visibility of the panel based on whether options exist
   */
  public setVisibility(): void {
    this.showPanel = !!this.options.length;
    this.changeDetectorRef.markForCheck();
  }

}
