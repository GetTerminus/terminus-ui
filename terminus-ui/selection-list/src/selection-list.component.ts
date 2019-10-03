// NOTE: A method must be used to dynamically format values for the UI
// tslint:disable: template-no-call-expression
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  QueryList,
  Self,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormControl,
  NgControl,
} from '@angular/forms';
import { TsDocumentService } from '@terminus/ngx-tools/browser';
import { coerceNumberProperty } from '@terminus/ngx-tools/coercion';
import { isArray } from '@terminus/ngx-tools/type-guards';
import {
  hasRequiredControl,
  untilComponentDestroyed,
} from '@terminus/ngx-tools/utilities';
import {
  TsChipCollectionComponent,
  TsChipEvent,
} from '@terminus/ui/chip';
import { TsFormFieldControl } from '@terminus/ui/form-field';
import {
  TS_OPTION_PARENT_COMPONENT,
  TsOptgroupComponent,
  TsOptionComponent,
} from '@terminus/ui/option';
import {
  TsStyleThemeTypes,
  TsUILibraryError,
} from '@terminus/ui/utilities';
import {
  BehaviorSubject,
  of,
  Subject,
} from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs/operators';

import {
  TsSelectionListPanelComponent,
  TsSelectionListPanelSelectedEvent,
} from './selection-list-panel/selection-list-panel.component';
import { TsSelectionListTriggerDirective } from './selection-list-panel/selection-list-trigger.directive';


// Unique ID for each instance
let nextUniqueId = 0;

const DEFAULT_MINIMUM_CHARACTER_COUNT = 2;
const DEFAULT_DEBOUNCE_DELAY = 200;

/**
 * The event object that is emitted when the select value has changed
 */
export class TsSelectionListChange<T = unknown> {
  constructor(
    public source: TsSelectionListComponent,
    public value: T,
  ) { }
}

export type TsSelectionListFormatter = (v: unknown) => string;
export type TsSelectionListComparator = (a: unknown, b: unknown) => boolean;


/**
 * The selection list UI Component
 *
 * @example
 * <ts-selection-list
 *              [allowMultiple]="allowMultiple"
 *              [displayFormatter]="formatterFunc"
 *              [valueComparator]="comparatorFunc"
 *              debounceDelay="300"
 *              displayWith="(v) => v.name"
 *              [formControl]="myFormControl"
 *              hint="Begin typing to search.."
 *              [isDisabled]="isDisabled"
 *              label="Select options:"
 *              name="product selections"
 *              options="[{}, {}, ...]"
 *              [showProgress]="true"
 *              theme="primary"
 *              (closed)="panelWasClosed($event)"
 *              (duplicateSelection)="duplicateWasSelected($event)"
 *              (opened)="panelWasOpened($event)"
 *              (optionSelected)="mySelected($event)"
 *              (optionDeselected)="myDeselected($event)"
 *              (queryChange)="myQueryChange($event)"
 *              (selectionChange)="mySelection($event)"
 * ></ts-selection-list>
 *
 * <example-url>https://getterminus.github.io/ui-demos-release/components/selection-list</example-url>
 */
