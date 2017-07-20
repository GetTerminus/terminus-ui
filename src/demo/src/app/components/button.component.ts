import { Component } from '@angular/core';

@Component({
  selector: 'demo-button',
  template: `
    <ts-button
      [buttonStyle]="style"
      (clickEvent)="run()"
      [isDisabled]="disabled"
      [showProgress]="progress"
    >Click Me!</ts-button>
  `,
})
export class ButtonComponent {
  style = 'accent';
  disabled = false;
  progress = false;


  run() {
    this.progress = true;

    setTimeout(() => {
      this.progress = false;
    }, 2000);
  }
}
