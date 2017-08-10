import { Component } from '@angular/core';

import { TsWindowService } from '@terminus/ui';

@Component({
  selector: 'demo-window-service',
  template: `
    Window innerHeight: {{ window?.innerHeight}}
    <br>
    Window innerWidth: {{ window?.innerWidth}}
  `,
})
export class WindowServiceComponent {
  public window: any;

  constructor(
    private windowService: TsWindowService,
  ) {
    this.window = this.windowService.nativeWindow;
  }
}
