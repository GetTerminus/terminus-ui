import { Component } from '@angular/core';

@Component({
  selector: 'demo-app',
  styleUrls: ['./app.component.scss'],
  template: `
    <h3>Meaning is: {{meaning}}</h3>
    <div>
      <ts-button [showProgress]="loading" (click)="run()">My Button!!!</ts-button>
    </div>
    <form #form1="ngForm" (ngSubmit)="submitSearch(form1.value)">
      Requirements:
      <br>
      <ts-input required minlength="3" [(ngModel)]="query1" name="query1"></ts-input>
      <button type="submit">Submit</button>
    </form>
    <div>
      <ts-search></ts-search>
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
