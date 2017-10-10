import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  OnInit,
} from '@angular/core';
import {
  FormGroup,
  AbstractControl,
  FormBuilder,
  Validators,
} from '@angular/forms';

import {
  TsButtonActionTypes,
  TsButtonFunctionTypes,
  TsStyleThemeTypes,
} from './../utilities/types';
import { TsLoginFormResponse } from '../utilities/interfaces';


/**
 * A presentational component to render a search form
 *
 * #### QA CSS CLASSES
 * - `qa-search`: Placed on the form element which contains this component
 * - `qa-search-input`: Placed on the {@link TsInputComponent} used for the search text input
 * - `qa-search-button`: Placed on the {@link TsButtonComponent} used for the submit button
 *
 * @example
 * <t-search
 *              userCanClear="false"
 *              inputLabel="Search for a tactic"
 * ></t-search>
 *
 * TODO: add example url
 */
@Component({
  selector: 'ts-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class TsSearchComponent implements OnInit {
  /**
   * Initialize the form
   */
  public searchForm: FormGroup = this.formBuilder.group({
    query: [
      null,
      [
        Validators.required,
      ],
    ],
  });

  /**
   * Define the button action label
   */
  public buttonAction: TsButtonActionTypes = 'Submit';

  /**
   * Define the button type
   */
  public buttonType: TsButtonFunctionTypes = 'search';

  /**
   * Define the icon name
   */
  public icon: string = 'search';

  /**
   * Store the search query
   */
  public query: string = '';

  /**
   * Define an initial value for the search input
   */
  @Input()
  public initialValue: string;

  /**
   * Define the hint text below the input
   */
  @Input()
  public inputHint: string = 'Enter at least two letters.';

  /**
   * Define the primary label for the input
   */
  @Input()
  public inputLabel: string = 'Search';

  /**
   * Define if the search is currently submitting a query
   */
  @Input()
  public isSubmitting: boolean = false;

  /**
   * Define the theme
   */
  @Input()
  public theme: TsStyleThemeTypes = 'primary';

  /**
   * Define if the user can clear the search input
   */
  @Input()
  public userCanClear: boolean = true;

  /**
   * The event to emit when the form is submitted
   */
  @Output()
  submitted: EventEmitter<any> = new EventEmitter();


  /**
   * @private
   */
  constructor(
    private formBuilder: FormBuilder,
  ) {}


  /**
   * Seed the value if needed on initialization
   */
  public ngOnInit(): void {
    // istanbul ignore else
    if (this.initialValue) {
      this.searchForm.patchValue({
        query: this.initialValue,
      });
    }
  }

}
