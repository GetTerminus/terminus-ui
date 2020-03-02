import { Component } from '@angular/core';


@Component({
  selector: 'demo-icon-button',
  templateUrl: './icon-button.component.html',
})
export class IconButtonComponent {

  clickTheme(v: string): void {
    console.log(`DEMO: '${v}' icon-button clicked.`);
  }

}
