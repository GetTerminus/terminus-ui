import {
  Component,
  Input,
  Output,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewEncapsulation,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  EventEmitter,
  ViewChild,
  ElementRef,
  OnDestroy,
  isDevMode,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatAutocompleteSelectedEvent,
  MatChipInputEvent,
  MatAutocompleteTrigger,
  MatAutocomplete,
} from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
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
export class TsAutocompleteComponent implements AfterViewInit, OnChanges, OnDestroy {
  /**
   * Store the debounce delay
   */
  private _debounceDelay: number = 200;

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
   * Store the formatter function for the UI display
   */
  private uiFormatFn: (value: any) => string;

  /**
   * Provide access to the input element
   */
  @ViewChild('autocomplete')
  public autocomplete: MatAutocomplete;

  // TODO: WHY DO NONE OF THESE WORK?? All examples show getting reference with
  // MatAutocompleteTrigger
  /**
   * Provide access to the input element
   */
  /*
   *@ViewChild('trigger')
   *public trigger: MatAutocompleteTrigger;
   */
  @ViewChild('bing', { read: MatAutocompleteTrigger }) bing: MatAutocompleteTrigger;


  /*
   *@ViewChild(MatAutocompleteTrigger)
   *foobing: MatAutocompleteTrigger;
   */
  @ViewChildren('trigger')
  public trigger: ElementRef;

  @ViewChildren(MatAutocompleteTrigger)
  public foobar: QueryList<MatAutocompleteTrigger>

  /**
   * Provide access to the input element
   */
  @ViewChild(MatAutocompleteTrigger) autocompleteTrigger: MatAutocompleteTrigger;

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
    this.selectedOptions = coerceArray(selections);
  };

  /**
   * Emit the selected chip
   */
  // TODO: any way to add a type here? Get if from the passed in options?
  @Output()
  optionSelected: EventEmitter<any> = new EventEmitter();

  /**
   * Emit the removed chip
   */
  // TODO: any way to add a type here?
  @Output()
  optionRemoved: EventEmitter<any> = new EventEmitter();

  /**
   * Emit the current selection
   */
  // TODO: any way to add a type here?
  @Output()
  selection: EventEmitter<any[]> = new EventEmitter();

  /**
   * Emit the query string
   */
  /*
   *@Output()
   *query: Observable<string> = new BehaviorSubject('').asObservable().pipe(
   *  debounceTime(this.debounceDelay),
   *);
   */
  @Output()
  public query: EventEmitter<string> = new EventEmitter();


  querySubject: BehaviorSubject<string> = new BehaviorSubject('');


  /*
   *subscription: Subscription;
   */


  ngAfterViewInit() {
    console.warn('ngAfterViewChecked: ');
    console.log('this.foobar: ', this.foobar);
    console.log('this.bing: ', this.bing);
    console.log('this.trigger: ', this.trigger);
    console.log('this.autocomplete: ', this.autocomplete);
    console.log('this.autocompleteTrigger: ', this.autocompleteTrigger);

    this.querySubject.pipe(
      debounceTime(this.debounceDelay),
    ).subscribe((v: any) => {
      console.log('v: ', v);
      this.query.next(v);
    });


    /*
     *this._subscribeToClosingActions();
     */
    /*
     *this.autocompleteTrigger.panelClosingActions
     *  .subscribe((e) => {
     *    if (!(e && e.source)) {
     *      this.formControl.setValue(null)
     *      this.autocompleteTrigger.closePanel()
     *    }
     *  })
     */
  }


  ngOnChanges(changes: SimpleChanges) {
    /*
     *console.log('CHANGES: ', changes)
     */
  }


  ngOnDestroy() {
    /*
     *if (!!this.subscription && !this.subscription.closed) {
     *  this.subscription.unsubscribe();
     *}
     */
  }


  /*
   *private _subscribeToClosingActions() {
   *  if (!!this.subscription && !this.subscription.closed) {
   *    this.subscription.unsubscribe();
   *  }
   *  this.subscription = this.autocompleteTrigger.panelClosingActions
   *    .subscribe((e: any) => {
   *      if (!e || !e.source) {
   *        this.formControl.setValue(null);
   *      }
   *    },
   *    (err) => this._subscribeToClosingActions(),
   *    () => this._subscribeToClosingActions());
   *}
   */


  /**
   * Select an option
   *
   * @param event - The selection event from the underlying MatAutocomplete
   * @param input - The input that triggered the event
   */
  selectOption(event: MatAutocompleteSelectedEvent, input?: any): void {
    console.log('option selected: ', event, input);

    // The selected option
    const selection = this.getSelectionValue(event.option.value);

    // Add to the displayed selection chips
    this.selectedOptions.push(selection);

    // Reset the autocomplete input text value
    if (input) {
      input.value = '';
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
  deselectOption(option: any): void {
    console.log('option removed: ', option);
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
  displayOption(option: any): string | any {
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
  getSelectionValue(selection: any): string | any {
    if (this.valueFunction && typeof(this.valueFunction) === 'function') {
      return this.valueFunction(selection);
    } else {
      return selection;
    }
  }
}
