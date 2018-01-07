import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';

import { TsValidatorsService } from '@terminus/ui';

@Component({
  selector: 'demo-datepicker',
  templateUrl: './datepicker.component.html',
})
export class DatepickerComponent {
  // SIMPLE EXAMPLE:
  formOneSettings = {
    isDisabled: false,
    startView: 'month',
    minDate: new Date(2017, 4, 2),
    myDate: new Date(2017, 4, 14),
    maxDate: new Date(2017, 4, 20),
  };

  formOne = this.formBuilder.group({
    date: [
      null,
      [
        Validators.required,
      ],
    ],
  });

  // RANGE EXAMPLE:
  formTwo = this.formBuilder.group({
    startDate: [
      null,
      [
        Validators.required,
      ],
    ],
    endDate: [
      null,
      [
        Validators.required,
      ],
    ],
  });

  defaultMax = '2017-10-03';

  get endDate(): string {
    const date = this.getControl('formTwo', 'endDate');
    return date ? date.value : this.defaultMax;
  }

  get startDate(): string {
    const date = this.getControl('formTwo', 'startDate');
    return date ? date.value : null;
  }


  constructor(
    private formBuilder: FormBuilder,
    private validatorsService: TsValidatorsService,
  ) {}

  /**
   * COMMON
   */

  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

  getControl(formName: string, name: string): AbstractControl | null {
    return this[formName] ? this[formName].get(name) : null;
  }

  submit(formName: string, v: any) {
    console.log('Demo submit!: ', formName, v);
  }


  /**
   * SIMPLE DEMO
   */

  dateSelected(e: any) {
    console.log('Date selected!: ', e);
  }

  /**
   * RANGE DEMO
   */

  rangeStartChange(e: any) {
    if (e) {
      console.log('rangeStartChange: ', e)
      const control = this.formTwo.get('endDate');

      control.setValidators([
        Validators.required,
        this.validatorsService.minDate(e.value),
      ]);
      control.updateValueAndValidity();
    }
  }


  rangeEndChange(e: any) {
    if (e) {
      const control = this.formTwo.get('startDate');

      control.setValidators([
        Validators.required,
        this.validatorsService.maxDate(this.endDate),
      ]);
      control.updateValueAndValidity();
    }
  }

}
