import {
  DebugElement,
  Provider,
  Type,
} from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { KEYS } from '@terminus/ngx-tools';
import { createComponent as createComponentInner } from '@terminus/ngx-tools/testing';
import * as testComponents from '@terminus/ui/cohort-date-range/testing';
// eslint-disable-next-line no-duplicate-imports
import {
  getCohortDebugElement,
  getFormFieldElement,
  getSelectTriggerElement,
  TsCohortDateRangeTestComponent,
} from '@terminus/ui/cohort-date-range/testing';
import { TsDateRangeModule } from '@terminus/ui/date-range';
import { getRangeInputInstances } from '@terminus/ui/date-range/testing';
import { TsInputComponent } from '@terminus/ui/input';
import { createKeydownEvent } from '@terminus/ui/select/testing';

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
  let hostInstance;
  let startInputInstance: TsInputComponent;
  let formFieldElement: HTMLElement;
  let cohortDebugElement: DebugElement;
  let cohortInstance: TsCohortDateRangeComponent;

  function setupComponent(component) {
    fixture = createComponent(component);
    fixture.detectChanges();
    hostInstance = fixture.componentInstance;
    fixture.detectChanges();
    startInputInstance = getRangeInputInstances(fixture)[0];
    formFieldElement = getFormFieldElement(fixture);
    cohortDebugElement = getCohortDebugElement(fixture);
    cohortInstance = cohortDebugElement.componentInstance;
  }

  describe(`allowCustomsDate`, () => {
    beforeEach(() => {
      setupComponent(testComponents.Basic);
    });

    test(`should have date range readonly if allowCustomsDate is false`, () => {
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

  describe(`select emitters`, function() {
    let trigger: HTMLElement;
    let event: KeyboardEvent;

    beforeEach(() => {
      event = createKeydownEvent(KEYS.DOWN_ARROW);
    });

    test(`should emit change event and set date range disabled when there is start/end date passed in`, () => {
      setupComponent(testComponents.Basic);
      fixture.detectChanges();
      hostInstance.cohortDateRangeChanged = jest.fn();
      trigger = getSelectTriggerElement(fixture);
      event = createKeydownEvent(KEYS.DOWN_ARROW);
      trigger.dispatchEvent(event);
      fixture.detectChanges();

      expect(hostInstance.cohortDateRangeChanged).toHaveBeenCalled();
      expect(cohortInstance.disableDateRange).toBeTruthy();
    });

    test(`should not emit change event and set date range enabled when there is no start/end date passed in`, () => {
      setupComponent(testComponents.Standard);
      cohortInstance.cohortDateRangeChange = jest.fn();
      cohortInstance.disableDateRange = true;
      trigger = getSelectTriggerElement(fixture);
      event = createKeydownEvent(KEYS.DOWN_ARROW);
      trigger.dispatchEvent(event);

      expect(cohortInstance.cohortDateRangeChange).not.toHaveBeenCalled();
      expect(cohortInstance.disableDateRange).toBeFalsy();
    });

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

});
