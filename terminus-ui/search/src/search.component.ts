import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  isDevMode,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  debounce,
  isBoolean,
} from '@terminus/ngx-tools';
import { coerceBooleanProperty } from '@terminus/ngx-tools/coercion';
import {
  TsButtonActionTypes,
  TsButtonFunctionTypes,
} from '@terminus/ui/button';
import { TsStyleThemeTypes } from '@terminus/ui/utilities';


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
 *              [autoSubmit]="true"
 *              initialValue="My starting value"
 *              inputLabel="Search for a tactic"
 *              inputHint="Enter at least 17 characters"
 *              [isFocused]="false"
 *              [isSubmitting]="false"
 *              theme="primary"
 *              [userCanClear]="true"
 *              (changed)="doSomething($event)"
 *              (submitted)="doSomething($event)"
 *              (cleared)="doSomething()"
 * ></ts-search>
 *
 * <example-url>https://getterminus.github.io/ui-demos-master/components/search</example-url>
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
  private INPUT_DEBOUNCE_TIME = 200;

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
  public icon = 'search';

  /**
   * Define the regular expression to validate the query
   */
  public inputPatternRegex = '[a-zA-Z0-9_ ]*';

  /**
   * Define the minimum length of a valid query
   */
  public queryMinLength = 2;

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
  public query = '';

  /**
   * Define if the input should automatically submit values as typed
   */
  @Input()
  public set autoSubmit(value: boolean) {
    /* istanbul ignore if */
    if (!isBoolean(value) && value && isDevMode()) {
      console.warn(`TsSearchComponent: "autoSubmit" value is not a boolean. ` +
      `String values of 'true' and 'false' will no longer be coerced to a true boolean with the next release.`);
    }
    this._autoSubmit = coerceBooleanProperty(value);
  }
  public get autoSubmit(): boolean {
    return this._autoSubmit;
  }
  private _autoSubmit = false;

  /**
   * Define an initial value for the search input
   */
  @Input()
  public initialValue: string | undefined;

  /**
   * Define the hint text below the input
   */
  @Input()
  public inputHint = 'Enter at least two letters.';

  /**
   * Define the primary label for the input
   */
  @Input()
  public inputLabel = 'Search';

  /**
   * Define if the search should be disabled
   */
  @Input()
  public set isDisabled(value: boolean) {
    /* istanbul ignore if */
    if (!isBoolean(value) && value && isDevMode()) {
      console.warn(`TsSearchComponent: "isDisabled" value is not a boolean. ` +
      `String values of 'true' and 'false' will no longer be coerced to a true boolean with the next release.`);
    }
    this._isDisabled = coerceBooleanProperty(value);
  }
  public get isDisabled(): boolean {
    return this._isDisabled;
  }
  private _isDisabled = false;

  /**
   * Define if the search input should be focused initially
   */
  @Input()
  public set isFocused(value: boolean) {
    /* istanbul ignore if */
    if (!isBoolean(value) && value && isDevMode()) {
      console.warn(`TsSearchComponent: "isFocused" value is not a boolean. ` +
      `String values of 'true' and 'false' will no longer be coerced to a true boolean with the next release.`);
    }
    this._isFocused = coerceBooleanProperty(value);
  }
  public get isFocused(): boolean {
    return this._isFocused;
  }
  private _isFocused = false;

  /**
   * Define if the search is currently submitting a query
   */
  @Input()
  public set isSubmitting(value: boolean) {
    /* istanbul ignore if */
    if (!isBoolean(value) && value && isDevMode()) {
      console.warn(`TsSearchComponent: "isSubmitting" value is not a boolean. ` +
      `String values of 'true' and 'false' will no longer be coerced to a true boolean with the next release.`);
    }
    this._isSubmitting = coerceBooleanProperty(value);
  }
  public get isSubmitting(): boolean {
    return this._isSubmitting;
  }
  private _isSubmitting = false;

  /**
   * Define the theme
   */
  @Input()
  public theme: TsStyleThemeTypes = 'primary';

  /**
   * Define if the user can clear the search input
   */
  @Input()
  public set userCanClear(value: boolean) {
    /* istanbul ignore if */
    if (!isBoolean(value) && value && isDevMode()) {
      console.warn(`TsSearchComponent: "userCanClear" value is not a boolean. ` +
      `String values of 'true' and 'false' will no longer be coerced to a true boolean with the next release.`);
    }
    this._userCanClear = coerceBooleanProperty(value);
  }
  public get userCanClear(): boolean {
    return this._userCanClear;
  }
  private _userCanClear = true;

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
   * Fire events as needed after keyup events
   */
  public keyup(): void {
    this.changed.emit(this.currentQuery);

    // NOTE: We need to check for a valid query length here even though we are using a minLength
    // validator. When the length is 0 the minLength validator returns valid.
    if (this.autoSubmit && this.searchForm.valid && this.currentQuery.length > 0) {
      this.debouncedEmit(this);
    }
  }


  /**
   * Emit the submitted event
   *
   * NOTE: This wrapper is needed so that we can pass the query value to the emitter
   */
  private emitSubmit(): void {
    this.submitted.emit({query: this.currentQuery});
  }

}
