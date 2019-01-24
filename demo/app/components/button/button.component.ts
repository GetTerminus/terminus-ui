import { Component } from '@angular/core';
import { TsButtonFormatTypes } from '@terminus/ui/button';
import { TsStyleThemeTypes } from '@terminus/ui/utilities';


@Component({
  selector: 'demo-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  style = 'primary';
  style2 = 'accent';
  disabled = false;
  progress1 = false;
  progress2 = false;
  icon = 'home';
  formatCollapsable = 'collapsable';
  formats: TsButtonFormatTypes[] = ['filled', 'hollow', 'collapsable'];
  myFormat = 'filled';
  myTheme: TsStyleThemeTypes = 'primary';
  themes: TsStyleThemeTypes[] = ['primary', 'accent', 'warn'];
  layoutIsRightAligned = false;
  get layout(): string {
    return this.layoutIsRightAligned ? 'right' : 'left';
  }

  run(progress: string): void {
    console.log('Demo: In run!');

    if (progress === 'progress1') {
      this.progress1 = true;
    }
    if (progress === 'progress2') {
      this.progress2 = true;
    }

    setTimeout(() => {
      if (progress === 'progress1') {
        this.progress1 = false;
      }
      if (progress === 'progress2') {
        this.progress2 = false;
      }
    }, 2000);
  }

}
