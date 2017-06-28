import { Component } from '@angular/core';

@Component({
  selector: 'demo-button',
  template: `
    <ts-button
      [buttonStyle]="style"
      (click)="run()"
    >Click Me!</ts-button>
  `,
})
export class ButtonComponent {
  style = 'accent';

  run() {
    console.log('in run');
  }
}
