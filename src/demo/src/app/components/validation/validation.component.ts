import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
} from '@angular/forms';

import {
  TsValidatorsService,
  TS_SPACING,
} from '@terminus/ui';


@Component({
  selector: 'demo-validation',
  styleUrls: ['./validation.component.scss'],
  templateUrl: './validation.component.html',
})
export class ValidationComponent {
  flexGap = TS_SPACING.default[0];
  minDate = new Date(2018, 0, 5).toISOString();
  maxDate = new Date(2018, 0, 25).toISOString();
  myForm = this.formBuilder.group({
    email: [
      null,
      [
        this.validatorsService.email(),
      ],
    ],
    password: [
      null,
      [
        this.validatorsService.password(),
      ],
    ],
    creditCard: [
      null,
      [
        this.validatorsService.creditCard(),
      ],
    ],
    date: [
      new Date(2018, 0, 10),
      [
        this.validatorsService.minDate(this.minDate),
        this.validatorsService.maxDate(this.maxDate),
      ],
    ],
    greaterThanNumber: [
      null,
      [
        this.validatorsService.greaterThan(10),
      ],
    ],
    lessThanNumber: [
      null,
      [
        this.validatorsService.lessThan(10),
      ],
    ],
  });

  constructor(
    private formBuilder: FormBuilder,
    private validatorsService: TsValidatorsService,
  ) {}


  submit(v: any) {
    console.log('DEMO: form value: ', v)
  }

}
