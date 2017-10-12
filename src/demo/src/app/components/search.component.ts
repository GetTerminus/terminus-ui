import { Component } from '@angular/core';


@Component({
  selector: 'demo-search',
  template: `
    <ts-search
      [isSubmitting]="inProgress"
      [initialValue]="startingValue"
      (submitted)="onSubmit($event)"
      (cleared)="onClear()"
    ></ts-search>
  `,
})
export class SearchComponent {
  inProgress = false;
  startingValue = '';



  onSubmit(query: string) {
    console.log('DEMO submission!', query);
    this.inProgress = true;

    setTimeout(() => {
      this.inProgress = false;
    }, 1000);
  }


  onClear() {
    console.log('DEMO search cleared!');
  }

}
