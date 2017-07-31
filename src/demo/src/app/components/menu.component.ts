import { Component } from '@angular/core';

@Component({
  selector: 'demo-menu',
  template: `
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
  disabled = false;
  myTheme = 'primary';

  itemSelected(item: any): void {
    console.log('Item selected: ', item.name);
  }
}
