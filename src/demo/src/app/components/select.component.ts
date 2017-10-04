import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'demo-select',
  template: `
    <form [formGroup]="myForm" novalidate>
      <ts-select
        [items]="items"
        [label]="label"
        [blankChoice]="blank"
        [multipleAllowed]="multipleAllowed"
        [valueKey]="key"
        formControlName="myChoices"
        [formControl]="getControl('myChoices')"
        (open)="isOpened($event)"
        (close)="isClosed($event)"
        (change)="isChanged($event)"
      >Click Me!</ts-select>

      <button (click)="submit(myForm.value)">Submit</button>
    </form>
  `,
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
  ];
  key = 'slug';
  label = 'Select a Thing';
  blank = 'none';
  multipleAllowed = true;
  myForm = this.formBuilder.group({
    myChoices: [
      null,
      [],
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
