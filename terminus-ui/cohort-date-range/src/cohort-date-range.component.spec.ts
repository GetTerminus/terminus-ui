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
import { getRangeInputInstances } from '@terminus/ui/date-range/testing';

import { By } from '@angular/platform-browser';
import { KEYS } from '@terminus/ngx-tools';
import { TsDateRangeModule } from '@terminus/ui/date-range';
import { TsFormFieldComponent } from '@terminus/ui/form-field';
import {
  createKeydownEvent,
  getSelectTriggerElement,
} from '@terminus/ui/select/testing';
import {
  TsCohortDateRangeComponent,
  TsCohortDateRangeModule,
} from './cohort-date-range.module';

describe(`TsCohortDateRangeComponent`, () => {
  let fixture;
  let hostInstance;
  let startInputInstance;
  let formFieldElement;
  let cohortDebugElement;
  let cohortInstance;

  function setupComponent(component) {
    fixture = createComponent(component);
    fixture.detectChanges();
    hostInstance = getCohortComponentInstance(fixture);
    fixture.detectChanges();
    startInputInstance = getRangeInputInstances(fixture)[0];
    formFieldElement = getFormFieldElement(fixture);
    cohortDebugElement = getCohortDebugElement(fixture);
    cohortInstance = getCohortInstance(cohortDebugElement);
  }

  describe(`allowCustomsDate`, () => {
    beforeEach(() => {
      setupComponent(testComponents.Basic);
    });

    test(`should have date range readonly if allowCustomsDate is false`, () => {
      hostInstance.allowCustomDates = false;
      fixture.detectChanges();
      expect(formFieldElement.nativeElement.classList).toContain('ts-form-field--disabled');
      expect(startInputInstance.isDisabled).toBeTruthy();
    });

    test(`should not disabled date range if allowCustomsDate is true`, () => {
      hostInstance.allowCustomDates = true;
      fixture.detectChanges();
      expect(formFieldElement.nativeElement.classList).not.toContain('ts-form-field--disabled');
      expect(startInputInstance.isDisabled).toBeFalsy();
    });
  });

  describe(`select emitters`, function() {
    let trigger;
    let event;
    let element;

    beforeEach(() => {
      trigger = getSelectTriggerElement(fixture);
      event = createKeydownEvent(KEYS.DOWN_ARROW);
    });

    test(`should emit change event and set date range disabled when there is start/end date passed in`, () => {
      setupComponent(testComponents.Basic);
      cohortInstance.cohortDateRangeChange = jest.fn();
      trigger = getSelectTriggerElement(fixture);
      event = createKeydownEvent(KEYS.DOWN_ARROW);
      trigger.dispatchEvent(event);
      expect(cohortInstance.cohortDateRangeChange).toHaveBeenCalled();
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




/**
 * HELPERS
 */

export function createComponent<T>(component: Type<T>, providers: Provider[] = [], imports: any[] = []): ComponentFixture<T> {
  return createComponentInner<T>(component,
    providers,
    [
      ReactiveFormsModule,
      TsDateRangeModule,
      TsCohortDateRangeModule,
      ...imports,
    ]);
}

/**
 * Get TsCohortDateRangeComponent instance
 * @param fixture
 * @return TsCohortDateRangeComponent
 */
// tslint:disable-next-line no-any
export function getCohortComponentInstance(fixture: ComponentFixture<any>): TsCohortDateRangeComponent {
  return fixture.componentInstance;
}

/**
 * Get TsFormFieldComponent
 * @param fixture - The component fixture
 * @return TsFormFieldComponent
 */
export function getFormFieldElement(fixture): TsFormFieldComponent {
  return fixture.debugElement.query(By.css('.ts-form-field'));
}

/**
 * Get the DebugElement for a TsCohortDateRangeComponent
 *
 * @param fixture - The component fixture
 * @return The DebugElement
 */
export function getCohortDebugElement(fixture): DebugElement {
  return fixture.debugElement.query(By.directive(TsCohortDateRangeComponent));
}

/**
 * Get the DebugElement Instance
 *
 * @param fixture - The component fixture
 * @return The DebugElement instance
 */
export function getCohortInstance(cohortDebugElement): TsCohortDateRangeComponent {
  return cohortDebugElement.componentInstance;
}

