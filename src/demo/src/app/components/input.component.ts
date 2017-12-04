import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { TsValidatorsService } from '@terminus/ui';

@Component({
  selector: 'demo-input',
  template: `
    <ts-input
      style="width:100%;"
      [(ngModel)]="myValue"
      label="Input with ngModel"
      isClearable="true"
      isRequired="true"
      name="static input"
    ></ts-input>

    <br>
    <strong>ngModel value: {{myValue}}</strong>
    <br>
    <br>

    <form [formGroup]="myForm" novalidate>
      <ts-input
        style="width:100%;"
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
        style="width:100%;"
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
  myValue;

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
        this.validatorsService.validateEmail,
      ],
    ],
  });


  constructor(
    private formBuilder: FormBuilder,
    private validatorsService: TsValidatorsService,
  ) {}

  submit(v: any) {
    console.log('Submit!: ', v);
  }

  getControl(name: string): AbstractControl {
    return this.myForm.get(name);
  }
}
