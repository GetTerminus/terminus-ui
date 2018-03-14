import {
  Component,
  OnInit,
} from '@angular/core';
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
export class ValidationComponent implements OnInit {
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
    greaterThanOrEqual: [
      null,
      [
        this.validatorsService.greaterThanOrEqual(10.5),
      ],
    ],
    greaterThan: [
      null,
      [
        this.validatorsService.greaterThan(10),
      ],
    ],
    lessThanOrEqual: [
      null,
      [
        this.validatorsService.lessThanOrEqual(10),
      ],
    ],
    lessThan: [
      null,
      [
        this.validatorsService.lessThan(10),
      ],
    ],
    url: [
      null,
      [
        this.validatorsService.url(),
      ],
    ],
    compare1: [
      null,
    ],
    compare2: [
      null,
    ],
  });

  constructor(
    private formBuilder: FormBuilder,
    private validatorsService: TsValidatorsService,
  ) {}


  ngOnInit() {
    this.myForm.get('compare1').setValidators([
      this.validatorsService.equalToControl(this.myForm.get('compare2')),
    ]);
    this.myForm.get('compare2').setValidators([
      this.validatorsService.equalToControl(this.myForm.get('compare1')),
    ]);
  }


  submit(v: any) {
    console.log('DEMO: form value: ', v)
  }

}
