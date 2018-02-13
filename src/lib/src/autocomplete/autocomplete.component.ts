import {
  Component,
  Input,
  Output,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  AfterViewInit,
  EventEmitter,
  ViewChild,
  ElementRef,
  isDevMode,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
  MatAutocomplete,
} from '@angular/material';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';
import { filter } from 'rxjs/operators/filter';
import {
  coerceArray,
  coerceNumberProperty,
} from '@terminus/ngx-tools/coercion';
import { isFunction } from '@terminus/ngx-tools';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { TsStyleThemeTypes } from './../utilities/types/style-theme.types';
import { TsAutocompleteFormatterFn } from './../utilities/types/autocomplete.types';


/*
 * Using this causes:
 * `Error: compile-ngc-es5 compilation failed: index.ts(52,3): error TS2305: Module
 * '"/Users/bc/code/Terminus/terminus-ui/out-tsc/lib/src/autocomplete/autocomplete.component"' has
 * no exported member 'TsAutocompleteFormatterFn'.`
 */
/*
 *export type TsAutocompleteFormatterFn = (value: any) => string;
 */



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
 *              multiple="true"
 *              name="product selections"
 *              options="[{}, {}, ...]"
 *              selectionsControl="myForm.get('myControl')"
 *              [showProgress]="inProgress"
 *              theme="primary"
 *              valueFunction="(v) => v.id"
 *              initialSelections="[{}]"
 *              (optionSelected)="mySelected($event)"
 *              (optionRemoved)="myRemoved($event)"
 *              (selection)="mySelection($event)"
 *              (query)="myQuery($event)"
 * ></ts-autocomplete>
 *
 * <example-url>https://goo.gl/ieUPaG</example-url>
 */
