import { Component } from '@angular/core';

@Component({
  selector: 'demo-toggle',
  template: `
    <ts-toggle
      [(ngModel)]="isChecked"
      [isDisabled]="isDisabled"
      [name]="name"
      [isRequired]="required"
      (change)="isChanged($event)"
    >Toggle Me!</ts-toggle>
  `,
})
export class ToggleComponent {
  isChecked= false;
  isDisabled = false;
  name = 'myToggle';
  required = true;

  isChanged(e) {
    console.log('in changed: ', e);
  }
}
