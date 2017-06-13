import { Component } from '@angular/core';

@Component({
  selector: 'demo-app',
  template: `
    <h3>Meaning is: {{meaning}}</h3>
    <div>
      <t-button [showProgress]="loading" (click)="run()">My Button!!!</t-button>
    </div>
  `,
})
export class AppComponent {
  meaning: number = 42;
  loading = false;

  constructor() {
  }


  run() {
    this.loading = true;

    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
}
