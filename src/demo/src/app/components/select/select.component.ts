import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'demo-select',
  templateUrl: './select.component.html',
})
export class SelectComponent {
  items = [
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
  myForm = this.formBuilder.group({
    myChoices1: [
      null,
    ],
    myChoices2: [
      null,
    ],
  });

  constructor(
    private formBuilder: FormBuilder,
  ) {}


  run() {
    console.log('in run');
  }

  isOpened(e) {
    console.log('opened: ', e);
  }

  isClosed(e) {
    console.log('closed: ', e);
  }

  isChanged(e) {
    console.log('changed: ', e);
  }

  submit(v: any) {
    console.log('Submit!: ', v);
  }

  getControl(name: string): AbstractControl {
    return this.myForm.get(name);
  }
}
