import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'demo-app',
  template: `
    <h3>Components</h3>

    <nav>
      <a routerLink="/components/button" routerLinkActive="active">Button</a>
      <a routerLink="/components/menu" routerLinkActive="active">Menu</a>
      <a routerLink="/components/input" routerLinkActive="active">Input</a>
    </nav>

    <select ngModel (ngModelChange)="goToComponent($event)" class="form-control">
      <option value="">Select Component</option>
      <option *ngFor="let component of components" [value]="component.route">
        {{ component.name }}
      </option>
    </select>

    <div [style.height]="height"></div>
    <router-outlet></router-outlet>
  `,
})
export class DemoComponentsComponent {
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

  constructor(
    private router: Router,
  ) {}


  goToComponent(value: any) {
    console.log('value: ', value);
    this.router.navigate(['components', value]);
  }
}

