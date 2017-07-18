import { Component } from '@angular/core';

@Component({
  selector: 'demo-copy',
  template: `
    <div style="width: 24rem; overflow: hidden;">
      <ts-copy
      >{{ fakeUrl }}</ts-copy>
    </div>
  `,
})
export class CopyComponent {
  fakeUrl = 'https://github.com/angular/material2/blob/master/src/lib/input/input-container.ts';

}
