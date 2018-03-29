import {
  Component,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  AbstractControl,
} from '@angular/forms';
import { TsMaskDirective } from '@terminus/ui';


@Component({
  selector: 'demo-mask',
  templateUrl: './mask.component.html',
})
export class MaskComponent {
  phoneControl: AbstractControl = new FormControl();
  numberControl: AbstractControl = new FormControl();
  numberControlNoDecimal: AbstractControl = new FormControl();
  currencyControl: AbstractControl = new FormControl();
  postalControl: AbstractControl = new FormControl();
  nonSanitizedControl: AbstractControl = new FormControl();
  percentageControl: AbstractControl = new FormControl();

  @ViewChild(TsMaskDirective)
  myMask: TsMaskDirective;
}
