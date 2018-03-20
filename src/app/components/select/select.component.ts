import { Component } from '@angular/core';
import {
  FormBuilder,
  Validators,
} from '@angular/forms';
import { TsSelectItem } from '@terminus/ui';


@Component({
  selector: 'demo-select',
  templateUrl: './select.component.html',
})
export class SelectComponent {
  simpleItems: number[] = [1, 2, 3, 4];
  initialSimpleItemsSelection = 2;
  items: TsSelectItem[] = [
    {
      name: 'Foo',
      slug: 'foo',
    },
    {
      name: 'Bar',
      slug: 'bar',
    },
    {
      name: 'Baz',
      slug: 'baz',
    },
  ];
  key = 'slug';
  label = 'Select a Thing';
  blank = 'none';
  multipleAllowed = true;
  initialSelection = {
    name: 'Bar',
    slug: 'bar',
  };
  myForm = this.formBuilder.group({
    myChoices1: [
      2,
      [Validators.required],
    ],
    myChoices2: [
      null,
      [Validators.required],
    ],
  });

  constructor(
    private formBuilder: FormBuilder,
  ) {}


  run() {
    console.log('Demo: in run');
  }

  openStateChange(e) {
    console.log('Demo: opened/closed: ', e);
  }

  isChanged(e) {
    console.log('Demo: changed: ', e);
  }

  submit(v: any) {
    console.log('Demo: Submit!: ', v);
  }

}
