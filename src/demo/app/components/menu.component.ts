import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'demo-menu',
  template: `
    <ts-menu
      [menuItems]="demoItems"
      [isDisabled]="isDisabled"
      (selected)="wasSelected($event)"
    >Select an item</ts-menu>
  `,
})
export class DemoMenuComponent implements OnInit {
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
  isDisabled = false;


  ngOnInit() {
  }

  wasSelected(item) {
    console.log('item: ', item);
  }

}
