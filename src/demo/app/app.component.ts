import { Component } from '@angular/core';

@Component({
  selector: 'demo-app',
  styleUrls: ['./app.component.scss'],
  template: `
    <h3>Meaning is: {{meaning}}</h3>
    <div>
      <ts-menu>Select an item</ts-menu>
    </div>
  `,
})
export class AppComponent {
  meaning: number = 42;
  loading = false;
  query1 = '';

  constructor() {
  }


  run() {
    this.loading = true;

    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  submitSearch(value: any) {
    console.log('search submitted: ', value);
  }
}
