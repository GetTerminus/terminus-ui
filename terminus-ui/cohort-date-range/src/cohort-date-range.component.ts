import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import { coerceDateProperty } from '@terminus/ngx-tools/coercion';
import { untilComponentDestroyed } from '@terminus/ngx-tools/utilities';
import { TsOption } from '@terminus/ui/option';
import {
  TsSelectionListChange,
  TsSelectionListComponent,
} from '@terminus/ui/selection-list';


/**
 * Represents the range for a {@link TsDateCohort}
 */
export interface TsDateCohortRange {
  start: string | Date;
  end: string | Date;
}

/**
 * Represents the date cohort object that passed in
 */
export interface TsDateCohort extends TsOption {
  active?: boolean;
  display: string;
  range: TsDateCohortRange;
}

/**
 * Cohort date range change event interface
 */
export interface TsCohortDateChangeEvent {
  start: string | Date;
  end: string | Date;
}

/**
 * Event object emitted by {@link TsCohortDateRangeComponent} when there is date range change
 */
export class TsCohortDateRangeChanged {
  constructor(
    public start: string | Date,
    public end: string | Date,
    public source: TsCohortDateRangeComponent,
  ) { }
}

// Unique ID for each instance
let nextUniqueId = 0;

/**
 * This is the cohort-date-range UI Component
 *
 *
 * @example
 * <ts-cohort-date-range
 *              [allowCustomDates]="true"
 *              [cohorts]="myCohorts"
 *              id="myID"
 *              (cohortDateRangeChange)="myFunc($event)"
 * ></ts-cohort-date-range>
 *
 * <example-url>https://getterminus.github.io/ui-demos-release/components/cohort-date-range</example-url>
 */
