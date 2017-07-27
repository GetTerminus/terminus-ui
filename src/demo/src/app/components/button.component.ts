import { Component } from '@angular/core';

@Component({
  selector: 'demo-button',
  template: `
    <ts-button
      [buttonStyle]="style"
      (clickEvent)="run('progress1')"
      [isDisabled]="disabled"
      [showProgress]="progress1"
    >Click Me!</ts-button>

    <ts-button
      [buttonStyle]="style2"
      (clickEvent)="run('progress2')"
      [isDisabled]="disabled"
      [showProgress]="progress2"
      [iconName]="icon"
    >Click Me!</ts-button>

    <ts-button
      [isDisabled]="true"
    >I'm disabled :(</ts-button>
  `,
})
export class ButtonComponent {
  style = 'primary';
  style2 = 'accent';
  disabled = false;
  progress1 = false;
  progress2 = false;
  icon = 'home';


  run(progress: any) {
    this[progress] = true;

    setTimeout(() => {
      this[progress] = false;
    }, 2000);
  }
}
