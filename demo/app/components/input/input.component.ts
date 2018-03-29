import {
  Component,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
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
  shouldDisable = true;
  myForm: FormGroup = this.formBuilder.group({
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


  submit(v: any): void {
    console.log('Demo submit!: ', v);
  }

}
