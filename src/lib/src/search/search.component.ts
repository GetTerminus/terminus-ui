import {
  Component,
  Input,
  ViewChild,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ButtonActionTypes } from './../types/button-action.types';
import { ButtonFunctionTypes } from './../types/button-function.types';


/**
 * A presentational component to render a search form
 *
 * @example
 * <t-search
 *   userCanClear="false"
 *   inputLabel="Search for a tactic"
 * ></t-search>
 * <t-search inputLabel="Search for a tactic"></t-search>
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
  public buttonAction: ButtonActionTypes = 'Submit';

  /**
   * Define the button type
   */
  public buttonType: ButtonFunctionTypes = 'search';

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
  @Input() inputLabel: string = 'Search';

  /**
   * Define if the user can clear the search input
   */
  @Input() userCanClear: boolean = true;

  /**
   * Define if the search is currently loading results
   */
  @Input() loading: boolean = false;

  /**
   * Define an initial value for the search input
   */
  @Input() initialValue: string;

  /**
   * Define the button style
   */
  @Input() buttonStyle: string = 'primary';

  /**
   * Define the hint text below the input
   */
  @Input() inputHint: string = 'Enter at least two letters.';


  /**
   * Seed the value if needed on initialization
   */
  ngOnInit() {
    if (this.initialValue) {
      this.query = this.initialValue;
    }
  }


  /**
   * Submit a search query
   * TODO: Add a type to the accepted param (need to figure out the type being passed by the form)
   *
   * @param {Object} formValue Value of the search input
   */
  submitSearch(formValue: any): void {
    this.loading = true;

    // NOTE: FOR EXAMPLE ONLY
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

}
