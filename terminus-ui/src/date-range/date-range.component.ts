import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { coerceBooleanProperty } from '@terminus/ngx-tools/coercion';
import { untilComponentDestroyed } from '@terminus/ngx-tools';

import { TsStyleThemeTypes } from './../utilities/types/style-theme.types';


/**
 * Define the structure of the date range object used by {@link TsDateRangeComponent}
 *
 * TODO: In the process of deprecating the `null` portion of this interface. It should be using
 * `undefined` instead.
 *
 * Deprecation target: 10.0.0
 */
export interface TsDateRange {
  /**
   * The start date of the range
   */
  start: Date | undefined | null;

  /**
   * The end date of the range
   */
  end: Date | undefined | null;
}


/**
 * This is the date-range UI Component
 *
 * #### QA CSS CLASSES
 * - `qa-date-range`: The primary component container
 * - `qa-date-range-start-datepicker`: The start date {@link TsInputComponent}
 * - `qa-date-range-end-datepicker`: The end date {@link TsInputComponent}
 *
 * @example
 * <ts-date-range
 *              [dateFormGroup]="myForm.get('dateRange')"
 *              endMaxDate="{{ new Date(2017, 4, 30) }}"
 *              endMinDate="{{ new Date(2017, 4, 1) }}"
 *              isDisabled="true"
 *              startingView="year"
 *              startMaxDate="{{ new Date(2017, 4, 30) }}"
 *              startMinDate="{{ new Date(2017, 4, 1) }}"
 *              theme="primary"
 *              (change)="myMethod($event)"
 *              (endSelected)="myMethod($event)"
 *              (startSelected)="myMethod($event)"
 * ></ts-date-range>
 *
 * <example-url>https://goo.gl/ieUPaG</example-url>
 */
@Component({
  selector: 'ts-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss'],
  host: {
    class: 'ts-date-range',
  },
  encapsulation: ViewEncapsulation.None,
  exportAs: 'tsDateRange',
})
export class TsDateRangeComponent implements OnInit, OnDestroy {
  /**
   * Getter to return the date range as an object
   *
   * @return The current date range
   */
  private get dateRange(): TsDateRange {
    return {
      start: this.startDateControl.value,
      end: this.endDateControl.value,
    };
  }

  /**
   * Provide quick access to the endDate form control
   */
  public get endDateControl(): AbstractControl {
    const ctrl: AbstractControl | null = this.dateFormGroup ? this.dateFormGroup.get('endDate') : null;

    return ctrl ? ctrl : this.fallbackEndDateControl;
  }

  /**
   * Expose the minimum date for the endDate
   *
   * NOTE: `any` is used since we cannot seem to use union types in a BehaviorSubject
   */
  public endMinDate$: BehaviorSubject<any> = new BehaviorSubject(undefined);

  /**
   * Define the end date label
   */
  public endLabel = 'End date';

  /**
   * Define a fallback control in case one is not passed in
   */
  private fallbackEndDateControl: FormControl = new FormControl();

  /**
   * Define a fallback control in case one is not passed in
   */
  private fallbackStartDateControl: FormControl = new FormControl();

  /**
   * The internal FormControl to manage the end date
   */
  private internalEndControl = new FormControl(null, { updateOn: 'blur' });

  /**
   * The internal FormControl to manage the start date
   */
  private internalStartControl = new FormControl(null, { updateOn: 'blur' });

  /**
   * Define the separator between the two date inputs
   */
  public separator = '-';

  /**
   * Provide quick access to the startDate form control
   */
  public get startDateControl(): AbstractControl {
    const ctrl: AbstractControl | null = this.dateFormGroup ? this.dateFormGroup.get('startDate') : null;

    return ctrl ? ctrl : this.fallbackStartDateControl;
  }

  /**
   * Expose the maximum date for the startDate
   *
   * NOTE: `any` is used since we cannot seem to use union types in a BehaviorSubject
   */
  public startMaxDate$: BehaviorSubject<any> = new BehaviorSubject(undefined);

  /**
   * Define the start date label
   */
  public startLabel = 'Start date';

  /**
   * Define the form group to attach the date range to
   */
  @Input()
  public set dateFormGroup(value: FormGroup | AbstractControl | undefined) {
    this._dateFormGroup = value;
  }
  public get dateFormGroup(): FormGroup | AbstractControl | undefined {
    return this._dateFormGroup;
  }
  private _dateFormGroup: FormGroup | AbstractControl | undefined;

  /**
   * Define the max date for the end date
   */
  @Input()
  public endMaxDate: Date | undefined;

  /**
   * Define the min date for the end date
   */
  @Input()
  public endMinDate: Date | undefined;

  /**
   * Define if the range should be disabled
   */
  @Input()
  public set isDisabled(value: boolean) {
    this._isDisabled = coerceBooleanProperty(value);
  }
  public get isDisabled(): boolean {
    return this._isDisabled;
  }
  private _isDisabled = false;

  /**
   * Define the starting view for both datepickers
   */
  @Input()
  public startingView: 'month' | 'year' = 'month';

  /**
   * Define the max date for the starting date
   */
  @Input()
  public startMaxDate: Date | undefined;

  /**
   * Define the min date for the starting date
   */
  @Input()
  public startMinDate: Date | undefined;

