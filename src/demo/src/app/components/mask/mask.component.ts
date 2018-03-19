import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

import { TsMaskDirective } from '@terminus/ui';


@Component({
  selector: 'demo-mask',
  templateUrl: './mask.component.html',
})
export class MaskComponent {

  phoneControl = new FormControl();
  numberControl = new FormControl();
  numberControlNoDecimal = new FormControl();
  currencyControl = new FormControl();
  postalControl = new FormControl();
  nonSanitizedControl = new FormControl();
  percentageControl = new FormControl();

  @ViewChild(TsMaskDirective)
  foo: TsMaskDirective;

  onAccept(v: any) {
    console.log('onAccept: ', v)
  }
  onComplete(v: any) {
    console.log('onComplete: ', v)
  }


}
