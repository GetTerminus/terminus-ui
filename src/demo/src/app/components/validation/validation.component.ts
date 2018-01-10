import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
} from '@angular/forms';

import { TsValidatorsService } from '@terminus/ui';


@Component({
  selector: 'demo-validation',
  styleUrls: ['./validation.component.scss'],
  templateUrl: './validation.component.html',
})
export class ValidationComponent {
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
  });

  constructor(
    private formBuilder: FormBuilder,
    private validatorsService: TsValidatorsService,
  ) {}


  submit(v: any) {
    console.log('DEMO: form value: ', v)
  }

}
