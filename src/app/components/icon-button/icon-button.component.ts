import { Component } from '@angular/core';


@Component({
  selector: 'demo-icon-button',
  templateUrl: './icon-button.component.html',
})
export class IconButtonComponent {

  click(v: string) {
    console.log(`DEMO: '${v}' icon-button clicked.`);
  }

}
