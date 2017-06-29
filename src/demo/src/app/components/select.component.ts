import { Component } from '@angular/core';

@Component({
  selector: 'demo-select',
  template: `
    <ts-select
      [items]="items"
      [label]="label"
      [blankChoice]="blank"
      [multipleAllowed]="multipleAllowed"
      [valueKey]="key"
      (open)="isOpened($event)"
      (close)="isClosed($event)"
      (change)="isChanged($event)"
    >Click Me!</ts-select>
  `,
})
export class SelectComponent {
  items = [
    {
      name: 'Foo',
      slug: 'foo',
    },
    {
      name: 'Bar',
      slug: 'bar',
    },
  ];
  key = 'slug';
  label = 'Select a Thing';
  blank = 'none';
  multipleAllowed = true;

  run() {
    console.log('in run');
  }

  isOpened(e) {
    console.log('opened: ', e);
  }

  isClosed(e) {
    console.log('closed: ', e);
  }

  isChanged(e) {
    console.log('changed: ', e);
  }
}
