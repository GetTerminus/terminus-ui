import { Component } from '@angular/core';

@Component({
  selector: 'demo-checkbox',
  template: `
    <form name="demo">
      <ts-checkbox
        [isChecked]="checked"
        [theme]="myTheme"
        [isDisabled]="disabled"
        [isRequired]="required"
        [isIndeterminate]="indeterminate"
        (inputChange)="changed($event)"
        (indeterminateChange)="interChanged($event)"
      >My checkbox!</ts-checkbox>
    </form>
  `,
})
export class CheckboxComponent {
  checked = true;
  disabled = false;
  required = true;
  indeterminate = false;
  myTheme = 'warn';

  changed(e: any) {
    console.log('Input changed: ', e);
  }

  interChanged(e: any) {
    console.log('Indeterminate input changed: ', e);
  }
}
