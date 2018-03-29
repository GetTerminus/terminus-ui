import { Component } from '@angular/core';


@Component({
  selector: 'demo-copy',
  templateUrl: './copy.component.html',
})
export class CopyComponent {
  fakeUrl = 'https://github.com/angular/material2/blob/master/src/lib/input/input-container.ts';
  canCopy = false;
}
