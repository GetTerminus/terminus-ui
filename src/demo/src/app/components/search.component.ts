import { Component } from '@angular/core';


@Component({
  selector: 'demo-search',
  template: `
    <label>
      Auto-submit:
      <input type="checkbox" [(ngModel)]="shouldAutoSubmit">
    </label>

    <label>
      Is submitting:
      <input type="checkbox" [(ngModel)]="inProgress">
    </label>

    <hr>
    <br>
    <ts-search
      [isSubmitting]="inProgress"
      isFocused="true"
      [initialValue]="startingValue"
      [autoSubmit]="shouldAutoSubmit"
      (submitted)="onSubmit($event)"
      (cleared)="onClear()"
      (changed)="onChange($event)"
    ></ts-search>
  `,
})
export class SearchComponent {
  inProgress = false;
  startingValue = '';
  shouldAutoSubmit = true;


  onSubmit(query: string) {
    console.warn('DEMO submission!', query);
    this.inProgress = true;

    setTimeout(() => {
      this.inProgress = false;
    }, 1000);
  }


  onClear() {
    console.log('DEMO search cleared!');
  }

  onChange(value: string) {
    console.log('DEMO search input changed: ', value);
  }

}
