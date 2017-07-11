import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { componentsList } from './components-list.constant';

@Component({
  selector: 'demo-components',
  template: `
    <h2>{{ title }}</h2>

    <select [(ngModel)]="path" (ngModelChange)="goToComponent($event)" class="form-control">
      <option value="">Select Component</option>
      <option *ngFor="let component of components" [value]="component.path">
        {{ component.data.name }}
      </option>
    </select>

    <div [style.height]="height"></div>

    <router-outlet></router-outlet>
  `,
})
export class ComponentsComponent implements OnInit {
  title = 'Components';
  height = '100px';
  components = componentsList;
  path = '';


  constructor(
    private router: Router,
  ) {}


  ngOnInit() {
    this.setCurrentPage();
  }


  /**
   * Set the menu to the current page
   */
  setCurrentPage(): void {
    const routeParts = this.router.routerState.snapshot.url.split('/');
    if (routeParts.length > 2) {
      this.path = routeParts[routeParts.length - 1];
    }
  }


  /**
   * Go to a component  selected by the menu
   *
   * @param {Object} value The selected component info
   */
  goToComponent(value: any): void {
    if (value) {
      this.router.navigate(['components', value]);
    } else {
      this.router.navigate(['components']);
    }
  }

}
