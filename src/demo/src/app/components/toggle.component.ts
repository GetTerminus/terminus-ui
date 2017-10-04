import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'demo-toggle',
  template: `
    <form [formGroup]="myForm" novalidate>
      <ts-toggle
        formControlName="myToggle"
        [formControl]="getControl('myToggle')"
        [isDisabled]="isDisabled"
        [name]="name"
        [isRequired]="required"
        (change)="isChanged($event)"
      >Toggle Me!</ts-toggle>

      <button (click)="submit(myForm.value)">Submit</button>
    </form>
  `,
})
export class ToggleComponent {
  isChecked= false;
  isDisabled = false;
  name = 'myToggle';
  required = true;
  myForm = this.formBuilder.group({
    myToggle: [
      null,
      [],
    ],
  });

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  isChanged(e) {
    console.log('in changed: ', e);
  }

  submit(v: any) {
    console.log('Submit!: ', v);
  }

  getControl(name: string): AbstractControl {
    return this.myForm.get(name);
  }
}
