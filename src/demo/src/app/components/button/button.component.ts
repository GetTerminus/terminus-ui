import { Component } from '@angular/core';


@Component({
  selector: 'demo-button',
  styles: [`
    ts-button {
      margin-bottom: 1rem;
    }
  `],
  template: `
    <div>
      <label>
        Format:
        <select name="myFormat" [(ngModel)]="myFormat">
          <option value="{{ format }}" *ngFor="let format of formats">
            {{ format | titlecase }}
          </option>
        </select>
      </label>

      <br>
      <br>

      <label>
        Right-align layout:
        <input type="checkbox" [(ngModel)]="layoutIsRightAligned">
      </label>

      <br>
      <br>

      <div [style.textAlign]="layout">
        <ts-button
          [theme]="style"
          (clickEvent)="run('progress2')"
          [isDisabled]="disabled"
          [showProgress]="progress2"
          [iconName]="icon"
          [format]="myFormat"
        >Click Me!</ts-button>
      </div>
    </div>

    <br>
    <br>

    <hr>

    Themes:
    <br>
    <br>

    <ts-button
      theme="primary"
    >Primary</ts-button>

    <ts-button
      theme="primary"
      format="hollow"
      icon="home"
    >Primary Hollow</ts-button>

    <br>

    <ts-button
      theme="accent"
    >Accent</ts-button>

    <ts-button
      theme="accent"
      format="hollow"
    >Accent Hollow</ts-button>

    <br>

    <ts-button
      theme="warn"
    >Warn</ts-button>

    <ts-button
      theme="warn"
      format="hollow"
    >Warn Hollow</ts-button>

    <br>

    <ts-button
      theme="primary"
      [isDisabled]="true"
    >I'm disabled :(</ts-button>

    <ts-button
      theme="primary"
      format="hollow"
      [isDisabled]="true"
      [showProgress]="progress2"
      (clickEvent)="run('progress2')"
    >I'm disabled AND empty inside :(</ts-button>

    <br>

    <div fxLayout="column" fxLayoutAlign="start end" style="padding-right: 2rem;">
      <ts-button
        theme="primary"
        iconName="add"
        [format]="formatCollapsable"
      >New Campaign / New Tactic</ts-button>

      <ts-button
        theme="accent"
        iconName="add"
        [format]="formatCollapsable"
      >New Campaign / New Tactic</ts-button>

      <ts-button
        theme="warn"
        iconName="add"
        [format]="formatCollapsable"
      >New Campaign / New Tactic</ts-button>

      <ts-button
        theme="primary"
        iconName="add"
        [format]="formatCollapsable"
        [isDisabled]="true"
      >Rounded - Disabled</ts-button>
    </div>
  `,
})
export class ButtonComponent {
  style = 'primary';
  style2 = 'accent';
  disabled = false;
  progress1 = false;
  progress2 = false;
  icon = 'home';
  formatCollapsable = 'collapsable';
  formats = ['filled', 'hollow', 'collapsable'];
  myFormat = 'filled';
  layoutIsRightAligned = false;
  get layout(): string {
    return this.layoutIsRightAligned ? 'right' : 'left';
  }

  run(progress: any) {
    console.log('Demo: In run!');
    this[progress] = true;

    setTimeout(() => {
      this[progress] = false;
    }, 2000);
  }

}
