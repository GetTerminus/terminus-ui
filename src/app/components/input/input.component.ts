import {
  Component,
} from '@angular/core';
import {
  FormBuilder,
  Validators,
} from '@angular/forms';

import { TsValidatorsService } from '@terminus/ui';


@Component({
  selector: 'demo-input',
  templateUrl: './input.component.html',
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
      ],
    ],
    email: [
      null,
      [
        Validators.required,
        this.validatorsService.email(),
      ],
    ],
    password: [
      null,
      [
        Validators.required,
        this.validatorsService.password(),
      ],
    ],
  });


  constructor(
    private formBuilder: FormBuilder,
    private validatorsService: TsValidatorsService,
  ) {}

  submit(v: any) {
    console.log('Demo submit!: ', v);
  }

}
