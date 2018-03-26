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
    foo: 'foo_value',
    bar: 'Foo Display',
    bing: 'Some helper text for my item',
  },
  {
    foo: 'bar_value',
    bar: 'Bar Display',
    bing: 'Some helper text for my item',
    disabled: true,
  },
  {
    foo: 'baz_value',
    bar: 'Baz Display',
    bing: 'Some helper text for my item',
  },
];
const DEMO_ITEMS2: TsRadioOption[] = [
  {
    foo: 'foo2_value',
    bar: 'Foo2 Display',
  },
  {
    foo: 'bar2_value',
    bar: 'Bar2 Display',
    disabled: true,
  },
  {
    foo: 'baz2_value',
    bar: 'Baz2 Display',
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
      null,
      [
        Validators.required,
      ],
    ],
    myRadioGroup2: [
      'bar2_value',
      [
        Validators.required,
      ],
    ],
  });
  uiFormatter = (v) => v.bar;
  uiSubFormatter = (v) => v.bing;
  modelFormatter = (v) => v.foo;


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
