import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'demo-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  disabled = false;
  myTheme = 'accent';
  columns = [
    'Title',
    'Account',
    'Budget',
    'Enabled',
  ];
  myForm = this.formBuilder.group({
    showColumns: this.formBuilder.array([true, true, true, true]),
  });

  constructor(
    private formBuilder: FormBuilder,
  ) {}


  customItemSelected(item: any): void {
    console.log('Item selected: ', item);
  }

  submit(v: any) {
    console.log('DEMO: form submission: ', v);
  }

}
