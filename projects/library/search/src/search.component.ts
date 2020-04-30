import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { debounce } from '@terminus/ngx-tools/utilities';
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

const INPUT_DEBOUNCE_DEFAULT_MS = 200;
const INPUT_MINIMUM_LENGTH = 2;


/**
 * A presentational component to render a search form
 *
 * @example
 * <ts-search
 *              [autoSubmit]="true"
 *              initialValue="My starting value"
 *              inputHint="Enter at least 17 characters"
 *              inputLabel="Search for a tactic"
 *              [isDisabled]="false"
 *              [isFocused]="false"
 *              [isSubmitting]="false"
 *              theme="primary"
 *              [userCanClear]="true"
 *              (changed)="doSomething($event)"
 *              (cleared)="doSomething()"
 *              (submitted)="doSomething($event)"
 * ></ts-search>
 *
 * <example-url>https://getterminus.github.io/ui-demos-release/components/search</example-url>
 */
@Component({
  selector: 'ts-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  host: { class: 'ts-search' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'tsSearch',
})
export class TsSearchComponent implements OnInit {
  /**
   * Define the button action label
   */
  public buttonAction: TsButtonActionTypes = 'Submit';

  /**
   * Define the button type
   */
  public buttonType: TsButtonFunctionTypes = 'search';

  /**
   * Get a reference to the search form control
   */
  public get searchFormControl(): AbstractControl | null {
    return this.searchForm.get('query');
  }

  /**
   * Define a helper to return the current query string. If current form value length below minimum length, set the query to empty string
   */
  public get currentQuery(): string {
    return this.searchForm.value.query
    && this.searchForm.value.query.length >= this.queryMinLength ? this.searchForm.value.query.trim() : '';
  }

  /**
   * Define a debounced method to emit the submission event
   */
  public debouncedEmit = debounce<TsSearchComponent>(this.emitSubmit, INPUT_DEBOUNCE_DEFAULT_MS);

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
  public queryMinLength = INPUT_MINIMUM_LENGTH;

  /**
   * Initialize the form
   */
  public searchForm: FormGroup = this.formBuilder.group({
    query: [
      null,
      [
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
  public autoSubmit = false;

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
  public isDisabled = false;

  /**
   * Define if the search input should be focused initially
   */
  @Input()
  public isFocused = false;

  /**
   * Define if the search is currently submitting a query
   */
  @Input()
  public isSubmitting = false;

  /**
   * Define whether formControl needs a validation or a hint
   */
  @Input()
  public noValidationOrHint = false;

  /**
   * Define the theme
   */
  @Input()
  public theme: TsStyleThemeTypes = 'primary';

  /**
   * Define if the user can clear the search input
   */
  @Input()
  public userCanClear = true;

  /**
   * The event to emit when the internal input value is changed
   */
  @Output()
  public readonly changed = new EventEmitter<string>();

  /**
   * The event to emit when the internal input value is cleared
   */
  @Output()
  public readonly cleared = new EventEmitter<boolean>();

  /**
   * The event to emit when the form is submitted
   */
  @Output()
  public readonly submitted = new EventEmitter<TsSearchResponse>();


  constructor(
    private formBuilder: FormBuilder,
  ) {}


  /**
   * Seed the value if needed on initialization
   */
  public ngOnInit(): void {
    // istanbul ignore else
    if (this.initialValue) {
      this.searchForm.patchValue({ query: this.initialValue });
    }
  }

  /**
   * Fire events as needed after keyup events
   */
  public keyup(): void {
    this.changed.emit(this.currentQuery);

    // NOTE: We need to check for a valid query here.
    if (this.autoSubmit && this.searchForm.valid) {
      this.debouncedEmit(this);
    }
  }

  /**
   * Emit the submitted event
   *
   * NOTE: This wrapper is needed so that we can pass the query value to the emitter
   */
  private emitSubmit(): void {
    this.submitted.emit({ query: this.currentQuery });
  }
}
