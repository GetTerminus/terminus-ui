import { Component } from '@angular/core';

@Component({
  selector: 'demo-button',
  template: `
    <ts-button
      [theme]="style"
      (clickEvent)="run('progress2')"
      [isDisabled]="disabled"
      [showProgress]="progress2"
      [iconName]="icon"
    >Click Me!</ts-button>

    <hr>

    Themes:
    <br>
    <br>

    <ts-button
      theme="primary"
    >Primary</ts-button>

    <ts-button
      theme="accent"
    >Accent</ts-button>

    <ts-button
      theme="warn"
    >Warn</ts-button>

    <!--
    <ts-button
      theme="error"
    >Error</ts-button>

    <ts-button
      theme="highlight"
    >Highlight</ts-button>

    <ts-button
      theme="pure"
    >Pure</ts-button>

    <ts-button
      theme="primary"
      [isDisabled]="true"
    >I'm disabled :(</ts-button>
    -->
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
