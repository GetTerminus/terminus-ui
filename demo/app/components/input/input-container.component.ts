import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TsValidatorsService } from '@terminus/ui';


@Component({
  selector: 'demo-input-container-component',
  template: `
    <demo-input
      [seedValue]="seedValue"
    >
    </demo-input>
  `,
})
export class InputContainerComponent {
  seedValue = 'this is weird';


  constructor(

  ) { }

}
