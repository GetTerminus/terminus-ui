import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { TsValidatorsService } from '@terminus/ui';


@Component({
  selector: 'demo-date-range',
  templateUrl: './date-range.component.html',
})
export class DateRangeComponent implements OnInit {
  myMin: Date = new Date(2017, 4, 2);
  initialStart: Date = new Date(2017, 4, 5);
  initialEnd: Date = new Date(2017, 4, 9);
  defaultMax = '2017-10-03';
  myForm: FormGroup = this.formBuilder.group({
    name: [null, [Validators.required]],
    dateRange: this.formBuilder.group({
      startDate: [
        new Date(2017, 4, 6),
      ],
      endDate: [
        new Date(2017, 4, 8),
      ],
    }),
  });

  get group(): any {
    const gr = this.myForm.get('dateRange');
    return gr;
  }

  get endDate(): string {
    const date = this.getControl('endDate');
    return date ? date.value : this.defaultMax;
  }

  get startDate(): string {
    const date = this.getControl('startDate');
    return date ? date.value : null;
  }



  constructor(
    private formBuilder: FormBuilder,
    private validatorsService: TsValidatorsService,
  ) {}


  printRange() {
    const formValue = this.myForm.value;
    console.log('DEMO: formValue: ', formValue)
  }

  getControl(name: string): AbstractControl | null {
    const control = this.myForm.get(name);
    return control;
  }

  rangeEndChange(e: any) {
    if (e) {
      const control = this.myForm.get('startDate');

      control.setValidators([
        Validators.required,
        this.validatorsService.maxDate(this.endDate),
      ]);
      control.updateValueAndValidity();
    }
  }

  ngOnInit() {
    /*
     *this.myForm.valueChanges.subscribe(data => console.log('DEMO: Subscribed form changes', data));
     */
  }
}
