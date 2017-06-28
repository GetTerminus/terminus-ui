import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'demo-components',
  template: `
    <h2>{{ title }}</h2>

    <select [(ngModel)]="route" (ngModelChange)="goToComponent($event)" class="form-control">
      <option value="">Select Component</option>
      <option *ngFor="let component of components" [value]="component.route">
        {{ component.name }}
      </option>
    </select>

    <div [style.height]="height"></div>

    <router-outlet></router-outlet>
  `,
})
export class ComponentsComponent implements OnInit {
  title = 'Components';
  height = '100px';
  components = [
    {
      name: 'Button',
      route: ['button'],
    },
    {
      name: 'Menu',
      route: ['menu'],
    },
    {
      name: 'Input',
      route: ['input'],
    },
  ];
  route: any;

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
    this.route = routeParts[routeParts.length - 1];
  }


  /**
   * Go to a component route selected by the menu
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
