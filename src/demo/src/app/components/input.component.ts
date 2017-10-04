import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'demo-input',
  template: `
    <form [formGroup]="myForm" novalidate>
      <ts-input
        formControlName="name"
        [formControl]="getControl('name')"
        [label]="label1"
        [isClearable]="clearable"
        [isRequired]="true"
        name="name"
        [spellcheck]="false"
        [prefixIcon]="icon"
      ></ts-input>

      <br>
      <br>

      <ts-input
        formControlName="email"
        [formControl]="getControl('email')"
        [label]="label2"
        [isClearable]="clearable"
        hint="A valid email is required."
        [isRequired]="true"
        name="email"
        [spellcheck]="false"
        [autocomplete]="'email'"
        type="email"
      ></ts-input>

      <br>
      <br>

      <button (click)="submit(myForm.value)">Submit</button>
    </form>
  `,
})
export class InputComponent {
  label1 = 'My Input';
  label2 = 'My 2nd Input';
  clearable = true;
  icon = 'home';
  model1 = 'A seeded value';

  myForm = this.formBuilder.group({
    name: [
      null,
      [
        Validators.required,
      ],
    ],
    email: [
      null,
      [
        Validators.required,
      ],
    ],
  });


  constructor(
    private formBuilder: FormBuilder,
  ) {}

  submit(v: any) {
    console.log('Submit!: ', v);
  }

  getControl(name: string): AbstractControl {
    return this.myForm.get(name);
  }
}
