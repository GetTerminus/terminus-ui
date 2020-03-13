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
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { TsDocumentService } from '@terminus/ngx-tools/browser';
import { coerceNumberProperty } from '@terminus/ngx-tools/coercion';
import { isArray } from '@terminus/ngx-tools/type-guards';
import {
  hasRequiredControl,
  untilComponentDestroyed,
} from '@terminus/ngx-tools/utilities';
import {
  TsChipCollectionComponent,
  TsChipComponent,
} from '@terminus/ui/chip';
import { TsFormFieldControl } from '@terminus/ui/form-field';
import {
  TS_OPTION_PARENT_COMPONENT,
  TsOptgroupComponent,
  TsOptionComponent,
} from '@terminus/ui/option';
import { TsStyleThemeTypes } from '@terminus/ui/utilities';
import {
  BehaviorSubject,
  of,
  Subject,
} from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
} from 'rxjs/operators';

import {
  TsAutocompletePanelComponent,
  TsAutocompletePanelSelectedEvent,
} from './autocomplete-panel/autocomplete-panel.component';
import { TsAutocompleteTriggerDirective } from './autocomplete-panel/autocomplete-trigger.directive';


// Unique ID for each instance
// @internal
let nextUniqueId = 0;

export class TsAutocompleteSelectedEvent extends MatAutocompleteSelectedEvent {}

const DEFAULT_MINIMUM_CHARACTER_COUNT = 2;
const DEFAULT_DEBOUNCE_DELAY = 200;

/**
 * The event object that is emitted when the select value has changed
 */
export class TsAutocompleteChange<T = unknown> {
  constructor(
    public source: TsAutocompleteComponent,
    public value: T,
  ) { }
}

export type TsAutocompleteFormatter = (v: unknown) => string;
export type TsAutocompleteComparator = (a: unknown, b: unknown) => boolean;

/**
 * The autocomplete UI Component
 *
 * @example
 * <ts-autocomplete
 *              [allowMultiple]="allowMultiple"
 *              [displayFormatter]="formatterFunc"
 *              [valueComparator]="comparatorFunc"
 *              debounceDelay="300"
 *              displayWith="(v) => v.name"
 *              hint="Begin typing to search.."
 *              [isDisabled]="isDisabled"
 *              label="Select options:"
 *              name="product selections"
 *              options="[{}, {}, ...]"
 *              [showProgress]="inProgress"
 *              theme="primary"
 *              (closed)="panelWasClosed($event)"
 *              (opened)="panelWasOpened($event)"
 *              (optionSelected)="mySelected($event)"
 *              (optionRemoved)="myRemoved($event)"
 *              (query)="myQuery($event)"
 *              (selection)="mySelection($event)"
 * ></ts-autocomplete>
 *
 * <example-url>https://getterminus.github.io/ui-demos-release/components/autocomplete</example-url>
 */