@Component({
  selector: 'ts-cohort-date-range',
  templateUrl: './cohort-date-range.component.html',
  styleUrls: ['./cohort-date-range.component.scss'],
  host: {
    'class': 'ts-cohort-date-range',
    '[class.ts-cohort-date-range--disabled]': 'isDisabled',
    '[attr.disabled]': 'isDisabled',
    '[attr.aria-disabled]': 'isDisabled',
    '[id]': 'id',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'tsCohortDateRange',
})
export class TsCohortDateRangeComponent implements OnInit, OnDestroy {
  /**
   * Define the custom date cohort
   *
   * @internal
   */
  public customDateCohort: TsDateCohort = {
    display: 'Custom dates',
    range: {
      start: null,
      end: null,
    },
  };

  /**
   * Initialize the date range with empty start and end date
   *
   * @internal
   */
  public formGroup = this.formBuilder.group({
    dateRange: this.formBuilder.group({
      startDate: [null],
      endDate: [null],
    }),
    cohort: new FormControl([]),
  });

  /**
   * Define the default component ID
   */
  public readonly uid = `ts-cohort-date-range-${nextUniqueId++}`;

  /**
   * Get reference to the date range form group
   *
   * @internal
   */
  public get dateRangeFormGroup(): AbstractControl {
    return this.formGroup.get('dateRange') as AbstractControl;
  }

  /**
   * Get a reference to the cohort form control
   *
   * @internal
   */
  public get cohortControl(): FormControl {
    return this.formGroup.get('cohort') as FormControl;
  }

  /**
   * Define a reference to the {@link TsSelectionListComponent}
   *
   * @internal
   */
  @ViewChild(TsSelectionListComponent, { static: true })
  public selectionListComponent: TsSelectionListComponent;

  /**
   * Define whether custom dates are allowed
   */
  @Input()
  public set allowCustomDates(value: boolean) {
    this._allowCustomDates = value;

    // If this flag is being toggled, set the original cohorts again which will add or remove the custom cohort option as needed.
    this.cohorts = this.originalCohorts;
  }
  public get allowCustomDates(): boolean {
    return this._allowCustomDates;
  }
  private _allowCustomDates = true;

  /**
   * Define the array of date cohorts
   */
  @Input()
  public set cohorts(value: ReadonlyArray<TsDateCohort>) {
    if (!value) {
      return;
    }
    this.originalCohorts = value;
    this._cohorts = value.slice();
    if (this.allowCustomDates) {
      this._cohorts.push(this.customDateCohort);
    }
    const activeCohort = value.filter(c => c.active);
    if (activeCohort.length) {
      this.cohortControl.setValue(activeCohort);
      this.setDateRangeValues(activeCohort[0].range);
    }
  }
  public get cohorts(): ReadonlyArray<TsDateCohort> {
    return this._cohorts;
  }
  private _cohorts: TsDateCohort[];
  private originalCohorts: ReadonlyArray<TsDateCohort>;

  /**
   * Define an ID for the component
   */
  @Input()
  public set id(value: string) {
    this._id = value || this.uid;
  }
  public get id(): string {
    return this._id;
  }
  protected _id: string = this.uid;

  /**
   * Disable the component
   */
  @Input()
  public isDisabled = false;

  /**
   * Cohort change event emitter
   */
  @Output()
  public readonly cohortDateRangeChanged = new EventEmitter<TsCohortDateRangeChanged>();


  constructor(
    public formBuilder: FormBuilder,
  ) { }

  public ngOnInit(): void {
    this.updateSelectOnRangeChange();
  }

  /**
   * Needed for untilComponentDestroyed
   */
  public ngOnDestroy(): void {}

  /**
   * Emit the change event
   *
   * @internal
   * @param event - triggered by date range change
   */
  public cohortDateRangeChange(event: TsCohortDateChangeEvent): void {
    this.cohortDateRangeChanged.emit(new TsCohortDateRangeChanged(event.start, event.end, this));
  }

  /**
   * Called when selection changed
   *
   * @internal
   * @param event - TsSelectChangeEvent
   */
  public selectionChange(event: TsSelectionListChange<TsDateCohort>): void {
    this.setDateRangeValues(event.value[0].range);
  }

  /**
   * Function for tracking for-loops changes
   *
   * @internal
   * @param index - The item index
   * @return The index
   */
  public trackByFn(index): number {
    return index;
  }

  /**
   * The display formatter for {@link TsSelectionListComponent}
   *
   * @param cohort - The cohort
   * @return The display value for the cohort
   */
  public formatter(cohort: TsDateCohort): string {
    return cohort.display;
  }

  /**
   * Update the date range form values
   *
   * @param range - The new range
   */
  private setDateRangeValues(range: TsDateCohortRange): void {
    const newValues = {
      startDate: range.start,
      endDate: range.end,
    };

    // istanbul ignore else
    if (newValues.startDate && newValues.endDate) {
      this.dateRangeFormGroup.setValue(newValues);
      this.cohortDateRangeChange(range);
    }
  }

  /**
   * Update the select when the date is manually changed to not match a cohort
   */
  private updateSelectOnRangeChange(): void {
    this.formGroup.get('dateRange').valueChanges.pipe(untilComponentDestroyed(this)).subscribe(results => {
      if (!this.cohorts || !this.cohorts.length) {
        return;
      }
      const resultsStartTime = coerceDateProperty(results.startDate).getTime();
      const resultsEndTime = coerceDateProperty(results.endDate).getTime();

      const matchedCohorts = this.cohorts.filter(cohort => {
        const cohortStartTime = coerceDateProperty(cohort.range.start).getTime();
        const cohortEndTime = coerceDateProperty(cohort.range.end).getTime();
        const cohortStartMatches = resultsStartTime === cohortStartTime;
        const cohortEndMatches = resultsEndTime === cohortEndTime;

        // istanbul ignore else
        if (cohortStartMatches && cohortEndMatches) {
          return cohort;
        }
      });

      // NOTE: Since we are adding the custom cohort after the user cohorts, we know that the custom cohort will always be last.
      // istanbul ignore else
      if (matchedCohorts.length === 0) {
        this.cohortControl.setValue([this.customDateCohort]);
      }
    });
  }

}
