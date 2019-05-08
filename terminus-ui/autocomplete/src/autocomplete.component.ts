// NOTE: A method must be used to dynamically format values for the UI
// tslint:disable: template-no-call-expression
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  isDevMode,
  OnDestroy,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormControl,
  ValidationErrors,
} from '@angular/forms';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
} from '@angular/material/autocomplete';
import {
  arrayContainsObject,
  isFunction,
  untilComponentDestroyed,
} from '@terminus/ngx-tools';
import {
  coerceArray,
  coerceNumberProperty,
} from '@terminus/ngx-tools/coercion';
import { TS_SPACING } from '@terminus/ui/spacing';
import { TsStyleThemeTypes } from '@terminus/ui/utilities';
import { BehaviorSubject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
} from 'rxjs/operators';


/**
 * Define a type for allowed {@link TsAutocompleteComponent} formatter function
 */
// tslint:disable-next-line no-any
export type TsAutocompleteFormatterFn<OptionType> = (value: OptionType) => string;


/**
 * Define a type for allowed {@link TsAutocompleteComponent} comparator function
 */
export type TsAutocompleteComparatorFn<OptionType> = (value: OptionType) => string;

export class TsAutocompleteSelectedEvent extends MatAutocompleteSelectedEvent {}

const DEFAULT_DEBOUNCE_MS = 200;
const DEFAULT_MINIMUM_CHARACTERS = 2;


