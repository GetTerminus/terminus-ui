import { Component } from '@angular/core';

import { TsMenuItem } from '@terminus/ui';


@Component({
  selector: 'demo-menu',
  template: `
    <label>
      Disabled:
      <input type="checkbox" [(ngModel)]="disabled"/>
    </label>

    <hr>

    <ts-menu
      [theme]="myTheme"
      [menuItems]="demoItems"
      [isDisabled]="disabled"
      (selected)="itemSelected($event)"
    >Select Item</ts-menu>
  `,
})
export class MenuComponent {
  demoItems = [
    {
      name: 'Item 1',
      icon: 'build',
      action: 'foobar',
    },
    {
      name: 'Item 2',
      icon: null,
      action: 'barbaz',
    },
    {
      name: 'Item 3',
      icon: 'announcement',
      action: 'bing',
    },
  ];
  disabled = true;
  myTheme = 'primary';


  itemSelected(item: TsMenuItem): void {
    console.log('Item selected: ', item.name);
  }

}
