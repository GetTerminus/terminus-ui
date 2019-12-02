import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TsCohortDateRangeComponent } from '@terminus/ui/cohort-date-range';

import { TsCohortDateRangeTestComponent } from './test-components';


/**
 * Get TsFormFieldComponent
 *
 * @param fixture - The component fixture
 * @return DebugElement
 */
export function getFormFieldElement(fixture: ComponentFixture<TsCohortDateRangeTestComponent>): HTMLElement {
  return fixture.debugElement.query(By.css('.ts-form-field')).nativeElement;
}

/**
 * Get the DebugElement for a TsCohortDateRangeComponent
 *
 * @param fixture - The component fixture
 * @return The DebugElement
 */
// tslint:disable-next-line no-any
export function getCohortDebugElement(fixture: ComponentFixture<TsCohortDateRangeTestComponent>): DebugElement {
  return fixture.debugElement.query(By.directive(TsCohortDateRangeComponent));
}

/**
 * Get the trigger element for a {@link TsSelectComponent} inside a {@link TsCohortDateRangeComponent}
 *
 * @param fixture - The component fixture
 * @return The element
 */
// tslint:disable-next-line no-any
export function getSelectTriggerElement(fixture: ComponentFixture<TsCohortDateRangeTestComponent>): HTMLElement {
  return fixture.debugElement.query(By.css('.ts-select-trigger')).nativeElement as HTMLElement;
}