/**
 * The autocomplete UI Component
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
 *              selectionsControl="myForm.get('myControl')"
 *              [showProgress]="inProgress"
 *              theme="primary"
 *              initialSelections="[{}]"
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
    class: 'ts-autocomplete',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'tsAutocomplete',
})
// tslint:disable-next-line no-any
export class TsAutocompleteComponent<OptionType = {[name: string]: any}> implements AfterViewInit, OnDestroy {
  /**
   * Define the flex gap spacing
   */
  public flexGap = TS_SPACING.small[0];

  /**
   * Management of the query string
   */
  public querySubject: BehaviorSubject<string> = new BehaviorSubject('');

  /**
   * Store the search query
   */
  public searchQuery!: string;

  /**
   * Define if the chips/selections should be selectable
   */
  public selectableChips = false;

  /**
   * Store the selected options
   */
  public selectedOptions: OptionType[] = [];

  /**
   * Store the formatter function for the UI display
   */
  private uiFormatFn!: (value: OptionType) => string;

  /**
   * Provide access to the input element
   */
  @ViewChild('autocomplete')
  public autocomplete!: MatAutocomplete;

  /**
   * Provide access to the input element
   */
  @ViewChild('autocompleteTrigger')
  public set autocompleteTrigger(value: MatAutocompleteTrigger) {
    this.trigger = value;
  }
  public get autocompleteTrigger(): MatAutocompleteTrigger {
    return this.trigger;
  }
  private trigger!: MatAutocompleteTrigger;

  /**
   * Provide direct access to the input
   */
  @ViewChild('input')
  public input!: ElementRef;

  /**
   * Define a debounce delay for the query
   */
  @Input()
  public set debounceDelay(value: number) {
    this._debounceDelay = coerceNumberProperty(value);
  }
  public get debounceDelay(): number {
    return this._debounceDelay;
  }
  private _debounceDelay = DEFAULT_DEBOUNCE_MS;

  /**
   * A function to output the UI text from the selected item
   *
   * When undefined the full selection object will be used as the display value
   */
  @Input()
  public set displayWith(value: TsAutocompleteFormatterFn<OptionType>) {
    if (!value) {
      return;
    }

    if (isFunction(value)) {
      this.uiFormatFn = value;
    } else if (isDevMode()) {
      throw Error(`TsAutocompleteComponent: 'displayWith' must be passed a function.`);
    }
  }
  public get displayWith(): TsAutocompleteFormatterFn<OptionType> {
    return this.uiFormatFn;
  }

  /**
   * Define a hint for the input
   */
  @Input()
  public hint: string | undefined;

  /**
   * Define the placeholder/label
   */
  @Input()
  public label: string | undefined;

  /**
   * Define a minimum character count for queries
   */
  @Input()
  public set minimumCharacters(value: number) {
    this._minimumCharacters = coerceNumberProperty(value);
  }
  public get minimumCharacters(): number {
    return this._minimumCharacters;
  }
  private _minimumCharacters = DEFAULT_MINIMUM_CHARACTERS;

  /**
   * Define if multiple selections are allowed by passing in a comparator function
   */
  @Input()
  public set multiple(v: TsAutocompleteComparatorFn<OptionType>) {
    if (!v) {
      return;
    }

    if (isFunction(v)) {
      this.comparatorFn = v;
    } else if (isDevMode()) {
      throw Error(`TsAutocompleteComponent: 'multiple' must be passed a 'TsAutocompleteComparatorFn' function.`);
    }
  }
  public get multiple(): TsAutocompleteComparatorFn<OptionType> {
    return this.comparatorFn;
  }
  private comparatorFn!: TsAutocompleteComparatorFn<OptionType>;

  /**
   * Define the name attribute value
   */
  @Input()
  public name: string | undefined;

  /**
   * The list of options to display in the drop down
   */
  @Input()
  public options!: OptionType[];

  /**
   * Define the form control to save selections to
   */
  @Input()
  public set selectionsControl(value: FormControl) {
    if (!value) {
      return;
    }

    this._selectionsControl = value;
  }
  public get selectionsControl(): FormControl {
    return this._selectionsControl;
  }
  private _selectionsControl: FormControl = new FormControl();

  /**
   * Define if the progress spinner should be active
   */
  @Input()
  public showProgress = false;

  /**
   * Define the component theme
   */
  @Input()
  public theme: TsStyleThemeTypes = 'primary';

  /**
   * Define items that should be selected when the component loads
   */
  @Input()
  public set initialSelections(selections: OptionType[]) {
    // istanbul ignore else
    if (selections) {
      // Seed the array
      this.selectedOptions = coerceArray(selections.slice());

      // istanbul ignore else
      if (this.selectionsControl && this.selectionsControl.setValue) {
        // Seed the formControl
        this.selectionsControl.setValue(this.selectedOptions.slice());
      }
    }
  }

  /**
   * Emit the selected chip
   */
  @Output()
  public readonly optionSelected: EventEmitter<OptionType> = new EventEmitter();

  /**
   * Emit the removed chip
   */
  @Output()
  public readonly optionRemoved: EventEmitter<OptionType> = new EventEmitter();

  /**
   * Emit the current selection
   */
  @Output()
  public readonly selection: EventEmitter<OptionType[]> = new EventEmitter();

  /**
   * Emit the query string
   */
  @Output()
  public readonly query: EventEmitter<string> = new EventEmitter();


  public constructor(
    private changeDetectorRef: ChangeDetectorRef,
  ) {}


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

    // Trigger a change detection cycle if the formControl value was changed dynamically
    // istanbul ignore else
    if (this.selectionsControl) {
      this.selectionsControl.valueChanges.pipe(
        untilComponentDestroyed(this),
      ).subscribe((value: OptionType[]) => {
        this.selectedOptions = value.slice();
        this.changeDetectorRef.detectChanges();
      });
    }
  }


  /**
   * Needed for untilComponentDestroyed
   */
  public ngOnDestroy(): void {}


  /**
   * Select an option
   *
   * @param event - The selection event from the underlying MatAutocomplete
   */
  public selectOption(event: TsAutocompleteSelectedEvent): void {
    // The selected option
    const selection: OptionType = event.option.value;

    // Stop the flow if the selection already exists in the array and we're in multiple mode
    if (!!this.multiple && arrayContainsObject(selection, this.selectedOptions, this.comparatorFn)) {
      // Set an error on the control to let the user know they chose a duplicate option
      // istanbul ignore else
      if (this.selectionsControl) {
        this.setDuplicateError(this.selectionsControl, selection, this.uiFormatFn);
      }

      return;
    }

    // Add to the displayed selection chips
    const selections = this.selectedOptions.slice();
    selections.push(selection);
    this.selectedOptions = selections;

    // If supporting multiple selections, reset the input text value
    if (this.multiple) {
      this.resetSearch();
    }

    // Update the form control
    // istanbul ignore else
    if (this.selectionsControl && this.selectionsControl.setValue) {
      this.selectionsControl.setValue(this.selectedOptions.slice());
    }

    // Notify consumers about changes
    this.optionSelected.emit(event.option.value);
    this.selection.emit(this.selectedOptions.slice());
  }


  /**
   * Deselect an option
   *
   * @param option - The option to deselect
   */
  public deselectOption(option: OptionType): void {
    // Find the key of the selection in the selectedOptions array
    const index = this.selectedOptions.indexOf(option);

    // If not found
    if (index < 0) {
      return;
    }

    // Remove the selection from the selectedOptions array
    const selections = this.selectedOptions.slice();
    selections.splice(index, 1);
    this.selectedOptions = selections;

    // Update the form control
    // istanbul ignore else
    if (this.selectionsControl && this.selectionsControl.setValue) {
      this.selectionsControl.setValue(this.selectedOptions);
    }

    // Notify consumers about changes
    this.optionRemoved.emit(option);
    this.selection.emit(this.selectedOptions.slice());
  }


  /**
   * Use the user defined `displayWith` function to show the correct UI text if it was set.
   * Otherwise, display the selected value.
   *
   * @param option - The option
   * @return The string value for the UI or the entire option object
   */
  public displayOption(option: OptionType): string | OptionType {
    return (this.uiFormatFn) ? this.uiFormatFn(option) : option;
  }


  /**
   * Close the dropdown and reset the query when the user leaves the input
   *
   * @param event - The keyboard or mouse event
   */
  public handleBlur(event: KeyboardEvent | MouseEvent): void {
    // NOTE(B$): cannot use dot syntax here since 'relatedTarget' doesn't exist on a KeyboardEvent
    // eslint-disable-next-line dot-notation
    const eventValue: Node | null = (event && event['relatedTarget']) ? event['relatedTarget'] : null;

    if (this.multiple) {
      if (eventValue && eventValue.nodeName) {
        // If the blur event comes from the user clicking an option, `event.relatedTarget.nodeName` will be `MAT-OPTION`.
        if (eventValue.nodeName !== 'MAT-OPTION') {
          this.resetSearch();
        }
      } else {
        // If no eventValue exists, this was a blur event triggered by the Escape key
        this.resetSearch();
      }
    }


    // Since the user never interacts directly with the 'selectionsControl' formControl, we need to
    // manually mark it as 'touched' to trigger validation messages.
    // istanbul ignore else
    if (this.selectionsControl && this.selectionsControl.markAsTouched) {
      this.selectionsControl.markAsTouched();
    }
  }


  /**
   * Reset the autocomplete input and close the panel
   */
  private resetSearch(): void {
    // Close the autocomplete planel
    // istanbul ignore else
    if (this.trigger.panelOpen) {
      this.trigger.closePanel();
    }
    // Clear the query model
    this.searchQuery = '';
    // Clear the search query stream
    this.querySubject.next('');
    // Clear the query input
    this.input.nativeElement.value = '';
  }


  /**
   * Set an error on the form control for a duplicate selection
   *
   * @param control - The form control
   * @param selection - The selected option
   * @param formatter - The UI formatter function
   */
  private setDuplicateError(control: FormControl, selection: OptionType, formatter?: TsAutocompleteFormatterFn<OptionType>): void {
    const invalidResponse: ValidationErrors = {
      notUnique: {
        valid: false,
        actual: formatter ? formatter(selection) : selection,
      },
    };

    control.setErrors(invalidResponse);
  }

}
