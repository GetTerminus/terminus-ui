import {
  DebugElement,
  Provider,
  Type,
} from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { createComponent as createComponentInner } from '@terminus/ngx-tools/testing';
import * as testComponents from '@terminus/ui/cohort-date-range/testing';
// eslint-disable-next-line no-duplicate-imports
import {
  getCohortDebugElement,
  getFormFieldElement,
  TsCohortDateRangeTestComponent,
} from '@terminus/ui/cohort-date-range/testing';
import { TsDateRangeModule } from '@terminus/ui/date-range';
import { getRangeInputInstances } from '@terminus/ui/date-range/testing';
import { TsInputComponent } from '@terminus/ui/input';
import { TsSelectionListChange } from '@terminus/ui/selection-list';

import {
  TsCohortDateRangeComponent,
  TsCohortDateRangeModule,
} from './cohort-date-range.module';


function createComponent<T>(component: Type<T>, providers: Provider[] = [], imports: any[] = []): ComponentFixture<T> {
  return createComponentInner<T>(component,
    providers,
    [
      ReactiveFormsModule,
      TsDateRangeModule,
      TsCohortDateRangeModule,
      ...imports,
    ]);
}

describe(`TsCohortDateRangeComponent`, () => {
  let fixture: ComponentFixture<TsCohortDateRangeTestComponent>;
  let hostInstance: TsCohortDateRangeTestComponent;
  let startInputInstance: TsInputComponent;
  let endInputInstance: TsInputComponent;
  let formFieldElement: HTMLElement;
  let cohortDebugElement: DebugElement;
  let cohortInstance: TsCohortDateRangeComponent;

  function setupComponent(component) {
    fixture = createComponent(component);
    fixture.detectChanges();
    hostInstance = fixture.componentInstance;
    startInputInstance = getRangeInputInstances(fixture)[0];
    endInputInstance = getRangeInputInstances(fixture)[1];
    formFieldElement = getFormFieldElement(fixture);
    cohortDebugElement = getCohortDebugElement(fixture);
    cohortInstance = cohortDebugElement.componentInstance;
  }

  describe(`id`, () => {

    test(`should allow custom ID and fall back to UID`, () => {
      setupComponent(testComponents.Basic);
      const debug = getCohortDebugElement(fixture);
      const instance: TsCohortDateRangeComponent = debug.componentInstance;
      instance.id = 'foo';
      fixture.detectChanges();

      expect(document.getElementById('foo')).toBeTruthy();
      expect(instance.id).toEqual('foo');
      instance.id = undefined as any;
      fixture.detectChanges();
      expect(document.getElementById('foo')).toBeFalsy();
      expect(instance.id).toEqual(expect.stringContaining('ts-cohort-date-range-'));
    });

  });

  describe(`allowCustomDates`, () => {
    beforeEach(() => {
      setupComponent(testComponents.Basic);
    });

    test(`should have date range readonly if false`, () => {
      hostInstance.allowCustomDates = false;
      fixture.detectChanges();
      expect(formFieldElement.classList).toContain('ts-form-field--disabled');
      expect(startInputInstance.isDisabled).toBeTruthy();
    });

    test(`should not disabled date range if allowCustomsDate is true`, () => {
      hostInstance.allowCustomDates = true;
      fixture.detectChanges();
      expect(formFieldElement.classList).not.toContain('ts-form-field--disabled');
      expect(startInputInstance.isDisabled).toBeFalsy();
    });
  });

  describe(`updateSelectOnRangeChange`, () => {

    test(`should do nothing if no cohorts exist`, () => {
      setupComponent(testComponents.NoCohorts);
      fixture.detectChanges();
      const debug = getCohortDebugElement(fixture);
      const instance: TsCohortDateRangeComponent = debug.componentInstance;
      instance.cohortControl.setValue = jest.fn();

      instance.dateRangeFormGroup.setValue({
        startDate: new Date(),
        endDate: new Date(),
      });
      fixture.detectChanges();

      expect(instance.cohortControl.setValue).not.toHaveBeenCalled();
    });

    test(`should update the select to the custom cohort when the range is manually changed`, () => {
      setupComponent(testComponents.Basic);
      const debug = getCohortDebugElement(fixture);
      const instance: TsCohortDateRangeComponent = debug.componentInstance;
      instance.dateRangeFormGroup.patchValue({ startDate: new Date() });
      fixture.detectChanges();
      const trigger = document.querySelector('.ts-selection-list__custom-trigger');

      if (trigger) {
        expect((trigger as HTMLInputElement).value).toEqual('Custom Dates');
      } else {
        throw new Error('Trigger not found');
      }
    });

    test(`should not update the select when the range is manually changed to a cohort range`, () => {
      const date1 = new Date(2018, 1, 1);
      const date2 = new Date(2018, 2, 1);
      setupComponent(testComponents.Basic);
      const debug = getCohortDebugElement(fixture);
      const instance: TsCohortDateRangeComponent = debug.componentInstance;
      instance.cohortControl.setValue = jest.fn();
      instance.dateRangeFormGroup.patchValue({
        startDate: date1,
        endDate: date2,
      });
      fixture.detectChanges();

      expect(instance.cohortControl.setValue).not.toHaveBeenCalled();
    });

  });

  describe(`cohorts`, () => {

    test(`should set the active cohort by default`, () => {
      setupComponent(testComponents.DefaultCohort);
      fixture.detectChanges();
      const debug = getCohortDebugElement(fixture);
      const instance: TsCohortDateRangeComponent = debug.componentInstance;
      const range = instance.dateRangeFormGroup.value;
      const year = new Date(range.startDate).getFullYear();

      expect(year).toEqual(2019);
    });

    test(`should not add the custom cohort if custom dates are not allowed`, () => {
      setupComponent(testComponents.NoCustomDates);
      fixture.detectChanges();
      const debug = getCohortDebugElement(fixture);
      const instance: TsCohortDateRangeComponent = debug.componentInstance;
      expect(instance.cohorts.length).toEqual(1);
    });

    test(`should add the custom cohort to the end if allowUserInput is true`, () => {
      setupComponent(testComponents.Basic);
      fixture.detectChanges();
      const debug = getCohortDebugElement(fixture);
      const instance: TsCohortDateRangeComponent = debug.componentInstance;

      expect(instance.cohorts.length).toEqual(2);
      expect(instance.cohorts[1]).toEqual(expect.objectContaining({ display: 'Custom Dates' }));
    });

  });

  describe(`select emitters`, function() {

    test(`should emit change event if date range has any changes`, () => {
      setupComponent(testComponents.Basic);
      cohortInstance.cohortDateRangeChanged.emit = jest.fn();
      const dates = {
        start: '',
        end: '',
        source: cohortInstance,
      };
      cohortInstance.cohortDateRangeChange(dates);
      fixture.detectChanges();
      expect(cohortInstance.cohortDateRangeChanged.emit).toHaveBeenCalledWith(dates);
    });
  });

  describe(`selectionChange`, () => {

    test(`should set the date range if the cohort selection changes`, () => {
      setupComponent(testComponents.DefaultCohort);
      fixture.detectChanges();
      const debug = getCohortDebugElement(fixture);
      const instance: TsCohortDateRangeComponent = debug.componentInstance;
      instance.setDateRangeValues = jest.fn();

      const cohort = {
        display: 'foo',
        range: {
          start: new Date(),
          end: new Date(),
        },
      };
      const fakeEvent = new TsSelectionListChange({} as any, [cohort]);
      instance.selectionChange(fakeEvent as any);

      expect(instance.setDateRangeValues).toHaveBeenCalled();
    });
  });

  describe.only(`date constraints`, function() {
    beforeEach(() => {
      setupComponent(testComponents.DateConstraints);
    });

    test(`should set end min date to provided value`, function() {
      expect(endInputInstance.minDate).toEqual(new Date(2020, 2, 1));
    });

    test(`should set end max date to provided value`, function() {
      expect(endInputInstance.maxDate).toEqual(new Date(2020, 2, 25));
    });

    test(`should set start min date to provided value`, function() {
      expect(startInputInstance.minDate).toEqual(new Date(2020, 0, 1));
    });

    test(`should set start max date to provided value`, function() {
      expect(startInputInstance.maxDate).toEqual(new Date(2020, 0, 25));
    });
  });
});
