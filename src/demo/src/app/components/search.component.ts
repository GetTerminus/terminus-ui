import { Component } from '@angular/core';


@Component({
  selector: 'demo-search',
  template: `
    <ts-search
      [isSubmitting]="inProgress"
      [initialValue]="startingValue"
      (submitted)="onSubmit($event)"
    ></ts-search>
  `,
})
export class SearchComponent {
  inProgress = false;
  startingValue = 'boop';




  onSubmit(query: string) {
    console.log('DEMO submission!', query);
    this.inProgress = true;

    setTimeout(() => {
      this.inProgress = false;
    }, 1000);
  }
}
