import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TsValidatorsService } from '@terminus/ui/validators';


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
  myValue: string | undefined;
  myDatepickerValue: string | Date = new Date(2018, 1, 2);
  textareaModel;
  shouldDisable = false;
  activeMask = 'none';
  masks: any[] = [
    'none',
    'currency',
    'date',
    'number',
    'percentage',
    'phone',
    'postal',
  ];
  sanitizeValue = false;
  allowDecimal = true;
  hideRequiredMarker = false;
  isClearable = true;
  isDisabled = false;
  isFocused = false;
  isRequired = true;
  isReadonly = false;
  myForm: FormGroup = this.formBuilder.group({
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
        this.validatorsService.email(),
      ],
    ],
    phone: [
      '1234567890',
      [
        Validators.required,
      ],
    ],
    myDate: [
      new Date(2018, 5, 1),
      [
        Validators.required,
      ],
    ],
  });


  constructor(
    private formBuilder: FormBuilder,
    private validatorsService: TsValidatorsService,
  ) {

    // Test seeded values:
    /*
     *setTimeout(() => {
     *  this.myForm.get('name').setValue('foooo');
     *}, 3000);
     */
  }


  submit(v: any): void {
    console.log('Demo submit!: ', v);
  }

  updateLabel() {
    if (this.label1.length < 10) {
      this.label1 = 'My really long input label that will test the responsive nature..';
    } else {
      this.label1 = 'My Input';
    }
  }

}
