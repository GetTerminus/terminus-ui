import { Component } from '@angular/core';

@Component({
  selector: 'demo-spacing',
  styles: [`
    div {
      outline: 1px solid lightblue;
    }
  `],
  template: `
    <div tsVerticalSpacing="small--3x">
      Thing 1
    </div>

    <div tsVerticalSpacing>
      Thing 2
    </div>

    <div tsVerticalSpacing="large--3x">
      Thing 3
    </div>
  `,
})
export class SpacingComponent {
}
