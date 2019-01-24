import {
  Component,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { TsValidatorsService } from '@terminus/ui/validators';
import { TS_SPACING } from '@terminus/ui/spacing';


@Component({
  selector: 'demo-validation',
  styleUrls: ['./validation.component.scss'],
  templateUrl: './validation.component.html',
})
export class ValidationComponent implements OnInit {
  // tslint:disable: member-ordering
  flexGap: string = TS_SPACING.default[0];
  minDate: string = new Date(2018, 0, 5).toISOString();
  maxDate: string = new Date(2018, 0, 25).toISOString();
  myCollectionFn = (a) => a.name;
  myCollection = ['foo', 'bar', 'baz', 'bing', 'bang', 'boom'];
  myDeepCollection = [
    {
      name: 'foo',
      id: 1,
    },
    {
      name: 'bar',
      id: 2,
    },
    {
      name: 'baz',
      id: 3,
    },
    {
      name: 'bing',
      id: 4,
    },
  ];
  myForm: FormGroup = this.formBuilder.group({
    email: [
      null,
      [this.validatorsService.email()],
    ],
    password: [
      null,
      [this.validatorsService.password()],
    ],
    creditCard: [
      null,
      [this.validatorsService.creditCard()],
    ],
    date: [
      new Date(2018, 0, 10),
      [
        this.validatorsService.minDate(this.minDate),
        this.validatorsService.maxDate(this.maxDate),
      ],
    ],
    greaterThan: [
      null,
      [this.validatorsService.greaterThan(10)],
    ],
    isInRange: [
      null,
      [
        this.validatorsService.isInRange(10, 100),
      ],
    ],
    lessThan: [
      null,
      [this.validatorsService.lessThan(10)],
    ],
    url: [
      null,
      [this.validatorsService.url()],
    ],
    compare1: [
      null,
    ],
    compare2: [
      null,
    ],
    lowercase: [
      null,
      [this.validatorsService.lowercase(4)],
    ],
    uppercase: [
      null,
      [this.validatorsService.uppercase(4)],
    ],
    numbers: [
      null,
      [this.validatorsService.numbers(4)],
    ],
    greaterThanSource: [
      null,
    ],
    greaterThanInUse: [
      null,
    ],
    inCollection: [
      null,
      [this.validatorsService.inCollection(this.myCollection)],
    ],
    inCollectionDeep: [
      null,
      [this.validatorsService.inCollection(this.myDeepCollection, this.myCollectionFn)],
    ],
  });

  constructor(
    private formBuilder: FormBuilder,
    private validatorsService: TsValidatorsService,
  ) {}


  ngOnInit() {
    const control1: AbstractControl | null = this.myForm.get('compare1');
    const control2: AbstractControl | null = this.myForm.get('compare2');
    const greaterThanSource: AbstractControl | null = this.myForm.get('greaterThanSource');
    const greaterThanInUse: AbstractControl | null = this.myForm.get('greaterThanInUse');


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

    if (greaterThanInUse && greaterThanSource) {
      greaterThanInUse.setValidators([
        this.validatorsService.greaterThan(greaterThanSource),
      ]);
    }
  }


  log(v: any) {
    console.log('DEMO: form value: ', v);
  }

}


function isControl(x: any): x is AbstractControl {
  return x.pristine !== undefined;
}