  /**
   * Define the component theme
   */
  @Input()
  public theme: TsStyleThemeTypes = 'primary';

  /**
   * Event emitted anytime the range is changed
   */
  @Output()
  public change: EventEmitter<TsDateRange> = new EventEmitter();

  /**
   * Output the end date when selected
   */
  @Output()
  public endSelected: EventEmitter<Date | undefined> = new EventEmitter();

  /**
   * Output the start date when selected
   */
  @Output()
  public startSelected: EventEmitter<Date | undefined> = new EventEmitter();


  /**
   * Seed initial date range values
   */
  public ngOnInit(): void {
    // Seed values from a passed in form group
    if (this.dateFormGroup) {
      this.initializeMinAndMax(this.dateFormGroup);
    }

    this.setUpFormControlSync();
  }


  /**
   * Needed for untilComponentDestroyed
   */
  public ngOnDestroy(): void {}


  /**
   * Set up subscriptions to sync the internat FormControl to the external FormControl
   */
  private setUpFormControlSync(): void {
    if (!this.dateFormGroup) {
      return;
    }

    const startCtrl = this.dateFormGroup.get('startDate');
    const endCtrl = this.dateFormGroup.get('endDate');

    if (!startCtrl || !endCtrl) {
      return;
    }

    // START DATE
    startCtrl.valueChanges.pipe(untilComponentDestroyed(this)).subscribe((v) => {
      this.internalStartControl.setValue(v);
    });
    startCtrl.statusChanges.pipe(untilComponentDestroyed(this)).subscribe((v) => {
      this.internalStartControl.setErrors(startCtrl.errors);
    });

    // END DATE
    endCtrl.valueChanges.pipe(untilComponentDestroyed(this)).subscribe((v) => {
      this.internalEndControl.setValue(v);
    });
    endCtrl.statusChanges.pipe(untilComponentDestroyed(this)).subscribe((v) => {
      this.internalEndControl.setErrors(endCtrl.errors);
    });

  }


  /**
   * Set up initial min and max dates
   *
   * @param formGroup - The date form group
   */
  private initializeMinAndMax(formGroup: FormGroup | AbstractControl): void {
    if (!formGroup) {
      return;
    }
    const startControl: AbstractControl | null = formGroup.get('startDate');
    const endControl: AbstractControl | null = formGroup.get('endDate');
    const startValue: Date | undefined = startControl ? startControl.value /* istanbul ignore next - Unreachable */ : undefined;
    const endValue: Date | undefined = endControl ? endControl.value /* istanbul ignore next - Unreachable */ : undefined;

    // istanbul ignore else
    if (startValue || this.endMinDate) {
      this.endMinDate$.next(startValue || this.endMinDate);
    }

    // istanbul ignore else
    if (endValue || this.startMaxDate) {
      this.startMaxDate$.next(endValue || this.startMaxDate);
    }
  }


  /**
   * Emit the selected start date and date range
   *
   * @param datepickerEvent - The event received from the range start event
   * {@link TsDatepickerComponent}
   */
  public startDateSelected(date: Date): void {
    if (date) {
      this.endMinDate$.next(date);

      // Update the form value if a formGroup was passed in
      // istanbul ignore else
      if (this.dateFormGroup && this.startDateControl) {
        this.startDateControl.setValue(date);
      }

      this.startSelected.emit(date);
      this.change.emit(this.dateRange);
    } else {
      // If no startDate was selected, reset to the original endMinDate
      this.endMinDate$.next(this.endMinDate);
    }
  }


  /**
   * Emit the selected end date and date range
   *
   * @param datepickerEvent - The event received from the range end event
   * {@link TsDatepickerComponent}
   */
  public endDateSelected(date: Date): void {
    if (date) {
      this.startMaxDate$.next(date);

      // Update the form value if a formGroup was passed in
      // istanbul ignore else
      if (this.dateFormGroup && this.endDateControl) {
        this.endDateControl.setValue(date);
      }

      this.endSelected.emit(date);
      this.change.emit(this.dateRange);
    } else {
      // If no endDate was selected, reset to the original startMaxDate
      this.startMaxDate$.next(this.startMaxDate);
    }
  }


  /**
   * Update dates when the start date input receives a blur event
   *
   * @param date - The date entered
   */
  public startBlur(date: Date | undefined): void {
    const ctrl = this.dateFormGroup ? this.dateFormGroup.get('startDate') : null;
    const value = date ? date : null;

    // Update the max date for the end date control
    this.endMinDate$.next(value);

    // Update the 'real' control
    if (ctrl) {
      ctrl.setValue(value);
      ctrl.markAsTouched();
      ctrl.updateValueAndValidity();
    }
  }


  /**
   * Update dates when the end date input receives a blur event
   *
   * @param date - The date entered
   */
  public endBlur(date: Date | undefined): void {
    const ctrl = this.dateFormGroup ? this.dateFormGroup.get('endDate') : null;
    const value = date ? date : null;

    // Update the max date for the start date control
    this.startMaxDate$.next(value);

    // Update the 'real' control
    if (ctrl) {
      ctrl.setValue(value);
      ctrl.markAsTouched();
      ctrl.updateValueAndValidity();
    }
  }

}
