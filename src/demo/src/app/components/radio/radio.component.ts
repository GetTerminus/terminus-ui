import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { of } from 'rxjs/observable/of';


const DEMO_ITEMS = [
  {
    value: 'foo',
    displayValue: 'Foo',
  },
  {
    value: 'bar',
    displayValue: 'Bar',
    disabled: true,
  },
  {
    value: 'baz',
    displayValue: 'Baz',
    required: true,
    checked: true,
  },
];
const DEMO_ITEMS2 = [
  {
    value: 'foo2',
    displayValue: 'Foo2',
  },
  {
    value: 'bar2',
    displayValue: 'Bar2',
    disabled: true,
  },
  {
    value: 'baz2',
    displayValue: 'Baz2',
    required: true,
    checked: true,
  },
];


@Component({
  selector: 'demo-radio',
  templateUrl: './radio.component.html',
})
export class RadioComponent {
  selectedItem: any;
  items = of(DEMO_ITEMS);
  items2 = of(DEMO_ITEMS2);
  myForm = this.formBuilder.group({
    myRadioGroup: [
      null,
      [
        Validators.required,
      ],
    ],
  });


  constructor(
    private formBuilder: FormBuilder,
  ) {}


  selected(e: any) {
    console.log('Demo radio changed: ', e);
    this.selectedItem = e.value;
  }

  submit(v: any) {
    console.log('DEMO: form submission: ', v);
  }

}
