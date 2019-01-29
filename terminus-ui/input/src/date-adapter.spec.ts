// tslint:disable: no-use-before-declare
import {
  Component,
  OnInit,
  Provider,
  Type,
} from '@angular/core';
import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import { TsDateAdapter } from './date-adapter';


describe(`TsDateAdapter`, () => {

  describe(`format`, () => {

    test(`should format as dashed string`, () => {
      const fixture = createComponent(DemoComponent);
      fixture.detectChanges();

      expect(fixture.componentInstance.setDate()).toEqual('02-01-2018');
    });

  });

});




function createComponent<T>(component: Type<T>, providers: Provider[] = [], imports: any[] = []): ComponentFixture<T> {
  TestBed.configureTestingModule({
    imports: [
      ...imports,
    ],
    declarations: [component],
    providers: [
      TsDateAdapter,
      ...providers,
    ],
  }).compileComponents();

  return TestBed.createComponent<T>(component);
}


/**
 * TEMPLATES
 */


@Component({
  template: ``,
})
class DemoComponent implements OnInit {

  constructor(
    public dateAdapter: TsDateAdapter,
  ) {}

  setDate(type = 'input') {
    return this.dateAdapter.format(new Date(2018, 1, 1), type);
  }
}
