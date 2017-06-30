import { Component } from '@angular/core';

@Component({
  selector: 'demo-button',
  template: `
    <ts-button
      [buttonStyle]="style"
      (clickEvent)="run()"
      [isDisabled]="disabled"
    >Click Me!</ts-button>
  `,
})
export class ButtonComponent {
  style = 'accent';
  disabled = false;

  run() {
    console.log('in run');
  }
}