@Component({
  selector: 'ts-selection-list',
  templateUrl: './selection-list.component.html',
  styleUrls: ['./selection-list.component.scss'],
  host: {
    'class': 'ts-selection-list',
    '[class.ts-selection-list--required]': 'isRequired',
    '[class.ts-selection-list--disabled]': 'isDisabled',
    '[attr.aria-owns]': 'panelOpen ? optionIds : null',
    '[attr.aria-required]': 'isRequired.toString()',
    '[attr.aria-multiselectable]': 'allowMultiple',
  },
  providers: [
    {
      provide: TsFormFieldControl,
      useExisting: TsSelectionListComponent,
    },
    {
      provide: TS_OPTION_PARENT_COMPONENT,
      useExisting: TsSelectionListComponent,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'tsSelectionList',
})
export class TsSelectionListComponent implements
  OnInit,
  AfterViewInit,
  OnDestroy,
  TsFormFieldControl<string> {

  /**
   * Give the component an explicit name
   * TODO: remove once select & autocomplete have been removed https://github.com/GetTerminus/terminus-ui/issues/1678
   */
  public readonly componentName = 'TsSelectionListComponent';

  /**
   * Define the internal FormControl
   */
  public selectionListFormControl = new FormControl([]);

  /**
   * Store a reference to the document object
   */
  private document: Document;

  /**
   * Subject used to alert the parent {@link TsFormFieldComponent} when the label gap should be recalculated
   *
   * Implemented as part of TsFormFieldControl.
   */
  public readonly labelChanges: Subject<void> = new Subject<void>();

  /**
   * Manages keyboard events for options in the panel.
   */
  private keyManager!: ActiveDescendantKeyManager<TsOptionComponent>;

  /**
   * The IDs of child options to be passed to the aria-owns attribute.
   */
  public optionIds = '';

  /**
   * Whether or not the overlay panel is open
   */
  public panelOpen = false;

  /**
   * Since the FormFieldComponent is inside this template, we cannot use a provider to pass this component instance to the form field.
   * Instead, we pass it manually through the template with this reference.
   */
  public selfReference = this;

  /*
   * Implemented as part of TsFormFieldControl.
   */
  public readonly stateChanges: Subject<void> = new Subject<void>();

  /**
   * Define the default component ID
   */
  public readonly uid = `ts-selection-list-${nextUniqueId++}`;

  /**
   * Management of the query string
   */
  public querySubject: BehaviorSubject<string> = new BehaviorSubject('');

  /**
   * Store the search query
   */
  public searchQuery = '';

  /**
   * Access the panel
   */
  @ViewChild('auto', { static: true })
  public panel!: TsSelectionListPanelComponent;

  /**
   * Access the trigger
   */
  @ViewChild(TsSelectionListTriggerDirective, { static: false })
  public trigger!: TsSelectionListTriggerDirective;

  /**
   * Access the chip list
   */
  @ViewChild('chipList', { static: false })
  public chipList: TsChipCollectionComponent | undefined;

  /**
   * Access the actual HTML <input> element
   */
  @ViewChild('input', { static: false })
  public inputElement!: ElementRef<HTMLInputElement>;

  /**
   * Access a list of all the defined select options
   */
  @ContentChildren(TsOptionComponent, { descendants: true })
  public options!: QueryList<TsOptionComponent>;

  /**
   * Access all of the defined optgroups
   */
  @ContentChildren(TsOptgroupComponent)
  public optionGroups!: QueryList<TsOptgroupComponent>;

  /**
   * Determines whether the select or the input has a value
   */
  public get empty(): boolean {
    // Since we are using ViewChild, we need to verify the existence of the element
    const input = this.inputElement && this.inputElement.nativeElement;

    return input
      ? !this.selectionListFormControl.value.length && !this.inputElement.nativeElement.value.length
      : !this.selectionListFormControl.value.length;
  }

  /**
   * Determines whether the input has focus
   */
  public get focused(): boolean {
    const el = this.inputElement && this.inputElement.nativeElement;
    return (this.document.activeElement === el) || this.panelOpen;
  }

  /**
   * Determine if the label should float
   */
  public get shouldLabelFloat(): boolean {
    return this.focused || !this.empty;
  }

  /**
   * Determine if the dropdown arrow icon should be visible
   */
  public get shouldShowDropdownIcon(): boolean {
    return !!this.options.length;
  }

  /**
   * Define if multiple selections are allowed
   */
  @Input()
  public allowMultiple = false;

  /**
   * Define if should allow duplicate selections
   */
  @Input()
  public allowDuplicateSelections = false;

  /**
   * Define if the panel should reopen after a selection is made
   *
   * NOTE: Though it is technically 're-opening', it happens fast enough so that it doesn't appear to close at all.
   */
  @Input()
  public reopenAfterSelection = false;

  /**
   * Define a debounce delay for the query stream
   */
  @Input()
  public set debounceDelay(value: number) {
    this._debounceDelay = coerceNumberProperty(value, DEFAULT_DEBOUNCE_DELAY);
  }
  public get debounceDelay(): number {
    return this._debounceDelay;
  }
  private _debounceDelay = DEFAULT_DEBOUNCE_DELAY;

  /**
   * Define if the required marker should be hidden
   */
  @Input()
  public hideRequiredMarker = false;

  /**
   * Define a hint for the input
   */
  @Input()
  public set hint(value: string | undefined) {
    this._hint = value;
  }
  public get hint(): string | undefined {
    return this._hint;
  }
  private _hint: string | undefined;

  /**
   * Define an ID for the component
   */
  @Input()
  public set id(value: string) {
    this._id = value || this.uid;
  }
  public get id(): string {
    return this._id;
  }
  protected _id: string = this.uid;

  /**
   * Define if the control should be disabled
   */
  @Input()
  public isDisabled = false;

  /**
   * Define if the control is required
   */
  @Input()
  public set isRequired(value: boolean) {
    this._isRequired = value;
  }
  public get isRequired(): boolean {
    const ctrl = this.ngControl && this.ngControl.control;
    const requiredFormControl = !!ctrl && hasRequiredControl(ctrl);
    return this._isRequired || requiredFormControl;
  }
  private _isRequired = false;

  /**
   * Define a minimum character count for queries
   */
  @Input()
  public set minimumCharacters(value: number) {
    this._minimumCharacters = coerceNumberProperty(value, DEFAULT_MINIMUM_CHARACTER_COUNT);
  }
  public get minimumCharacters(): number {
    return this._minimumCharacters;
  }
  private _minimumCharacters = DEFAULT_MINIMUM_CHARACTER_COUNT;

  /**
   * Define if the input should currently be showing a progress spinner
   */
  @Input()
  public showProgress = false;

  /**
   * Define the component theme
   */
  @Input()
  public theme: TsStyleThemeTypes = 'primary';

  /**
   * Define if validation messages should be shown immediately or on blur
   */
  @Input()
  public validateOnChange = false;

  /**
   * Value of the select control
   */
  @Input()
  public set value(newValue: string | undefined) {
    if (newValue !== this._value) {
      this._value = newValue;
    }
  }
  public get value(): string | undefined {
    return this._value;
  }
  private _value: string | undefined;

  /**
   * Define the placeholder/label
   */
  @Input()
  public label: string | undefined;

  /**
   * Define the name attribute value
   */
  @Input()
  public name: string | undefined;

  /**
   * Define the formatter for the selected items.
   */
  @Input()
  public set displayFormatter(value: TsSelectionListFormatter) {
    this._displayFormatter = value ? value : v => v as string;
  }
  public get displayFormatter(): TsSelectionListFormatter {
    return this._displayFormatter;
  }
  private _displayFormatter: TsSelectionListFormatter = v => v as string;

  /**
   * Define the comparator for the values of the options
   */
  @Input()
  public valueComparator: TsSelectionListComparator = (a: unknown, b: unknown) => a === b

  /**
   * Emit when the backdrop is clicked
   */
  @Output()
  public readonly backdropClicked = new EventEmitter<void>();

  /**
   * Emit when the panel is closed
   */
  @Output()
  public readonly closed = new EventEmitter<void>();

  /**
   * Emit the option when a duplicate selection is made
   */
  @Output()
  public readonly duplicateSelection = new EventEmitter<TsSelectionListChange>();

  /**
   * Emit when the panel is opened
   */
  @Output()
  public readonly opened = new EventEmitter<void>();

  /**
   * Emit the selected option
   */
  @Output()
  public readonly optionSelected = new EventEmitter<TsSelectionListChange>();

  /**
   * Emit the deselected option
   */
  @Output()
  public readonly optionDeselected = new EventEmitter<TsSelectionListChange>();

  /**
   * Emit the new query
   */
  @Output()
  public readonly queryChange = new EventEmitter<string>();

  /**
   * Emit the current selections when any selection changes
   */
  @Output()
  public readonly selectionChange = new EventEmitter<TsSelectionListChange>();

  /**
   * Event that emits whenever the raw value of the select changes. This is here primarily to facilitate the two-way binding for the `value`
   * input.
   *
   * Needed for {@link TsFormFieldComponent}.
   */
  @Output()
  public readonly valueChange = new EventEmitter<string>();


  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private documentService: TsDocumentService,
    public elementRef: ElementRef,
    @Self() @Optional() public ngControl: NgControl,
  ) {
    this.document = this.documentService.document;

    // This is the assigned FormControl or NgModel
    // istanbul ignore else
    if (this.ngControl) {
      // Note: we provide the value accessor through here, instead of the `providers` to avoid running into a circular import.
      this.ngControl.valueAccessor = this;
    }
  }


  /**
   * Seed initial values and set up watchers
   */
  public ngOnInit(): void {
    // Seed the control value
    // NOTE: When the consumer is using an ngModel, the value is not set on the first cycle.
    // We need to push it to the next event loop. When using a FormControl, the value is there on the first run.
    // eslint-disable-next-line dot-notation
    if (this.ngControl && this.ngControl['form']) {
      // istanbul ignore else
      if (this.ngControl.value && !isArray(this.ngControl.value)) {
        throw new TsUILibraryError(`TsSelectionListComponent: Form control values must be an array of values`);
      } else if (this.ngControl.value) {
        this.selectionListFormControl.setValue(this.ngControl.value);
        if (!this.allowMultiple) {
          this.searchQuery = this.displayFormatter(this.ngControl.value[0]);
        }
      }

      // Support dynamic form control updates
      // istanbul ignore else
      if (this.ngControl.valueChanges) {
        this.ngControl.valueChanges
          .pipe(untilComponentDestroyed(this))
          .subscribe(newValue => {
            // istanbul ignore else
            if (newValue) {
              if (!newValue[0]) {
                return;
              }

              this.searchQuery = this.displayFormatter(newValue[0]);

              if (this.allowMultiple) {
                this.selectionListFormControl.setValue(newValue, { emitEvent: false });
              } else {
                this.selectionListFormControl.setValue([newValue[0]], { emitEvent: false });
              }
            }
          });
      }
    } else {
      // HACK: Wait until the next detection cycle to set the value from an ngModel.
      // NOTE: Using CDR.detectChanges causes errors in children that expect TsOptionComponent to exist.
      Promise.resolve().then(() => {
        // istanbul ignore else
        if (this.ngControl && this.ngControl.value) {
          if (!isArray(this.ngControl.value)) {
            throw new TsUILibraryError(`TsSelectionListComponent: ngModel must be an array of values`);
          }
          this.selectionListFormControl.setValue(this.ngControl.value);
          // istanbul ignore else
          if (!this.allowMultiple) {
            this.searchQuery = this.displayFormatter(this.ngControl.value[0]);
          }
        }
      });
    }

    // Propagate changes from form control
    this.selectionListFormControl.valueChanges.pipe(
      untilComponentDestroyed(this),
    ).subscribe(_ => {
      this.propagateChanges();
    });
  }


  /**
   * Subscribe to panel events and query subject changes
   */
  public ngAfterViewInit(): void {
    // Wire up listeners for panel events
    this.trigger.selectionListPanel.opened.pipe(untilComponentDestroyed(this)).subscribe(() => {
      this.opened.emit();
    });
    this.trigger.selectionListPanel.closed.pipe(untilComponentDestroyed(this)).subscribe(() => {
      this.closed.emit();
    });
    this.trigger.backdropClicked.pipe(untilComponentDestroyed(this)).subscribe(() => {
      this.backdropClicked.emit();
    });

    // Take a stream of query changes
    this.querySubject.pipe(
      untilComponentDestroyed(this),
      debounceTime(this.debounceDelay),
      // If the query is shorter than allowed, convert to an empty string
      switchMap(query => ((query.length >= this.minimumCharacters) ? of(query) : of(''))),
      distinctUntilChanged(),
    ).subscribe((query: string) => {
      const inputValue = this.inputElement.nativeElement.value;

      // NOTE: If the input value is valid but the query is too short, an option was likely just selected and a new query has started
      if (query.length < this.minimumCharacters && inputValue.length >= this.minimumCharacters) {
        query = inputValue;
      }
      this.queryChange.emit(query);

      // istanbul ignore else
      if (!this.panelOpen) {
        this.open();
      }
    });
  }


  /**
   * Needed for untilComponentDestroyed
   */
  public ngOnDestroy(): void {}


  /**
   * Stub in onChange
   *
   * Needed for ControlValueAccessor (View -> model callback called when value changes)
   */
  // istanbul ignore next
  public onChange: (value: string) => void = () => { };


  /**
   * Stub in onTouched
   *
   * Needed for ControlValueAccessor (View -> model callback called when select has been touched)
   */
  // istanbul ignore next
  public onTouched = () => { };


  /**
   * Close the overlay panel
   */
  public close(): void {
    if (this.trigger.panelOpen) {
      this.panelOpen = false;
      this.changeDetectorRef.markForCheck();
      this.onTouched();

      if (!this.allowMultiple) {
        const inputValue = this.inputElement.nativeElement.value;
        const controlValue = this.ngControl.value;
        // If the input value doesn't match the selection, then the user must have edited the input value
        // istanbul ignore else
        if (controlValue && inputValue !== ((controlValue && controlValue.length > 0) ? this.displayFormatter(controlValue[0]) : '')) {
          this.ngControl.value.length = 0;
        }
      }

      this.updateValueAndValidity();
    }
  }


  /**
   * Focus the native input element
   */
  public focusInput(): void {
    this.inputElement.nativeElement.focus();
  }


  /**
   * Open the overlay panel
   */
  public open(): void {
    if (this.isDisabled || !this.options.length || this.panelOpen) {
      return;
    }
    this.opened.emit();
  }


  /**
   * Sets the select's value. Part of the ControlValueAccessor interface required to integrate with Angular's core forms API.
   *
   * NOTE: Currently we are not using this, but it still must be present since this component is acting as a CVA.
   *
   * @param value - New value to be written to the model
   */
  public writeValue(value: string): void { }


  /**
   * Save a callback function to be invoked when the select's value changes from user input.
   * Part of the ControlValueAccessor interface required to integrate with Angular's core forms API.
   *
   * @param fn - Callback to be triggered when the value changes
   */
  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }


  /**
   * Save a callback function to be invoked when the select is blurred by the user.
   * Part of the ControlValueAccessor interface required to integrate with Angular's core forms API.
   *
   * @param fn - Callback to be triggered when the component has been touched
   */
  public registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }


  /**
   * Disables the select.
   * Part of the ControlValueAccessor interface required to integrate with Angular's core forms API.
   *
   * @param isDisabled - If the component is disabled
   */
  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    this.changeDetectorRef.markForCheck();
    this.stateChanges.next();
  }


  /**
   * Ensure the correct element gets focus when the primary container is clicked.
   *
   * Implemented as part of TsFormFieldControl.
   */
  public onContainerClick(): void {
    this.focusInput();
  }


  /**
   * Close the dropdown and reset the query when the user leaves the input
   *
   * @param event - The keyboard or mouse event
   */
  public handleInputBlur(event: KeyboardEvent | MouseEvent | FocusEvent): void {
    // NOTE(B$): cannot use dot syntax here since 'relatedTarget' doesn't exist on a KeyboardEvent
    // eslint-disable-next-line dot-notation
    const hasRelatedTarget = !!(event && event['relatedTarget']);
    // eslint-disable-next-line dot-notation
    const hasNodeName = !!(hasRelatedTarget && event['relatedTarget'].nodeName);

    if (hasRelatedTarget && hasNodeName) {
      // If the blur event comes from the user clicking an option, `event.relatedTarget.nodeName`
      // will be `TS-OPTION`.
      // istanbul ignore else
      // NOTE: TypeScript warns `Property 'nodeName' does not exist on type 'EventTarget'.`
      // eslint-disable-next-line dot-notation
      if (event['relatedTarget'].nodeName !== 'TS-OPTION') {
        if (this.allowMultiple) {
          this.resetAutocompleteQuery();
        }
        this.close();
        this.trigger.closePanel(true);
      }
    } else {
      // NOTE: The lonely if is the only way to correctly ignore 'else' coverage
      // istanbul ignore else
      // eslint-disable-next-line no-lonely-if
      if (this.trigger.panelOpen) {
        this.close();
        this.trigger.closePanel(true);
      }
    }

    // Mark this control as 'touched' to trigger any validations needed on blur
    this.onTouched();
    this.updateValueAndValidity();
  }


  /**
   * Select an item
   *
   * @param selection - The item to select
   */
  public selectItem(selection: TsSelectionListPanelSelectedEvent): void {
    const ctrlValue = this.selectionListFormControl.value || [];
    const isDuplicate = ctrlValue.findIndex(o => this.valueComparator(o, selection.option.value)) >= 0;

    // istanbul ignore else
    if (isDuplicate) {
      this.duplicateSelection.emit(new TsSelectionListChange(this, selection.option.value));
    }

    // Stop the flow if the selection already exists in the array and duplicates aren't allowed
    if (!this.allowDuplicateSelections && isDuplicate) {
      return;
    }

    if (this.allowMultiple) {
      // If supporting multiple selections, reset the input text value as long as the panel should NOT reopen
      // istanbul ignore else
      if (!this.reopenAfterSelection) {
        this.close();
        this.resetAutocompleteQuery();
      }

      // Update the form control
      const options = ctrlValue.concat(selection.option.value);
      this.selectionListFormControl.setValue(options);
    } else {
      // Update the form control
      this.selectionListFormControl.setValue([selection.option.value]);

      // In single selection mode, set the query input to the selection so the user can see what was selected
      this.inputElement.nativeElement.value = selection.option.viewValue;
    }

    // Update the panel position in case the addition of a chip causes the select height to change
    // istanbul ignore else
    if (this.trigger.overlayRef) {
      this.trigger.overlayRef.updatePosition();
      this.changeDetectorRef.detectChanges();
    }

    // Notify consumers about changes
    this.optionSelected.emit(new TsSelectionListChange(this, selection.option.value));
  }


  /**
   * Deselect an item
   *
   * @param option - The option to select
   */
  public deselectItem(option: TsChipEvent): void {
    // Find the key of the selection in the selectedOptions array
    const options = (this.selectionListFormControl.value || [])
      .filter(opt => !this.valueComparator(opt, option.chip.value));

    // Update the form control
    this.selectionListFormControl.setValue(options);

    // If the only chip was removed, re-focus the input
    // istanbul ignore else
    if (options.length === 0) {
      this.focusInput();
    }

    // HACK: For some reason, triggering change detection works in the selection method above, but not here. Same issue seems present in
    // TsOptionComponent where `setActiveStyles` works by calling the CDR but `setInactiveStyles` required a timeout.
    Promise.resolve().then(() => {
      // Update the panel position in case the removal of a chip causes the select height to change
      if (this.trigger.overlayRef) {
        this.trigger.overlayRef.updatePosition();
      }
    });

    // Notify consumers about changes
    this.optionDeselected.emit(new TsSelectionListChange(this, option));
  }


  /**
   * Function for tracking for-loops changes
   *
   * @param index - The item index
   * @return The unique ID
   */
  public trackByFn(index): number {
    return index;
  }


  /**
   * Set up a key manager to listen to keyboard events on the overlay panel
   */
  private initKeyManager(): void {
    // We need to initialize with wrapping turned on
    this.keyManager = new ActiveDescendantKeyManager<TsOptionComponent>(this.options)
      .withTypeAhead()
      .withVerticalOrientation()
      .withHorizontalOrientation('ltr')
      .withWrap();

  }


  /**
   * Emit a change event to set the model value
   */
  private propagateChanges(): void {
    const valueToEmit = this.selectionListFormControl.value;
    this.value = valueToEmit;
    this.valueChange.emit(valueToEmit);
    this.onChange(valueToEmit);
    this.selectionChange.emit(new TsSelectionListChange(this, valueToEmit));
    this.changeDetectorRef.markForCheck();
  }


  /**
   * Call FormControl updateValueAndValidity function to ensure value and valid status get updated.
   */
  private updateValueAndValidity(): void {
    // istanbul ignore else
    if (this.ngControl && this.ngControl.control) {
      this.ngControl.control.updateValueAndValidity();
    }
  }


  /**
   * Reset input
   */
  private resetAutocompleteQuery(): void {
    // istanbul ignore else
    if (!this.keyManager) {
      this.initKeyManager();
    }
    // Deselect the option from the key manager
    this.keyManager.updateActiveItem(-1);
    this.inputElement.nativeElement.value = '';
  }

}
