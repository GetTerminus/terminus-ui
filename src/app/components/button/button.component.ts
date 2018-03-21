import { Component } from '@angular/core';
import { TsButtonFormatTypes } from '@terminus/ui';


@Component({
  selector: 'demo-button',
  templateUrl: './button.component.html',
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
  layoutIsRightAligned = false;
  get layout(): string {
    return this.layoutIsRightAligned ? 'right' : 'left';
  }

  run(progress: string): void {
    console.log('Demo: In run!');
    this[progress] = true;

    setTimeout(() => {
      this[progress] = false;
    }, 2000);
  }

}
