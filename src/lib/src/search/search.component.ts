import {
  Component,
  Input,
  ViewChild,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { TsStyleThemeTypes } from './../types/style-theme.types';
import { ButtonActionTypes } from './../types/button-action.types';
import { ButtonFunctionTypes } from './../types/button-function.types';


/**
 * A presentational component to render a search form
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
   * FIXME: Add a type to the accepted param (need to figure out the type being passed by the form)
   *
   * @param {Object} formValue Value of the search input
   */
  public submitSearch(formValue: any): void {
    this.loading = true;

    // NOTE: FOR EXAMPLE ONLY
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

}
