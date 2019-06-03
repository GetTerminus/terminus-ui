// NOTE: A method must be used to dynamically format values for the UI
// tslint:disable: template-no-call-expression
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  isDevMode,
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

import {
  BehaviorSubject,
  of,
  Subject,
} from 'rxjs';

import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import { MatChipList } from '@angular/material';
import {
  hasRequiredControl,
  isString,
  TsDocumentService,
  untilComponentDestroyed,
} from '@terminus/ngx-tools';
import { coerceNumberProperty } from '@terminus/ngx-tools/coercion';
import { TsFormFieldControl } from '@terminus/ui/form-field';
import {
  TS_OPTION_PARENT_COMPONENT,
  TsOptgroupComponent,
  TsOptionComponent,
} from '@terminus/ui/option';
import { TS_SPACING } from '@terminus/ui/spacing';
import { TsStyleThemeTypes } from '@terminus/ui/utilities';
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
let nextUniqueId = 0;

/**
 * Define a type for allowed {@link TsAutocompleteComponent} formatter function
 */
export type TsAutocompleteFormatterFn = (value: string) => string;


/**
 * Define a type for allowed {@link TsAutocompleteComponent} comparator function
 */
export type TsAutocompleteComparatorFn = (value: string) => string;


export class TsAutocompleteSelectedEvent extends MatAutocompleteSelectedEvent {}

const DEFAULT_MINIMUM_CHARACTER_COUNT = 2;
const DEFAULT_DEBOUNCE_DELAY = 200;

/**
 * The event object that is emitted when the select value has changed
 */
export class TsAutocompleteChange<T = string[] | string> {
  constructor(
    public source: TsAutocompleteComponent,
    public value: T,
  ) { }
}

