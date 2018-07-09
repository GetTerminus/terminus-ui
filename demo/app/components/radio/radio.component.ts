import {
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  Observable,
  of,
} from 'rxjs';

import {
  TsRadioChange,
  TsRadioOption,
  TsRadioFormatFn,
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
    disabled: false,
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
    disabled: false,
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
  // tslint:disable: max-line-length
  items2$: Observable<TsRadioOption[]> = of([
    {
      foo: 'foo2_value',
      bar: 'Foo2 Display',
      template: `<strong>Custom</strong> template!`,
      /*
       *template: `<img src="https://d3vv6lp55qjaqc.cloudfront.net/items/20322G0V3H2j3n2M2o3l/nice%20laptop%3Ascreen%20elevation.png"> <a href="http://google.com">Links are cool</a>`,
       */
    },
    {
      foo: 'bar2_value',
      bar: 'Bar2 Display',
      bing: 'Some helper text for my item',
      disabled: false,
    },
    {
      foo: 'baz2_value',
      bar: 'Baz2 Display',
      bing: 'Some helper text. Some helper text for my item. Some helper text.',
    },
  ]);
  // tslint:enable: max-line-length
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


  uiFormatter: TsRadioFormatFn = (v) => v.bar;
  uiSubFormatter: TsRadioFormatFn = (v) => v.bing;
  modelFormatter: TsRadioFormatFn = (v) => v.foo;



  constructor(
    private formBuilder: FormBuilder,
  ) {
    // Test late seeded values
    /*
     *setTimeout(() => {
     *  const ctrl = this.myForm.get('myRadioGroup2');
     *  if (ctrl) {
     *    ctrl.setValue('baz2_value');
     *  }
     *}, 3000);
     */
  }


  selected(e: TsRadioChange): void {
    console.log('DEMO: radio changed: ', e);
  }

  log(v: any): void {
    console.log('DEMO: form submission: ', v);
  }

}
