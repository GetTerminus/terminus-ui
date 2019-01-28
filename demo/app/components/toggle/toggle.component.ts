import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { TsSlideToggleChange } from '@terminus/ui/toggle';


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


  isChanged(e: TsSlideToggleChange) {
    console.log('in changed: ', e);
  }

  log(v: any) {
    console.log('DEMO: From value: ', v);
  }

}
