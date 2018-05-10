import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TsValidatorsService } from '@terminus/ui';
import { updateControlOnInputChanges } from '@terminus/ngx-tools';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';


@Component({
  selector: 'demo-input',
  templateUrl: './input.component.html',
})
export class InputComponent implements OnChanges {
  label1 = 'My Input';
  label2 = 'My 2nd Input';
  label3 = 'This is to test text overlap';
  clearable = true;
  icon = 'home';
  model1 = 'A seeded value';
  myValue;
  shouldDisable = true;
  inputComponentInitialized = false;
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
    seedValue: [
      null,
      [],
    ],
  });

  @Input()
  public seedValue: string;


  constructor(
    private formBuilder: FormBuilder,
    private validatorsService: TsValidatorsService,
  ) {

    // Test seeded values:
    setTimeout(() => {
      this.myForm.get('name').setValue('foooo');
     }, 3000);
  }


  submit(v: any): void {
    console.log('Demo submit!: ', v);
  }


  ngOnChanges(changes: SimpleChanges) {
    updateControlOnInputChanges(changes, 'seedValue', this.myForm.get('seedValue'));
  }

}
