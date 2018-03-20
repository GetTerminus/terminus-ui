import { Component } from '@angular/core';


@Component({
  selector: 'demo-copy',
  template: `
    <label>
      Enable quick copy:
      <input type="checkbox" [(ngModel)]="canCopy">
    </label>

    <hr>
    <br>

    <div style="width: 24rem; overflow: hidden;">
      <ts-copy
        [enableQuickCopy]="canCopy"
      >{{ fakeUrl }}</ts-copy>
    </div>
  `,
})
export class CopyComponent {
  fakeUrl = 'https://github.com/angular/material2/blob/master/src/lib/input/input-container.ts';
  canCopy = true;
}
