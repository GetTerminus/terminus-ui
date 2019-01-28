import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TsValidatorsService } from '@terminus/ui/validators';


const date1 = new Date(2018, 10, 12);
if (date1.getDate() > 25) {
  date1.setDate(date1.getDate() + 6);
}
const date2 = new Date(date1);
date2.setDate(date2.getDate() + 5);

@Component({
  selector: 'demo-date-range',
  templateUrl: './date-range.component.html',
})
export class DateRangeComponent implements OnInit {
  myMin: Date = new Date(2017, 4, 2);
  /*
   *initialStart: Date = new Date(2017, 4, 5);
   *initialEnd: Date = new Date(2017, 4, 9);
   */
  defaultMax = '2017-10-03';
  myForm: FormGroup = this.formBuilder.group({
    dateRange: this.formBuilder.group({
      startDate: [
        null,
        [
          Validators.required,
          this.validatorsService.maxDate(date1.toISOString()),
        ],
      ],
      endDate: [
        null,
        [Validators.required],
      ],
    }),
  });


  constructor(
    private formBuilder: FormBuilder,
    private validatorsService: TsValidatorsService,
  ) {}


  ngOnInit() {
    /*
     *this.myForm.valueChanges.subscribe(data => console.log('DEMO: Subscribed form changes', data));
     */
  }


  printRange(formValue: any): void {
    console.log('DEMO: formValue: ', formValue);
  }

  updateStartDate() {
    const ctrl = this.myForm.get('dateRange.startDate');

    if (ctrl) {
      ctrl.setValue(new Date(2019, 0, 2).toISOString());
    }
  }


  toggleStart() {
    const ctrl = this.myForm.get('dateRange.startDate');
    if (ctrl) {
      if (ctrl.enabled) {
        ctrl.disable();
      } else {
        ctrl.enable();
      }
    }
  }

}
