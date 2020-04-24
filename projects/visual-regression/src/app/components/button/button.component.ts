import { Component } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  public title = 'Visual Regression';
  public progress = false;

  public run(): void {
    this.progress = true;
  }
}
