import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
} from '@angular/forms';


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
    dateRange: this.formBuilder.group({
      startDate: [
        {value: new Date(2017, 4, 6), disabled: true},
      ],
      endDate: [
        new Date(2017, 4, 8),
      ],
    }),
  });


  constructor(
    private formBuilder: FormBuilder,
  ) {}


  ngOnInit() {
    /*
     *this.myForm.valueChanges.subscribe(data => console.log('DEMO: Subscribed form changes', data));
     */
  }


  printRange(formValue: any): void {
    console.log('DEMO: formValue: ', formValue);
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
