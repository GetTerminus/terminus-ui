import {
  Component,
  Provider,
  Type,
} from '@angular/core';
import {
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { getSelectInstance } from '@terminus/ui/select/testing';

import {
  allOptionsAreSelected,
  getOptionScrollPosition,
  someOptionsAreSelected,
  toggleAllOptions,
} from './option-utilities';
import { TsSelectModule } from '../select.module';


// tslint:disable: no-use-before-declare


describe(`selectOptionUtilities`, function() {

  describe(`getOptionScrollPosition`, () => {

    test(`should return correct amount when scrolled out of view`, () => {
      const result = getOptionScrollPosition(
        12,
        50,
        400,
        100,
      );

      expect(result).toEqual(550);
    });

  });


  describe(`toggleAllOptions`, () => {

    test(`should return undefined if no options exist`, () => {
      const fixture = createComponent(EmptyQueryList);
      fixture.detectChanges();
      const instance = getSelectInstance(fixture);

      expect(toggleAllOptions(instance.options)).toEqual(undefined);
      expect(toggleAllOptions(undefined as any)).toEqual(undefined);
    });

  });


  describe(`allOptionsAreSelected`, () => {

    test(`should do something`, () => {
      const fixture = createComponent(EmptyQueryList);
      fixture.detectChanges();
      const instance = getSelectInstance(fixture);

      expect(allOptionsAreSelected(instance.options)).toEqual(false);
      expect(allOptionsAreSelected(undefined as any)).toEqual(false);
    });

  });


  describe(`someOptionsAreSelected`, () => {

    test(`should do something`, () => {
      const fixture = createComponent(EmptyQueryList);
      fixture.detectChanges();
      const instance = getSelectInstance(fixture);

      expect(someOptionsAreSelected(instance.options)).toEqual(false);
      expect(someOptionsAreSelected(undefined as any)).toEqual(false);
    });

  });


});


// tslint:disable: component-class-suffix

@Component({
  template: `
    <ts-select [formControl]="myCtrl">
      <ts-select-option
        [value]="state.name"
        [option]="state"
        *ngFor="let state of items"
      >
        {{ state.name }}
      </ts-select-option>
    </ts-select>
  `,
})
export class EmptyQueryList {
  myCtrl = new FormControl();
  items = [];
}


/**
 * HELPERS
 */

export function createComponent<T>(component: Type<T>, providers: Provider[] = [], imports: any[] = []): ComponentFixture<T> {
  TestBed.configureTestingModule({
    imports: [
      ReactiveFormsModule,
      TsSelectModule,
      NoopAnimationsModule,
      ...imports,
    ],
    declarations: [component],
    providers: [
      ...providers,
    ],
  }).compileComponents();

  return TestBed.createComponent<T>(component);
}
