import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';

import {
  TsRadioChange,
  TsRadioOption,
} from '@terminus/ui';


const DEMO_ITEMS: TsRadioOption[] = [
  {
    value: 'foo_value',
    displayValue: 'Foo Display',
  },
  {
    value: 'bar_value',
    displayValue: 'Bar Display',
    disabled: true,
  },
  {
    value: 'baz_value',
    displayValue: 'Baz Display',
    required: true,
    checked: true,
  },
];
const DEMO_ITEMS2: TsRadioOption[] = [
  {
    value: 'foo2_value',
    displayValue: 'Foo2 Display',
  },
  {
    value: 'bar2_value',
    displayValue: 'Bar2 Display',
    disabled: true,
  },
  {
    value: 'baz2_value',
    displayValue: 'Baz2 Display',
    required: true,
  },
];


@Component({
  selector: 'demo-radio',
  templateUrl: './radio.component.html',
})
export class RadioComponent {

  items$: Observable<TsRadioOption[]> = of(DEMO_ITEMS);
  items2$: Observable<TsRadioOption[]> = of(DEMO_ITEMS2);
  myForm: FormGroup = this.formBuilder.group({
    myRadioGroup: [
      'bar2_value',
      [
        Validators.required,
      ],
    ],
  });


  constructor(
    private formBuilder: FormBuilder,
  ) {}


  selected(e: TsRadioChange): void {
    console.log('DEMO: radio changed: ', e);
  }

  log(v: any): void {
    console.log('DEMO: form submission: ', v);
  }

}
