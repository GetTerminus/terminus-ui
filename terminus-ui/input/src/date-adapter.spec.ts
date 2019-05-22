// tslint:disable: no-use-before-declare
import {
  Component,
  OnInit,
} from '@angular/core';
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


/**
 * TEMPLATES
 */


@Component({template: ``})
class DemoComponent implements OnInit {

  constructor(
    public dateAdapter: TsDateAdapter,
  ) {}

  setDate(type = 'input') {
    return this.dateAdapter.format(new Date(2018, 1, 1), type);
  }
}
