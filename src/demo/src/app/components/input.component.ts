import { Component } from '@angular/core';

@Component({
  selector: 'demo-input',
  template: `
    <ts-input
      [label]="label"
      [canClear]="clearable"
      [prefixIcon]="icon"
    ></ts-input>
  `,
})
export class InputComponent {
  label = 'My Input';
  clearable = false;
  icon = 'home';
}
