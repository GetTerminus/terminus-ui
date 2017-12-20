import { Component } from '@angular/core';


@Component({
  selector: 'demo-spacing-styles',
  styleUrls: ['./spacing-styles.component.scss'],
  template: `
    <p>
      Spacing added as 'padding' to each outlined div.
    </p>


    <div class="box box--small--2">
      padding: spacing(small, 2)
    </div>

    <div class="box box--small--1">
      padding: spacing(small, 1)
    </div>

    <div class="box box--small--0">
      padding: spacing(small)
    </div>

    <div class="box box--default--0">
      padding: spacing()
    </div>

    <div class="box box--large--0">
      padding: spacing(large)
    </div>

    <div class="box box--large--1">
      padding: spacing(large, 1)
    </div>

    <div class="box box--large--2">
      padding: spacing(large, 2)
    </div>

    <div class="box box--large--3">
      padding: spacing(large, 3)
    </div>

    <div class="box box--large--4">
      padding: spacing(large, 4)
    </div>

    <div class="box box--large--5">
      padding: spacing(large, 5)
    </div>

    <div class="box box--large--6">
      padding: spacing(large, 6)
    </div>
  `,
})
export class SpacingStylesComponent {
}
