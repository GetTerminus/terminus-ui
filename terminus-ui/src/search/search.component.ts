import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { debounce } from '@terminus/ngx-tools';

import {
  TsButtonActionTypes,
  TsButtonFunctionTypes,
} from './../button/button.module';
import { TsStyleThemeTypes } from './../utilities/types/style-theme.types';


/**
 * Define the user object interface
 */
export interface TsSearchResponse {
  /**
   * The search query
   */
  query: string;
}


/**
 * A presentational component to render a search form
 *
 * #### QA CSS CLASSES
 * - `qa-search`: Placed on the form element which contains this component
 * - `qa-search-input`: Placed on the {@link TsInputComponent} used for the search text input
 * - `qa-search-button`: Placed on the {@link TsButtonComponent} used for the submit button
 *
 * @example
 * <ts-search
 *              autoSubmit="true
 *              initialValue="My starting value"
 *              inputLabel="Search for a tactic"
 *              inputHint="Enter at least 17 characters"
 *              isFocused="false"
 *              isSubmitting="false"
 *              theme="primary"
 *              userCanClear="true"
 *              (changed)="doSomething($event)"
 *              (submitted)="doSomething($event)"
 *              (cleared)="doSomething()"
 * ></ts-search>
 *
 * <example-url>https://goo.gl/ieUPaG</example-url>
 */
@Component({
  selector: 'ts-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  host: {
    class: 'ts-search',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TsSearchComponent implements OnInit {
  /**
   * Define the time to wait for user interaction to stop before auto-submitting
   */
  private INPUT_DEBOUNCE_TIME: number = 200;

  /**
   * Define the button action label
   */
  public buttonAction: TsButtonActionTypes = 'Submit';

  /**
   * Define the button type
   */
  public buttonType: TsButtonFunctionTypes = 'search';

  /**
   * Define a helper to return the current query string
   */
  public get currentQuery(): string {
    return this.searchForm.value.query ? this.searchForm.value.query.trim() : '';
  }

  /**
   * Define a debounced method to emit the submission event
   */
  public debouncedEmit = debounce<TsSearchComponent>(this.emitSubmit, this.INPUT_DEBOUNCE_TIME);

  /**
   * Define the icon name
   */
  public icon: string = 'search';

  /**
   * Define the regular expression to validate the query
   */
  public inputPatternRegex: string = '[a-zA-Z0-9_ ]*';

  /**
   * Define the minimum length of a valid query
   */
  public queryMinLength: number = 2;

  /**
   * Initialize the form
   */
  public searchForm: FormGroup = this.formBuilder.group({
    query: [
      null,
      [
        Validators.minLength(this.queryMinLength),
        Validators.pattern(this.inputPatternRegex),
      ],
    ],
  });

  /**
   * Store the search query
   */
  public query: string = '';

  /**
   * Define if the input should automatically submit values as typed
   */
  @Input()
  public autoSubmit: boolean = false;

  /**
   * Define an initial value for the search input
   */
  @Input()
  public initialValue: string | undefined;

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
   * Define if the search should be disabled
   */
  @Input()
  public isDisabled: boolean = false;

  /**
   * Define if the search input should be focused initially
   */
  @Input()
  public isFocused: boolean = false;

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
  public submitted: EventEmitter<TsSearchResponse> = new EventEmitter();

  /**
   * The event to emit when the internal input value is changed
   */
  @Output()
  public changed: EventEmitter<string> = new EventEmitter();

  /**
   * The event to emit when the internal input value is cleared
   */
  @Output()
  public cleared: EventEmitter<boolean> = new EventEmitter();

  /**
   * Inject services
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


  /**
   * Emit the submitted event
   *
   * NOTE: This wrapper is needed so that we can pass a value to the emitter
   */
  emitSubmit(): void {
    this.submitted.emit({query: this.currentQuery});
  }


  /**
   * Fire events as needed after keyup events
   */
  keyup(): void {
    this.changed.emit(this.currentQuery);

    // NOTE: We need to check for a valid query length here even though we are using a minLength
    // validator. When the length is 0 the minLength validator returns valid.
    if (this.autoSubmit && this.searchForm.valid && this.currentQuery.length > 0) {
      this.debouncedEmit(this);
    }
  }

}
