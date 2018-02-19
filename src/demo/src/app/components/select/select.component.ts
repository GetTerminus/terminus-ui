import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { TsSelectItem } from '@terminus/ui';


@Component({
  selector: 'demo-select',
  templateUrl: './select.component.html',
})
export class SelectComponent {
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
  myForm = this.formBuilder.group({
    myChoices1: [
      null,
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
