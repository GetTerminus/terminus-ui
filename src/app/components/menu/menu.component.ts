import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { TsStyleThemeTypes } from '@terminus/ui';


@Component({
  selector: 'demo-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  disabled = false;
  myTheme: TsStyleThemeTypes = 'accent';
  columns: string[] = [
    'Title',
    'Account',
    'Budget',
    'Enabled',
  ];
  myForm: FormGroup = this.formBuilder.group({
    showColumns: this.formBuilder.array([true, true, true, true]),
  });


  constructor(
    private formBuilder: FormBuilder,
  ) {}


  customItemSelected(item: string): void {
    console.log('DEMO: Item selected: ', item);
  }

  log(v: any): void {
    console.log('DEMO: form submission: ', v);
  }

}
