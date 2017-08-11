import { Component } from '@angular/core';

@Component({
  selector: 'demo-spacing-styles',
  styleUrls: ['./spacing-styles.component.scss'],
  template: `
    <div class="box box--small--3x">
      padding: spacing(small, 3x)
    </div>

    <div class="box box--small--2x">
      padding: spacing(small, 2x)
    </div>

    <div class="box box--small--1x">
      padding: spacing(small, 1x)
    </div>

    <div class="box box--default--1x">
      padding: spacing()
    </div>

    <div class="box box--large--1x">
      padding: spacing(large, 1x)
    </div>

    <div class="box box--large--2x">
      padding: spacing(large, 2x)
    </div>

    <div class="box box--large--3x">
      padding: spacing(large, 3x)
    </div>

    <div class="box box--large--4x">
      padding: spacing(large, 4x)
    </div>

    <div class="box box--large--5x">
      padding: spacing(large, 5x)
    </div>

    <div class="box box--large--6x">
      padding: spacing(large, 6x)
    </div>

    <div class="box box--large--7x">
      padding: spacing(large, 7x)
    </div>
  `,
})
export class SpacingStylesComponent {
}
