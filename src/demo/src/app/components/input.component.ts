import { Component } from '@angular/core';

@Component({
  selector: 'demo-input',
  template: `
    <ts-input
      [(ngModel)]="model1"
      [label]="label1"
      [canClear]="clearable"
      [prefixIcon]="icon"
    ></ts-input>

    <br>
    <br>

    <ts-input
      [label]="label2"
    ></ts-input>
  `,
})
export class InputComponent {
  label1 = 'My Input';
  label2 = 'My 2nd Input';
  clearable = true;
  icon = 'home';
  model1 = 'A seeded value';
}
