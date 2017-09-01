import { Component } from '@angular/core';

@Component({
  selector: 'ts-loading-overlay',
  styleUrls: ['./loading-overlay.component.scss'],
  template: `
    <md-spinner mode="indeterminate"></md-spinner>
  `,
})
export class TsLoadingOverlayComponent {
}
