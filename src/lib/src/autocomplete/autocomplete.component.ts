import {
  Component,
  Input,
  Output,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewEncapsulation,
  OnInit,
  OnChanges,
  SimpleChanges,
  forwardRef,
  EventEmitter,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatAutocompleteSelectedEvent,
  MatChipInputEvent,
  MatAutocompleteTrigger,
} from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { TsReactiveFormBaseComponent } from './../utilities/reactive-form-base.component';
import { TsStyleThemeTypes } from './../utilities/types/style-theme.types';


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
  host: {
    class: 'ts-autocomplete',
  },
  providers: [CUSTOM_AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TsAutocompleteComponent extends TsReactiveFormBaseComponent implements OnInit, OnChanges {

  /**
   * Define the form control
   */
  /*
   *@Input()
   */
  /*
   *public formControl: FormControl = new FormControl();
   */


  // Set up values to use with Chips
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;

  // Define filteredOptins Array and Chips Array
  filteredOptions: Observable<string[]>;
  chips: string[] = [];

  /**
   * A function to output the UI text from the selected item
   */
  @Input()
  public displayWith: Function;

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
  selectionChange: EventEmitter<any[]> = new EventEmitter();

  // TODO: add input to hydrate initial selections

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('CHANGES: ', changes)
  }


  addChip(event: MatAutocompleteSelectedEvent, input: any): void {
    console.log('chip added: ', event, input);
    // Define selection constant
    const selection = event.option.value;
    // Add chip for selected option
    this.chips.push(selection);
    // Remove selected option from available options and set filteredOptions
    this.options = this.options.filter((obj) => obj.name !== selection.name);
    // Reset the autocomplete input text value
    if (input) {
      input.value = '';
    }

    this.optionSelected.emit(event.option.value);
    this.selectionChange.emit(this.chips);
  }

  removeChip(chip: any): void {
    console.log('chip removed: ', chip);
    // Find key of object in array
    const index = this.chips.indexOf(chip);
    // If key exists
    if (index >= 0) {
      // Remove key from chips array
      this.chips.splice(index, 1);
      // Add key to options array
      this.options.push(chip);
    }

    this.optionRemoved.emit(chip);
    this.selectionChange.emit(this.chips);
  }
}
