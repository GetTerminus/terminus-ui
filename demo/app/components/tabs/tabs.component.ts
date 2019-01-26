import { Component } from '@angular/core';

@Component({
  selector: 'demo-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent {
  first: boolean = true;
  second: boolean = false;
  third: boolean = false;
  tabs: Array<number> = [];
  constructor() {}
}
