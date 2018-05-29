import {
  Component,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  AbstractControl,
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
  flexGap: string = TS_SPACING.default[0];
  minDate: string = new Date(2018, 0, 5).toISOString();
  maxDate: string = new Date(2018, 0, 25).toISOString();
  myForm: FormGroup = this.formBuilder.group({
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
    lowercase: [
      null,
      [
        this.validatorsService.lowercase(4),
      ],
    ],
    uppercase: [
      null,
      [
        this.validatorsService.uppercase(4),
      ],
    ],
    numbers: [
      null,
      [
        this.validatorsService.numbers(4),
      ],
    ],
    greaterThan1: [
      null,
    ],
    greaterThan2: [
      null,
    ],
    greaterThanOrEqual1: [
      null,
    ],
    greaterThanOrEqual2: [
      null,
    ],
    lessThan1: [
      null,
    ],
    lessThan2: [
      null,
    ],
    lessThanOrEqual1: [
      null,
    ],
    lessThanOrEqual2: [
      null,
    ],
  });

  constructor(
    private formBuilder: FormBuilder,
    private validatorsService: TsValidatorsService,
  ) {}


  ngOnInit() {
    const control1: AbstractControl | null = this.myForm.get('compare1');
    const control2: AbstractControl | null = this.myForm.get('compare2');
    const greaterThanControl1: AbstractControl | null = this.myForm.get('greaterThan1');
    const greaterThanControl2: AbstractControl | null = this.myForm.get('greaterThan2');
    const greaterThanOrEqual1: AbstractControl | null = this.myForm.get('greaterThanOrEqual1');
    const greaterThanOrEqual2: AbstractControl | null = this.myForm.get('greaterThanOrEqual2');
    const lessThanControl1: AbstractControl | null = this.myForm.get('lessThan1');
    const lessThanControl2: AbstractControl | null = this.myForm.get('lessThan2');
    const lessThanOrEqual1: AbstractControl | null = this.myForm.get('lessThanOrEqual1');
    const lessThanOrEqual2: AbstractControl | null = this.myForm.get('lessThanOrEqual2');


    if (control1) {
      control1.setValidators([
        this.validatorsService.equalToControl(control1),
      ]);
    }

    if (control2) {
      control2.setValidators([
        this.validatorsService.equalToControl(control2),
      ]);
    }

    if (greaterThanControl2) {
      greaterThanControl2.setValidators([
        this.validatorsService.greaterThan(greaterThanControl1),
      ]);
    }

    if (greaterThanOrEqual2) {
      greaterThanOrEqual2.setValidators([
        this.validatorsService.greaterThanOrEqual(greaterThanOrEqual1),
      ]);
    }

    if (lessThanControl2) {
      lessThanControl2.setValidators([
        this.validatorsService.lessThan(lessThanControl1),
      ]);
    }

    if (lessThanOrEqual2) {
      lessThanOrEqual2.setValidators([
        this.validatorsService.lessThanOrEqual(lessThanOrEqual1),
      ]);
    }
  }


  log(v: any) {
    console.log('DEMO: form value: ', v);
  }

}