/**
 * The UI Component
 *
 * #### QA CSS CLASSES
 * - `qa-autocomplete`: The primary container
 * - `qa-autocomplete-input`: The input element
 * - `qa-autocomplete-spinner`: The progress indicator
 * - `qa-autocomplete-chip`: An individual selection 'chip'
 * - `qa-autocomplete-options`: The container for the list of options
 * - `qa-autocomplete-option`: An individual option from the list
 * - `qa-autocomplete-hint`: The input hint
 * - `qa-autocomplete-validation-messages`: The container for validation messages
 *
 * @example
 * <ts-autocomplete
 *              debounceDelay="300"
 *              displayWith="(v) => v.name"
 *              hint="Begin typing to search.."
 *              label="Select options:"
 *              multiple="(v) => v.id"
 *              name="product selections"
 *              options="[{}, {}, ...]"
 *              [showProgress]="inProgress"
 *              theme="primary"
 *              (optionSelected)="mySelected($event)"
 *              (optionRemoved)="myRemoved($event)"
 *              (selection)="mySelection($event)"
 *              (query)="myQuery($event)"
 * ></ts-autocomplete>
 *
 * <example-url>https://getterminus.github.io/ui-demos-master/components/autocomplete</example-url>
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
   * Define the FormControl
   */
  public autocompleteFormControl = new FormControl([]);

  /**
   * An array of selected values
   */
  public autocompleteSelections: string[] = [];

  /**
   * Store a reference to the document object
   */
  private document: Document;

  /**
   * Subject used to alert the parent {@link FormFieldComponent} when the label gap should be recalculated
   *
   * Implemented as part of TsFormFieldControl.
   */
  public readonly labelChanges: Subject<void> = new Subject<void>();

  /**
   * Manages keyboard events for options in the panel.
   */
  private keyManager!: ActiveDescendantKeyManager<TsOptionComponent>;

  /**
   * Define the flex gap spacing
   */
  public flexGap = TS_SPACING.small[0];

  /**
   * The IDs of child options to be passed to the aria-owns attribute.
   */
  public optionIds = '';

  /**
   * Emits when the panel element is finished transforming in.
   */
  public panelDoneAnimatingStream = new Subject<string>();

  /**
   * Whether or not the overlay panel is open
   */
  public panelOpen = false;

  // Since the FormFieldComponent is inside this template, we cannot use a provider to pass this component instance to the form field.
  // Instead, we pass it manually through the template with this reference.
  public selfReference = this;

  /*
   * Implemented as part of TsFormFieldControl.
   */
  public readonly stateChanges: Subject<void> = new Subject<void>();


  /**
   * Define the default component ID
   */
  public readonly uid = `ts-autocomplete-${nextUniqueId++}`;

  /**
   * Management of the query string
   */
  public querySubject: BehaviorSubject<string> = new BehaviorSubject('');

  /**
   * Store the search query
   */
  public searchQuery!: string;


  /**
   * VIEW ACCESS
   */

  /**
   * Access the trigger
   */
  @ViewChild('auto')
  public autocompletePanel!: TsAutocompletePanelComponent;

  /**
   * Access the trigger
   */
  @ViewChild(TsAutocompleteTriggerDirective)
  public autocompleteTrigger!: TsAutocompleteTriggerDirective;

  /**
   * Access the chip list
   */
  @ViewChild('chipList')
  public chipList: MatChipList | undefined;

  /**
   * Access the container element
   */
  @ViewChild('containerElement')
  public containerElement!: ElementRef;

  /**
   * Access the actual HTML element
   */
  @ViewChild('input')
  public inputElement!: ElementRef<HTMLInputElement>;

  /**
   * Access the label element
   */
  @ViewChild('labelElement')
  public labelElement!: ElementRef;

  /**
   * Access the trigger that opens the select
   */
  @ViewChild('trigger')
  public trigger!: ElementRef;

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
   * Access the overlay pane containing the options
   */
  @ViewChild(CdkConnectedOverlay)
  public overlayDir!: CdkConnectedOverlay;

  /**
   * Access the panel containing the select options
   */
  @ViewChild('panel')
  public panel!: ElementRef;


  /**
   * GETTERS
   */

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
   * INPUTS
   */

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
    this._debounceDelay = coerceNumberProperty(value);
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
   * EMITTERS
   */

  /**
   * Event for when a duplicate selection is made
   */
  @Output()
  public readonly duplicateSelection: EventEmitter<TsAutocompleteChange> = new EventEmitter();

  /**
   * Emit the selected chip
   */
  @Output()
  public readonly optionSelected: EventEmitter<TsAutocompleteChange> = new EventEmitter();

  /**
   * Event for when an option is removed
   */
  @Output()
  public readonly optionDeselected: EventEmitter<TsAutocompleteChange> = new EventEmitter();

  /**
   * Emit the current selection
   */
  @Output()
  public readonly selection: EventEmitter<string[]> = new EventEmitter();

  /**
   * Emit the query string
   */
  @Output()
  public readonly query: EventEmitter<string> = new EventEmitter();

  /**
   * Event for when the query has changed
   */
  @Output()
  public readonly queryChange: EventEmitter<string> = new EventEmitter();

  /**
   * Event for when the selections change
   */
  @Output()
  public readonly selectionChange: EventEmitter<TsAutocompleteChange> = new EventEmitter();

  /**
   * Event that emits whenever the raw value of the select changes. This is here primarily
   * to facilitate the two-way binding for the `value` input.
   *
   * Needed for {@link TsFormFieldComponent}.
   */
  @Output()
  public readonly valueChange: EventEmitter<string> = new EventEmitter<string>();

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

  public ngOnInit(): void {

    // Seed the control value
    // NOTE: When the consumer is using an ngModel, the value is not set on the first cycle.
    // We need to push it to the next event loop. When using a FormControl the value is there on the first run.
    // eslint-disable-next-line dot-notation
    if (this.ngControl && this.ngControl['form']) {
      // istanbul ignore else
      if (this.ngControl.value) {
        this.autocompleteFormControl.setValue(this.ngControl.value);
        this.autocompleteSelections = this.ngControl.value;
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
              this.autocompleteSelections = this.ngControl.value;
            }
          });
      }
    } else {
      // HACK: Wait until the next detection cycle to set the value from an ngModel.
      // NOTE: Using CDR.detectChanges causes errors in children that expect TsOptionComponent to exist.
      setTimeout(() => {
        // istanbul ignore else
        if (this.ngControl && this.ngControl.value) {
          this.autocompleteFormControl.setValue(this.ngControl.value);
          this.autocompleteSelections = this.ngControl.value;
        }
      });
    }

    // Take a stream of query changes
    this.querySubject.pipe(
      untilComponentDestroyed(this),
      // Debounce the query changes
      debounceTime(this.debounceDelay),
      // If the query is shorter than allowed, convert to an empty string
      switchMap(query => of((query && (query.length >= this.minimumCharacters)) ? query : '')),
      // Only allow a query through if it is different from the previous query
      distinctUntilChanged(),
    ).subscribe((query: string) => {
      // NOTE: When an option is selected, the full string value comes through this stream. We are checking the stream value against the
      // input element value to verify we are sending a query rather than a selected option.
      const inputValue = this.inputElement.nativeElement.value;
      const queryIsValid = (query === inputValue) || (query === '');

      this.queryChange.emit(queryIsValid ? query : inputValue);
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
   *
   * Should focus the text input.
   */
  public focus(): void {
    this.inputElement.nativeElement.focus();
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
    this.focus();
  }


  /**
   * Close the dropdown and reset the query when the user leaves the input
   *
   * @param event - The keyboard or mouse event
   */
  public handleInputBlur(event: KeyboardEvent | MouseEvent): void {
    // NOTE(B$): cannot use dot syntax here since 'relatedTarget' doesn't exist on a KeyboardEvent
    // eslint-disable-next-line dot-notation
    const hasRelatedTarget = !!(event && event['relatedTarget']);
    // eslint-disable-next-line dot-notation
    const hasNodeName = !!(hasRelatedTarget && event['relatedTarget'].nodeName);

    if (hasRelatedTarget && hasNodeName) {
      // If the blur event comes from the user clicking an option, `event.relatedTarget.nodeName`
      // will be `TS_SELECT_OPTION`.
      // istanbul ignore else
      // NOTE: TypeScript warns `Property 'nodeName' does not exist on type 'EventTarget'.`
      // eslint-disable-next-line dot-notation
      if (event['relatedTarget'].nodeName !== 'TS-SELECT-OPTION') {
        this.resetAutocompleteQuery();
      }
    } else if (this.autocompleteTrigger.panelOpen) {
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
    if (!isString(selection.option.value)) {
      throw Error('The value passing into autocomplete has to be string type');
    }
    const isDuplicate = this.autocompleteSelections.indexOf(selection.option.value) >= 0;

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
        this.resetAutocompleteQuery();
      }

      // Add to the collection
      const newSelection = this.autocompleteSelections.slice();
      newSelection.push(selection.option.value);
      this.autocompleteSelections = newSelection;

      // Update the form control
      this.autocompleteFormControl.setValue(this.autocompleteSelections.slice());
    } else {
      // Update the selected value
      this.autocompleteSelections = [selection.option.value];

      // Update the form control
      this.autocompleteFormControl.setValue(this.autocompleteSelections.slice());

      // In single selection mode, set the query input to the selection so the user can see what was selected
      const newValue = this.autocompleteFormControl.value[0];
      this.inputElement.nativeElement.value = newValue;
    }

    // Update the panel position in case the addition of a chip causes the select height to change
    // istanbul ignore else
    if (this.autocompleteTrigger.overlayRef) {
      this.autocompleteTrigger.overlayRef.updatePosition();
      this.changeDetectorRef.detectChanges();
    }

    // Notify consumers about changes
    this.optionSelected.emit(new TsAutocompleteChange(this, selection.option.value));
    this.selectionChange.emit(new TsAutocompleteChange(this, this.autocompleteSelections));
  }


  /**
   * Deselect an item
   *
   * @param value - The value of the item to remove
   */
  public autocompleteDeselectItem(value: string): void {
    // Find the key of the selection in the selectedOptions array
    const index = this.autocompleteSelections.indexOf(value);
    const selections = this.autocompleteSelections.slice();
    // If not found
    if (index < 0) {
      return;
    }

    // Remove the selection from the selectedOptions array
    selections.splice(index, 1);
    this.autocompleteSelections = selections;

    // Update the form control
    this.autocompleteFormControl.setValue(this.autocompleteSelections.slice());

    // If the only chip was removed, re-focus the input
    // istanbul ignore else
    if (this.autocompleteSelections.length < 1) {
      this.focus();
    }

    // HACK: For some reason, triggering change detection works in the selection method above, but not here. Same issue seems preset in
    // TsOptionComponent where `setActiveStyles` works by calling the CDR but `setInactiveStyles` required a timeout.
    setTimeout(() => {
      // Update the panel position in case the removal of a chip causes the select height to change
      if (this.autocompleteTrigger.overlayRef) {
        this.autocompleteTrigger.overlayRef.updatePosition();
      }
    });

    // Notify consumers about changes
    this.optionDeselected.emit(new TsAutocompleteChange(this, value));
    this.selectionChange.emit(new TsAutocompleteChange(this, this.autocompleteSelections.slice()));
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

}