@Component({
  selector: 'ts-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  host: {
    'class': 'ts-autocomplete',
    '[class.ts-autocomplete--required]': 'isRequired',
    '[class.ts-autocomplete--disabled]': 'isDisabled',
    '[attr.aria-owns]': 'panelOpen ? optionIds : null',
    '[attr.aria-required]': 'isRequired.toString()',
    '[attr.aria-multiselectable]': 'allowMultiple',
  },
  providers: [
    {
      provide: TsFormFieldControl,
      useExisting: TsAutocompleteComponent,
    },
    {
      provide: TS_OPTION_PARENT_COMPONENT,
      useExisting: TsAutocompleteComponent,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'tsAutocomplete',
})
export class TsAutocompleteComponent implements OnInit,
  AfterViewInit,
  OnDestroy,
  TsFormFieldControl<string> {

  /**
   * Give the component an explicit name
   *
   * @internal
   */
  public readonly componentName = 'TsAutocompleteComponent';

  /**
   * Define the FormControl
   *
   * @internal
   */
  public autocompleteFormControl = new FormControl([]);

  /**
   * Store a reference to the document object
   *
   * @internal
   */
  private document: Document;

  /**
   * Subject used to alert the parent {@link TsFormFieldComponent} when the label gap should be recalculated
   *
   * Implemented as part of TsFormFieldControl.
   *
   * @internal
   */
  public readonly labelChanges = new Subject<void>();

  /**
   * Manages keyboard events for options in the panel.
   *
   * @internal
   */
  private keyManager!: ActiveDescendantKeyManager<TsOptionComponent>;

  /**
   * The IDs of child options to be passed to the aria-owns attribute.
   *
   * @internal
   */
  public optionIds = '';

  /**
   * Whether or not the overlay panel is open
   */
  public panelOpen = false;

  /**
   * Since the {@link TsFormFieldComponent} is inside this template, we cannot use a provider to pass this component instance to the form
   * field. Instead, we pass it manually through the template with this reference.
   *
   * @internal
   */
  public selfReference = this;

  /*
   * Implemented as part of {@link TsFormFieldControl}
   *
   * @internal
   */
  public readonly stateChanges = new Subject<void>();

  /**
   * Define the default component ID
   *
   * @internal
   */
  public readonly uid = `ts-autocomplete-${nextUniqueId++}`;

  /**
   * Management of the query string
   *
   * @internal
   */
  public querySubject = new BehaviorSubject<string>('');

  /**
   * Store the search query
   *
   * @internal
   */
  public searchQuery!: string;

  /**
   * Access the trigger
   */
  @ViewChild('auto', { static: true })
  public autocompletePanel!: TsAutocompletePanelComponent;

  /**
   * Access the trigger
   */
  @ViewChild(TsAutocompleteTriggerDirective)
  public autocompleteTrigger!: TsAutocompleteTriggerDirective;

  /**
   * Access the chip list
   */
  @ViewChild('chipCollection')
  public chipCollection: TsChipCollectionComponent | undefined;

  /**
   * Access the actual HTML element
   */
  @ViewChild('input')
  public inputElement!: ElementRef<HTMLInputElement>;

  /**
   * Access a list of all the defined select options
   */
  @ContentChildren(TsOptionComponent, { descendants: true })
  public options!: QueryList<TsOptionComponent>;

  /**
   * Access all of the defined groups of options
   */
  @ContentChildren(TsOptgroupComponent)
  public optionGroups!: QueryList<TsOptgroupComponent>;

  /**
   * Whether the select has a value
   */
  public get empty(): boolean {
    return !this.autocompleteFormControl.value.length;
  }

  /**
   * Whether the input has focus
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
   *
   * @param value
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
   *
   * @param value
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
   *
   * @param value
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
   *
   * @param value
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
   *
   * @param value
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
   *
   * @param newValue
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
   *
   * @param v
   */
  @Input()
  public displayFormatter: TsAutocompleteFormatter = v => v as string;

  /**
   * Define the comparator for the values of the options
   *
   * @param a
   * @param b
   */
  @Input()
  public valueComparator: TsAutocompleteComparator = (a: unknown, b: unknown) => a === b;


  /**
   * Event for when the panel is closed
   */
  @Output()
  public readonly closed = new EventEmitter<void>();

  /**
   * Event for when a duplicate selection is made
   */
  @Output()
  public readonly duplicateSelection = new EventEmitter<TsAutocompleteChange>();

  /**
   * Event for when the panel is opened
   */
  @Output()
  public readonly opened = new EventEmitter<void>();

  /**
   * Emit the selected chip
   */
  @Output()
  public readonly optionSelected = new EventEmitter<TsAutocompleteChange>();

  /**
   * Event for when an option is removed
   */
  @Output()
  public readonly optionDeselected = new EventEmitter<TsAutocompleteChange>();

  /**
   * Emit the current selection
   */
  @Output()
  public readonly selection = new EventEmitter<string[]>();

  /**
   * Emit the query string
   */
  @Output()
  public readonly query = new EventEmitter<string>();

  /**
   * Event for when the query has changed
   */
  @Output()
  public readonly queryChange = new EventEmitter<string>();

  /**
   * Event for when the selections change
   */
  @Output()
  public readonly selectionChange = new EventEmitter<TsAutocompleteChange>();

  /**
   * Event that emits whenever the raw value of the select changes. This is here primarily
   * to facilitate the two-way binding for the `value` input.
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
   * Seed initial control values
   */
  public ngOnInit(): void {
    // Seed the control value
    // NOTE: When the consumer is using an ngModel, the value is not set on the first cycle.
    // We need to push it to the next event loop. When using a FormControl the value is there on the first run.
    // eslint-disable-next-line dot-notation
    if (this.ngControl && this.ngControl['form']) {
      // istanbul ignore else
      if (this.ngControl.value && !isArray(this.ngControl.value)) {
        throw Error('form control values must be an array of values');
      } else if (this.ngControl.value) {
        this.autocompleteFormControl.setValue(this.ngControl.value);
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
              this.autocompleteFormControl.setValue(newValue, { emitEvent: false });
              if (!this.allowMultiple) {
                this.searchQuery = this.displayFormatter(newValue[0]);
              }
            }
          });
      }
    } else {
      // HACK: Wait until the next detection cycle to set the value from an ngModel.
      // NOTE: Using CDR.detectChanges causes errors in children that expect TsOptionComponent to exist.
      setTimeout(() => {
        // istanbul ignore else
        if (this.ngControl && this.ngControl.value) {
          if (!isArray(this.ngControl.value)) {
            throw Error('ngModel must be an array of values');
          }
          this.autocompleteFormControl.setValue(this.ngControl.value);
          if (!this.allowMultiple) {
            this.searchQuery = this.displayFormatter(this.ngControl.value[0]);
          }
        }
      });
    }

    // Take a stream of query changes
    this.querySubject.pipe(
      untilComponentDestroyed(this),
      // Debounce the query changes
      debounceTime(this.debounceDelay),
      // If the query is shorter than allowed, convert to an empty string
      // eslint-disable-next-line deprecation/deprecation
      switchMap(query => of((query && (query.length >= this.minimumCharacters)) ? query : '')),
      // Only allow a query through if it is different from the previous query
      distinctUntilChanged(),
    ).subscribe((query: string) => {
      // NOTE: When an option is selected, the full string value comes through this stream. We are checking the stream value against the
      // input element value to verify we are sending a query rather than a selected option.
      const inputValue = this.inputElement.nativeElement.value;
      const queryIsValid = (query === inputValue) || (query === '');

      this.queryChange.emit(queryIsValid ? query : inputValue);
      if (!this.panelOpen) {
        this.open();
      }
    });

    // Propagate changes from form control
    this.autocompleteFormControl.valueChanges.pipe(
      untilComponentDestroyed(this),
    ).subscribe(v => {
      this.propagateChanges();
    });
  }

  /**
   * Subscribe to the querySubject and pass values to the query emitter
   *
   * NOTE: When an option is selected, the full selected value is piped through this stream
   * somehow. Have not figured out why. Best guess is it's something due to the `matAutocomplete`
   * directive. For now, we are filtering out anything that is not a string.
   */
  public ngAfterViewInit(): void {
    // Take a stream of query changes
    this.querySubject.pipe(
      untilComponentDestroyed(this),
      filter(v => (typeof v === 'string') && v.length >= this.minimumCharacters),
      // Debounce the query changes
      debounceTime(this.debounceDelay),
      // Only allow a query through if it is different from the previous query
      distinctUntilChanged(),
    ).subscribe((query: string) => {
      this.query.next(query);
    });

  }

  /**
   * Needed for untilComponentDestroyed
   */
  public ngOnDestroy(): void {}

  /**
   * Stub in onChange
   *
   * @internal
   *
   * Needed for ControlValueAccessor (View -> model callback called when value changes)
   */
  // istanbul ignore next
  public onChange: (value: string) => void = () => { };


  /**
   * Stub in onTouched
   *
   * @internal
   *
   * Needed for ControlValueAccessor (View -> model callback called when select has been touched)
   */
  // istanbul ignore next
  public onTouched = () => { };

  /**
   * Close the overlay panel
   */
  public close(): void {
    if (this.autocompleteTrigger.panelOpen) {
      this.panelOpen = false;
      this.changeDetectorRef.markForCheck();
      this.onTouched();
      this.updateValueAndValidity();
      // Alert the consumer
      this.closed.emit();
    }
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
   * Focus the text input
   *
   * @internal
   */
  public focus(): void {
    this.inputElement.nativeElement.focus();
  }

  /**
   * Open the overlay panel
   */
  public open(): void {
    if (this.isDisabled || !this.options || !this.options.length || this.panelOpen) {
      return;
    }
    this.opened.emit();
  }

  /**
   * Emit a change event to set the model value
   *
   */
  private propagateChanges(): void {
    const valueToEmit = this.autocompleteFormControl.value;
    this.value = valueToEmit;
    this.valueChange.emit(valueToEmit);
    this.onChange(valueToEmit);
    this.selectionChange.emit(new TsAutocompleteChange(this, valueToEmit));
    this.changeDetectorRef.markForCheck();
  }

  /**
   * Call FormControl updateValueAndValidity function to ensure value and valid status get updated.
   */
  private updateValueAndValidity(): void {
    if (this.ngControl && this.ngControl.control) {
      this.ngControl.control.updateValueAndValidity();
    }
  }

  /**
   * Sets the select's value. Part of the ControlValueAccessor interface required to integrate with Angular's core forms API.
   *
   * NOTE: Currently we are not using this, but it still must be present since this component is acting as a CVA.
   *
   * @internal
   *
   * @param value - New value to be written to the model
   */
  public writeValue(value: string): void { }


  /**
   * Save a callback function to be invoked when the select's value changes from user input.
   * Part of the ControlValueAccessor interface required to integrate with Angular's core forms API.
   *
   * @internal
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
   * @internal
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
   * @internal
   *
   * Implemented as part of TsFormFieldControl.
   */
  public onContainerClick(): void {
    this.focus();
  }


  /**
   * Close the dropdown and reset the query when the user leaves the input
   *
   * @param event - The keyboard or mouse event
   */
  public handleInputBlur(event: KeyboardEvent | MouseEvent): void {
    // FIXME: cannot use dot syntax here since 'relatedTarget' doesn't exist on a KeyboardEvent
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
        this.resetAutocompleteQuery();
      }
    } else if (this.autocompleteTrigger.panelOpen) {
      this.close();
      this.autocompleteTrigger.closePanel(true);
    }

    // Mark this control as 'touched' to trigger any validations needed on blur
    this.onTouched();
    this.updateValueAndValidity();
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


  /**
   * Select an item
   *
   * @param selection - The item to select
   */
  public autocompleteSelectItem(selection: TsAutocompletePanelSelectedEvent): void {
    const isDuplicate = (this.autocompleteFormControl.value || []).findIndex(o => this.valueComparator(o, selection.option.value)) >= 0;

    // istanbul ignore else
    if (isDuplicate) {
      this.duplicateSelection.emit(new TsAutocompleteChange(this, selection.option.value));
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
      const options = (this.autocompleteFormControl.value || []).concat(selection.option.value);
      this.autocompleteFormControl.setValue(options);
    } else {
      // Update the form control
      this.autocompleteFormControl.setValue([selection.option.value]);

      // In single selection mode, set the query input to the selection so the user can see what was selected
      this.inputElement.nativeElement.value = selection.option.viewValue;
    }

    // Update the panel position in case the addition of a chip causes the select height to change
    // istanbul ignore else
    if (this.autocompleteTrigger.overlayRef) {
      this.autocompleteTrigger.overlayRef.updatePosition();
      this.changeDetectorRef.detectChanges();
    }

    // Notify consumers about changes
    this.optionSelected.emit(new TsAutocompleteChange(this, selection.option.value));
    this.selectionChange.emit(new TsAutocompleteChange(this, this.autocompleteFormControl.value));
  }


  /**
   * Chip component emit a focusInput event, autocomplete puts focus on input field.
   */
  public focusInput(): void {
    this.focus();
  }


  /**
   * Deselect an item
   *
   * @param option - The value of the item to remove
   */
  public autocompleteDeselectItem(option: TsChipComponent): void {
    // Remove the selection from the array of selections
    const options = (this.autocompleteFormControl.value || []).filter(opt => !this.valueComparator(opt, option.value));

    // Update the form control
    this.autocompleteFormControl.setValue(options);

    // If the only chip was removed, re-focus the input
    // istanbul ignore else
    if (options.length === 0) {
      this.focus();
    }

    // HACK: For some reason, triggering change detection works in the selection method above, but not here. Same issue seems present in
    // TsOptionComponent where `setActiveStyles` works by calling the CDR but `setInactiveStyles` required a timeout.
    setTimeout(() => {
      // Update the panel position in case the removal of a chip causes the select height to change
      if (this.autocompleteTrigger.overlayRef) {
        this.autocompleteTrigger.overlayRef.updatePosition();
      }
    });

    // Notify consumers about changes
    this.optionDeselected.emit(new TsAutocompleteChange(this, option));
    this.selectionChange.emit(new TsAutocompleteChange(this, options));
  }


  /**
   * Function for tracking for-loops changes
   *
   * @internal
   *
   * @param index - The item index
   * @returns The unique ID
   */
  public trackByFn(index): number {
    return index;
  }

}
