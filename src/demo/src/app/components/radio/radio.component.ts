import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { of } from 'rxjs/observable/of';

import { TsRadioChange } from '@terminus/ui';


const DEMO_ITEMS = [
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
const DEMO_ITEMS2 = [
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
  items$ = of(DEMO_ITEMS);
  items2$ = of(DEMO_ITEMS2);
  myForm = this.formBuilder.group({
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


  selected(e: TsRadioChange) {
    console.log('Demo radio changed: ', e);
  }

  submit(v: any) {
    console.log('DEMO: form submission: ', v);
  }

}
