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
} from '@angular/forms';
import { untilComponentDestroyed } from '@terminus/ngx-tools';
import { coerceDateProperty } from '@terminus/ngx-tools/coercion';
import { TsOption } from '@terminus/ui/option';
import {
  TsSelectChange,
  TsSelectComponent,
} from '@terminus/ui/select';


/**
 * Represents date cohort object that passed in
 */
export interface TsDateCohort extends TsOption {
  display: string;
  range: {
    start: string | Date;
    end: string | Date;
  };
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
  });

  /**
   * Define the default component ID
   */
  public readonly uid = `ts-cohort-date-range-${nextUniqueId++}`;

  /**
   * Get reference of dateRange from formGroup
   *
   * @internal
   */
  public get dateRangeFormGroup(): AbstractControl {
    return this.formGroup.get('dateRange') as AbstractControl;
  }

  /**
   * Define a reference to the {@link TsSelectComponent}
   *
   * @internal
   */
  @ViewChild(TsSelectComponent, { static: true })
  public selectComponent: TsSelectComponent;

  /**
   * Define whether custom date is allowed
   */
  @Input()
  public allowCustomDates = true;

  /**
   * Date cohorts
   */
  @Input()
  public cohorts!: ReadonlyArray<TsDateCohort>;

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
  public selectionChange(event: TsSelectChange<TsCohortDateChangeEvent>): void {
    const dateRange = this.formGroup.get('dateRange');
    const newValues = {
      startDate: event.value.start,
      endDate: event.value.end,
    };

    // istanbul ignore else
    if (newValues.startDate && newValues.endDate) {
      dateRange.setValue(newValues);
      this.cohortDateRangeChange(event.value);
    }
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
   * Update the select when the date is manually changed to not match a cohort
   */
  private updateSelectOnRangeChange(): void {
    this.formGroup.get('dateRange').valueChanges.pipe(untilComponentDestroyed(this)).subscribe(results => {
      if (!this.cohorts) {
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
        const options = this.selectComponent.options.toArray();
        const option = options[options.length - 1];
        option.select();
      }
    });
  }
}
