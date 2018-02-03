import { Component } from '@angular/core';


@Component({
  selector: 'demo-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  disabled = false;
  myTheme = 'accent';


  customItemSelected(item: any): void {
    console.log('Item selected: ', item);
  }

}
