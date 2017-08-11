import { Component } from '@angular/core';

@Component({
  selector: 'demo-spacing',
  styles: [`
    div {
      outline: 1px solid lightblue;
      padding: 8px;
    }
  `],
  template: `
    <div tsVerticalSpacing="small--3x">
      tsVerticalSpacing="small--3x"
    </div>

    <div tsVerticalSpacing="small--2x">
      tsVerticalSpacing="small--2x"
    </div>

    <div tsVerticalSpacing="small--1x">
      tsVerticalSpacing="small--1x"
    </div>

    <div tsVerticalSpacing>
      tsVerticalSpacing
    </div>

    <div tsVerticalSpacing="large--1x">
      tsVerticalSpacing="large--1x"
    </div>

    <div tsVerticalSpacing="large--2x">
      tsVerticalSpacing="large--2x"
    </div>

    <div tsVerticalSpacing="large--3x">
      tsVerticalSpacing="large--3x"
    </div>

    <div tsVerticalSpacing="large--4x">
      tsVerticalSpacing="large--4x"
    </div>

    <div tsVerticalSpacing="large--5x">
      tsVerticalSpacing="large--5x"
    </div>

    <div tsVerticalSpacing="large--6x">
      tsVerticalSpacing="large--6x"
    </div>

    <div tsVerticalSpacing="large--7x">
      tsVerticalSpacing="large--7x"
    </div>

    <div>
      Standard content...
    </div>
  `,
})
export class SpacingComponent {
}