@Component({
  selector: 'ts-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  exportAs: 'tsAutocomplete',
  host: {
    class: 'ts-autocomplete',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TsAutocompleteComponent implements AfterViewInit {
  /**
   * Store the debounce delay
   */
  private _debounceDelay: number = 200;

  /**
   * Management of the query string
   */
  public querySubject: BehaviorSubject<string> = new BehaviorSubject('');

  /**
   * Define if the chips/selections should be removable
   */
  public removableChips: boolean = true;

  /**
   * Store the search query
   */
  public searchQuery: string;

  /**
   * Define if the chips/selections should be selectable
   */
  public selectableChips: boolean = false;

  /**
   * Store the selected options
   */
  public selectedOptions: string[] = [];

  /**
   * Store the formatter function for the saved value
   */
  private selectionFormatFn: (value: any) => string;

  /**
   * Store the formatter function for the UI display
   */
  private uiFormatFn: (value: any) => string;

  /**
   * Provide access to the input element
   */
  @ViewChild('autocomplete')
  public autocomplete: MatAutocomplete;

  /**
   * Provide access to the input element
   */
  @ViewChild('autocompleteTrigger')
  set autocompleteTrigger(value: MatAutocompleteTrigger) {
    this.trigger = value;
  }
  get autocompleteTrigger(): MatAutocompleteTrigger {
    return this.trigger;
  }
  private trigger: MatAutocompleteTrigger;

  /**
   * Provide direct access to the input
   */
  @ViewChild('input')
  public input: ElementRef;

  /**
   * Define a debounce delay for the query
   */
  @Input()
  public set debounceDelay(value: number) {
    // istanbul ignore else
    if (value) {
      this._debounceDelay = coerceNumberProperty(value);
    }
  }
  public get debounceDelay(): number {
    return this._debounceDelay;
  }

  /**
   * A function to output the UI text from the selected item
   *
   * When undefined the full selection object will be used as the display value
   */
  @Input()
  public set displayWith(value: TsAutocompleteFormatterFn) {
    if (value && isFunction(value)) {
      this.uiFormatFn = value;
    } else {
      // istanbul ignore else
      if (isDevMode()) {
        throw Error(`TsAutocompleteComponent: 'displayWith' must be passed a function.`)
      }
    }
  }
  public get displayWith(): TsAutocompleteFormatterFn {
    return this.uiFormatFn;
  }

  /**
   * Define a hint for the input
   */
  // FIXME: Fix potential overlap of hint and error messages
  @Input()
  public hint: string;

  /**
   * Define the placeholder/label
   */
  @Input()
  public label: string;

  /**
   * Define if multiple selections are allowed
   */
  @Input()
  public multiple: boolean = false;

  /**
   * Define the name attribute value
   */
  @Input()
  public name: string;

  /**
   * The list of options to display in the drop down
   */
  @Input()
  public options: any[];

  /**
   * Define the form control to save selections to
   */
  @Input()
  public selectionsControl: FormControl;

  /**
   * Define if the progress spinner should be active
   */
  @Input()
  public showProgress: boolean = false;

  /**
   * Define the component theme
   */
  @Input()
  public theme: TsStyleThemeTypes = 'primary';

  /**
   * Define a function to select the value to save on selection
   *
   * When undefined the full selection object will be saved as the value
   */
  @Input()
  public set valueFunction(value: (value: any) => string) {
    if (value && isFunction(value)) {
      this.selectionFormatFn = value;
    } else {
      // istanbul ignore else
      if (isDevMode()) {
        throw Error(`TsAutocompleteComponent: 'valueFunction' must be passed a function.`)
      }
    }
  }
  public get valueFunction(): ((value: any) => string) {
    return this.selectionFormatFn;
  }

  /**
   * Define items that should be selected when the component loads
   */
  @Input()
  public set initialSelections(selections: any[]) {
    // istanbul ignore else
    if (selections) {
      // Seed the array
      this.selectedOptions = coerceArray(selections);

      // istanbul ignore else
      if (this.selectionsControl && this.selectionsControl.setValue) {
        // Seed the formControl
        this.selectionsControl.setValue(this.selectedOptions);
      }
    }
  };

  /**
   * Emit the selected chip
   */
  @Output()
  public optionSelected: EventEmitter<any> = new EventEmitter();

  /**
   * Emit the removed chip
   */
  @Output()
  public optionRemoved: EventEmitter<any> = new EventEmitter();

  /**
   * Emit the current selection
   */
  @Output()
  public selection: EventEmitter<any[]> = new EventEmitter();

  /**
   * Emit the query string
   */
  @Output()
  public query: EventEmitter<string> = new EventEmitter();

  /**
   * Subscribe to the querySubject and pass values to the query emitter
   */
  public ngAfterViewInit(): void {
    // Take a stream of query changes
    this.querySubject.pipe(
      // FIXME: When an option is selected, the full selected value is piped through this stream
      // somehow. Have not figured out why. Best guess is it's something due to the
      // `matAutocomplete` directive. For now, we are filtering out anything that is not a string.
      filter((v) => (typeof v === 'string')),
      // debounce the query changes
      debounceTime(this.debounceDelay),
      // only allow a query through if it is different from the previous
      distinctUntilChanged(),
    ).subscribe((query: string) => {
      this.query.next(query);
    });
  }


  /**
   * Select an option
   *
   * @param event - The selection event from the underlying MatAutocomplete
   * @param input - The input that triggered the event
   */
  public selectOption(event: MatAutocompleteSelectedEvent, input?: ElementRef): void {
    // The selected option
    const selection = this.getSelectionValue(event.option.value);

    // Add to the displayed selection chips
    this.selectedOptions.push(selection);

    // If supporting multiple selections, reset the input text value
    if (this.multiple) {
      this.searchQuery = '';
      // istanbul ignore else
      if (input && input.nativeElement) {
        input.nativeElement.value = '';
      }
    }

    // Update the form control
    if (this.selectionsControl && this.selectionsControl.setValue) {
      this.selectionsControl.setValue(this.selectedOptions);
    }

    // Let consumers know about the changes
    this.optionSelected.emit(event.option.value);
    this.selection.emit(this.selectedOptions);
  }


  /**
   * Deselect an option
   *
   * @param option - The option to deselect
   */
  public deselectOption(option: any): void {
    const selection = this.getSelectionValue(option);

    // Find the key of the selection in the selectedOptions array
    const index = this.selectedOptions.indexOf(selection);

    // If found
    if (index >= 0) {
      // Remove the selection from the selectedOptions array
      this.selectedOptions.splice(index, 1);
    }

    // Update the form control
    if (this.selectionsControl && this.selectionsControl.setValue) {
      this.selectionsControl.setValue(this.selectedOptions);
    }

    // Let consumers know about the changes
    this.optionRemoved.emit(selection);
    this.selection.emit(this.selectedOptions);
  }


  /**
   * Use the user defined `displayWith` function to show the correct UI text if it was set.
   * Otherwise, display the selected value.
   *
   * @param option - The option
   * @return The string value for the UI
   */
  public displayOption(option: any): string | any {
    return (this.uiFormatFn) ? this.uiFormatFn(option) : option;
  }


  /**
   * Determine what to save as the selection.
   *
   * If `valueFunction` is not defined, save the full selection object.
   *
   * @param selection - The selection
   * @return The value to save
   */
  public getSelectionValue(selection: any): string | any {
    return (this.valueFunction) ? this.valueFunction(selection) : selection;
  }

  /**
   * Close the dropdown and reset the query when the user leaves the input
   */
  public handleBlur(event: KeyboardEvent | MouseEvent): void {
    // NOTE(B$): cannot use dot syntax here since 'relatedTarget' doesn't exist on a KeyboardEvent
    const eventValue = (event && event['relatedTarget']) ? event['relatedTarget'] : null;
    console.log('eventValue: ', eventValue, event)

    if (eventValue && eventValue.nodeName) {
      // If the blur event comes from the user clicking an option, `event.relatedTarget.nodeName`
      // will be `MAT-OPTION`.
      if (eventValue.nodeName !== 'MAT-OPTION') {
        this.resetResults();
      }

    } else {
      // If no eventValue exists, this was a blur event triggered by the Escape key
      this.resetResults();
    }
  }


  /**
   * Reset the autocomplete input and close the panel
   */
  private resetResults(): void {
    // close the autocomplete planel
    this.trigger.closePanel();
    // clear the search query stream
    this.querySubject.next('');
    // clear the query input
    this.input.nativeElement.value = '';
  }

}
