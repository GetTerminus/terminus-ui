import {
  Component,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  Validators,
} from '@angular/forms';

import {
  TsValidatorsService,
  TS_SPACING,
  TsDatepickerInputEvent,
} from '@terminus/ui';


const date1 = new Date();
if (date1.getDate() > 25) {
  date1.setDate(date1.getDate() + 6);
}
const date2 = new Date(date1);
date2.setDate(date2.getDate() + 5);
const date3 = new Date(date1);
date3.setDate(date3.getDate() - 3);


@Component({
  selector: 'demo-datepicker',
  templateUrl: './datepicker.component.html',
})
export class DatepickerComponent implements OnInit {
  // SIMPLE EXAMPLE:
  formOneSettings = {
    isDisabled: false,
    startView: 'month',
    minDate: date3,
    myDate: date1,
    maxDate: date2,
  };

  formOne = this.formBuilder.group({
    date: [
      this.formOneSettings.myDate,
      [
        this.validatorsService.minDate(date3.toISOString()),
        this.validatorsService.maxDate(date2.toISOString()),
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
  layoutGap = TS_SPACING.default[0];

  get endDate(): string {
    const date = this.formTwo.get('endDate');
    return date ? date.value : this.defaultMax;
  }

  get startDate(): string {
    const date = this.formTwo.get('startDate');
    return date ? date.value : null;
  }


  constructor(
    private formBuilder: FormBuilder,
    private validatorsService: TsValidatorsService,
  ) {}

  ngOnInit() {
    this.formOne.valueChanges.subscribe((data) => console.log('DEMO: Subscribed formOne changes', data));
  }

  /**
   * COMMON
   */

  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }


  submit(formName: string, v: any) {
    console.log('Demo submit!: ', formName, v);
  }


  /**
   * SIMPLE DEMO
   */
  dateSelected(e: TsDatepickerInputEvent<Date>) {
    console.log('Date selected!: ', e);
  }


  public inputBlur(v) {
    console.log('DEMO: inputBlur ', v);
  }

  /**
   * RANGE DEMO
   */
  rangeStartChange(e: TsDatepickerInputEvent<Date>) {
    const control = this.formTwo.get('endDate');

    if (control && e.value) {
      control.setValidators([
        Validators.required,
        this.validatorsService.minDate(e.value.toISOString()),
      ]);
      control.updateValueAndValidity();
    }
  }


  rangeEndChange(e: TsDatepickerInputEvent<Date>) {
    const control = this.formTwo.get('startDate');

    if (control) {
      control.setValidators([
        Validators.required,
        this.validatorsService.maxDate(this.endDate),
      ]);
      control.updateValueAndValidity();
    }
  }


  update() {
    const control = this.formTwo.get('endDate');

    if (control) {
      control.setValue(new Date(2018, 4, 1).toISOString());
      control.updateValueAndValidity();
    }
  }

}
