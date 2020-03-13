import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TsCohortDateRangeComponent } from '@terminus/ui/cohort-date-range';

import { TsCohortDateRangeTestComponent } from './test-components';

/* eslint-disable max-len */

/**
 * Get TsFormFieldComponent
 *
 * @param fixture - The component fixture
 * @returns DebugElement
 */
export const getFormFieldElement =
  (fixture: ComponentFixture<TsCohortDateRangeTestComponent>): HTMLElement => fixture.debugElement.query(By.css('.ts-form-field')).nativeElement;

/**
 * Get the DebugElement for a TsCohortDateRangeComponent
 *
 * @param fixture - The component fixture
 * @returns The DebugElement
 */
export const getCohortDebugElement =
  (fixture: ComponentFixture<TsCohortDateRangeTestComponent>): DebugElement => fixture.debugElement.query(By.directive(TsCohortDateRangeComponent));

/**
 * Get the trigger element for a {@link TsSelectComponent} inside a {@link TsCohortDateRangeComponent}
 *
 * @param fixture - The component fixture
 * @returns The element
 */
export const getSelectTriggerElement =
  (fixture: ComponentFixture<TsCohortDateRangeTestComponent>): HTMLElement => fixture.debugElement.query(By.css('.ts-select-trigger')).nativeElement as HTMLElement;

