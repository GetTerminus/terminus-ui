import {
  Component,
  OnInit,
} from '@angular/core';
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
export class DatepickerComponent implements OnInit {
  // SIMPLE EXAMPLE:
  formOneSettings = {
    isDisabled: false,
    startView: 'month',
    minDate: new Date(2018, 0, 2),
    myDate: new Date(2018, 0, 14),
    maxDate: new Date(2018, 0, 25),
  };

  formOne = this.formBuilder.group({
    date: [
      this.formOneSettings.myDate,
      [
        this.validatorsService.minDate(new Date(2018, 0, 2).toISOString()),
        this.validatorsService.maxDate(new Date(2018, 0, 25).toISOString()),
        Validators.required,
      ],
    ],
  });

  // RANGE EXAMPLE:
  formTwo = this.formBuilder.group({
    startDate: [
      null,
      [
        this.validatorsService.email(),
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

  ngOnInit() {
    this.formOne.valueChanges.subscribe(data => console.log('DEMO: Subscribed formOne changes', data));
  }

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
