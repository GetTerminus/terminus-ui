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
  OnDestroy,
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
import {
  coerceArray,
  coerceNumberProperty,
} from '@terminus/ngx-tools/coercion';
import { isFunction } from '@terminus/ngx-tools';
import { Subscription } from 'rxjs/Subscription';
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
 * TODO: Fill this section out
 * This is the autocomplete UI Component
 *
 * #### QA CSS CLASSES
 * - `qa-autocomplete`: Placed on the primary container
 *
 * @example
 * <ts-autocomplete
 *              item="Value"
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
export class TsAutocompleteComponent implements AfterViewInit, OnDestroy {
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
  public selectableChips: boolean = true;

  /**
   * Store the selected options
   */
  public selectedOptions: string[] = [];

  /**
   * Store the formatter function for the saved value
   */
  private selectionFormatFn: (value: any) => string;

  /**
   * Manage the autocomplete panel subscription
   */
  private subscription$: Subscription;

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
  public resultsControl: FormControl;

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
  public set initialSelection(selections: any[]) {
    // istanbul ignore else
    if (selections) {
      this.selectedOptions = coerceArray(selections);
    }
  };

  /**
   * Emit the selected chip
   */
  // TODO: any way to add a type here? Get if from the passed in options?
  @Output()
  public optionSelected: EventEmitter<any> = new EventEmitter();

  /**
   * Emit the removed chip
   */
  // TODO: any way to add a type here?
  @Output()
  public optionRemoved: EventEmitter<any> = new EventEmitter();

  /**
   * Emit the current selection
   */
  // TODO: any way to add a type here?
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
    // Debounce the querySubject input, then emit the query event
    this.querySubject.pipe(
      // debounce the query changes
      debounceTime(this.debounceDelay),
      // only allow a query through if it is different from the previous
      distinctUntilChanged(),
    ).subscribe((v: any) => {
      console.log('v: ', v);
      this.query.next(v);
    });

    // Subscribe to the autocomplete panel closing events
    if (this.multiple) {
      this._subscribeToClosingActions();
    }
  }


  /**
   * Tear down the autocomplete subscription
   */
  public ngOnDestroy() {
    if (!!this.subscription$ && !this.subscription$.closed) {
      this.subscription$.unsubscribe();
    }
  }


  /**
   * Clear the autocomplete input value when the autocomplete closes
   */
  private _subscribeToClosingActions(): void {
    if (!!this.subscription$ && !this.subscription$.closed) {
      this.subscription$.unsubscribe();
    }

    // Subscribe to the autocomplete panel closing actions
    this.subscription$ = this.trigger.panelClosingActions
      .subscribe((e: any) => {
        if (!e || !e.source) {
          // Clear the input text
          this.input.nativeElement.value = '';
        }
      },
      (err) => this._subscribeToClosingActions(),
      () => this._subscribeToClosingActions());
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
      // istanbul ignore else
      if (input && input.nativeElement) {
        input.nativeElement.value = '';
      }
    }

    // Update the form control
    if (this.resultsControl && this.resultsControl.setValue) {
      this.resultsControl.setValue(this.selectedOptions);
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
  // TODO: any way to type this?
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
    if (this.resultsControl && this.resultsControl.setValue) {
      this.resultsControl.setValue(this.selectedOptions);
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
  // TODO: any way to type this?
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
  // TODO: add types?
  public getSelectionValue(selection: any): string | any {
    return (this.valueFunction) ? this.valueFunction(selection) : selection;
  }

}
