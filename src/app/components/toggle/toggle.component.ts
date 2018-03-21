import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
} from '@angular/forms';


@Component({
  selector: 'demo-toggle',
  templateUrl: './toggle.component.html',
})
export class ToggleComponent {
  isChecked = false;
  isDisabled = false;
  name = 'myToggle';
  required = true;
  myForm: FormGroup = this.formBuilder.group({
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

  log(v: any) {
    console.log('DEMO: From value: ', v);
  }

}
