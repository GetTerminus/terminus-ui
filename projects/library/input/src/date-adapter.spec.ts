import { Component } from '@angular/core';
import { createComponent } from '@terminus/ngx-tools/testing';

import { TsDateAdapter } from './date-adapter';

describe(`TsDateAdapter`, () => {
  describe(`format`, () => {
    test(`should format as dashed string`, () => {
      const fixture = createComponent(DemoComponent, [TsDateAdapter], []);
      fixture.detectChanges();

      expect(fixture.componentInstance.setDate()).toEqual('02-01-2018');
    });
  });
});

@Component({ template: `` })
class DemoComponent {
  constructor(
    public dateAdapter: TsDateAdapter,
  ) {}

  setDate(type = 'input') {
    return this.dateAdapter.format(new Date(2018, 1, 1), type);
  }
}
