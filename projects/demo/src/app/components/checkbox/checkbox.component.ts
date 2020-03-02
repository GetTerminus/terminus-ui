import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'demo-checkbox',
  templateUrl: './checkbox.component.html',
})
export class CheckboxComponent {
  myValue = true;
  checked = true;
  disabled = false;
  required = true;
  indeterminate = false;
  myTheme = 'accent';
  myForm = this.formBuilder.group({
    myCheck: [
      false,
    ],
  });


  constructor(
    private formBuilder: FormBuilder,
  ) {}


  changed(e: boolean) {
    console.log('Input changed: ', e);
  }

  interChanged(e: boolean) {
    console.log('Indeterminate input changed: ', e);
  }

  submit(v: any) {
    console.log('DEMO: form submit: ', v);
  }

}
