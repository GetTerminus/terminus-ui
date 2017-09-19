import {
  Component,
  Input,
  ViewChild,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import {
  TsButtonActionTypes,
  TsButtonFunctionTypes,
  TsStyleThemeTypes,
} from './../utilities/types';


/**
 * A presentational component to render a search form
 *
 * -- QA CSS CLASSES
 *
 * qa-search : Placed on the form element which contains this component
 *
 * qa-search-input : Placed on the {@link TsInputComponent} used for the search text input
 *
 * qa-search-button : Placed on the {@link TsButtonComponent} used for the submit button
 *
 * @example
 * <t-search
 *              userCanClear="false"
 *              inputLabel="Search for a tactic"
 * ></t-search>
 */
@Component({
  selector: 'ts-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class TsSearchComponent implements OnInit {
  /**
   * Provide access to the form
   */
  @ViewChild('form') form: FormGroup;

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
   * Define the primary label for the input
   */
  @Input()
  public inputLabel: string = 'Search';

  /**
   * Define if the user can clear the search input
   */
  @Input()
  public userCanClear: boolean = true;

  /**
   * Define if the search is currently loading results
   */
  @Input()
  public loading: boolean = false;

  /**
   * Define an initial value for the search input
   */
  @Input()
  public initialValue: string;

  /**
   * Define the button style
   */
  @Input()
  public theme: TsStyleThemeTypes = 'primary';

  /**
   * Define the hint text below the input
   */
  @Input()
  public inputHint: string = 'Enter at least two letters.';


  /**
   * Seed the value if needed on initialization
   */
  public ngOnInit() {
    if (this.initialValue) {
      this.query = this.initialValue;
    }
  }


  /**
   * Submit a search query
   *
   * @param {Object} formValue Value of the search input
   */
  // FIXME: Add a type to the accepted param (need to figure out the type being passed by the form)
  public submitSearch(formValue: any): void {
    this.loading = true;

    /*
     * NOTE: FOR EXAMPLE ONLY
     */
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

}
