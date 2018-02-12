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
  forwardRef,
  EventEmitter,
  ViewChild,
  ElementRef,
  OnDestroy,
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
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { coerceArray } from '@terminus/ngx-tools/coercion';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { TsReactiveFormBaseComponent } from './../utilities/reactive-form-base.component';
import { TsStyleThemeTypes } from './../utilities/types/style-theme.types';


// TODO: can I export a type for the displayWith fn?



/**
 * Custom control value accessor for our component.
 * This allows our custom components to access the underlying form validation via our base class
 */
/* tslint:disable:no-use-before-declare */
export const CUSTOM_AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TsAutocompleteComponent),
  multi: true,
};
/* tslint-enable: no-use-before-declare */


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
  /*
   *providers: [CUSTOM_AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR],
   */
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TsAutocompleteComponent /*extends TsReactiveFormBaseComponent*/ implements AfterViewInit, OnChanges, OnDestroy {
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
  @ViewChild('trigger', { read: MatAutocompleteTrigger }) trigger: MatAutocompleteTrigger;

  /**
   * Provide access to the input element
   */
  @ViewChild(MatAutocompleteTrigger)
  autocompleteTrigger: MatAutocompleteTrigger;

  @Input()
  public resultsControl: FormControl;

  // Set up values to use with Chips
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;

  searchQuery: string;

  /**
   * Store the selected options
   */
  selectedOptions: string[] = [];

  /**
   * A function to output the UI text from the selected item
   */
  @Input()
  public displayWith: ((value: any) => string) | null = null;

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
   * Define the component theme
   */
  @Input()
  public theme: TsStyleThemeTypes = 'primary';

  /**
   * Define if validation messages should be shown immediately or on blur
   */
  @Input()
  public validateOnChange: boolean = false;


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


  @Output()
  query: BehaviorSubject<string> = new BehaviorSubject('');

  // TODO: add input to hydrate initial selections

  @Input()
  public set initialSelection(selections: any[]) {
    this.selectedOptions = coerceArray(selections);
  };

  /*
   *subscription: Subscription;
   */


  ngAfterViewInit() {
    /*
     *console.log('ngAfterViewInit: ', this.autocompleteTrigger, this.trigger);
     */

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
  selectOption(event: MatAutocompleteSelectedEvent, input: any): void {
    console.log('option selected: ', event, input);

    // The selected option
    const selection = event.option.value;

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

    // Find the key of the option in the selectedOptions array
    const index = this.selectedOptions.indexOf(option);

    // If found
    if (index >= 0) {
      // Remove the option from the selectedOptions array
      this.selectedOptions.splice(index, 1);
    }

    // Update the form control
    if (this.resultsControl && this.resultsControl.setValue) {
      this.resultsControl.setValue(this.selectedOptions);
    }

    // Let consumers know about the changes
    this.optionRemoved.emit(option);
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
    return (this.displayWith) ? this.displayWith(option) : option;
  }
}
