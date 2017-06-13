import { Component } from '@angular/core';
import { LibService } from '@terminus/ui';

@Component({
  selector: 'demo-app',
  template: `
    <my-lib></my-lib>
    <h3>Meaning is: {{meaning}}</h3>
    <div>
      <t-button [showProgress]="loading" (click)="run()">My Button!!!</t-button>
    </div>
  `,
})
export class AppComponent {
  meaning: number;
  loading = false;

  constructor(libService: LibService) {
    this.meaning = libService.getMeaning();
  }

  run() {
    this.loading = true;

    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
}
