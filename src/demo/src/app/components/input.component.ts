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
        formControlName="email"
        [formControl]="getControl('email')"
        [label]="label1"
        [isClearable]="clearable"
        hint="A valid email is required."
        [isRequired]="true"
        name="password"
        [spellcheck]="false"
        [autocomplete]="'email'"
        type="password"
      ></ts-input>

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
    return this.myForm.controls[name];
  }
}
