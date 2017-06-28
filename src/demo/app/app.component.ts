import { Component } from '@angular/core';

@Component({
  selector: 'demo-app',
  styleUrls: ['./app.component.scss'],
  template: `
    <h2>Demo</h2>

    <router-outlet></router-outlet>
  `,
})
export class AppComponent {

  constructor(
  ) {}

}
