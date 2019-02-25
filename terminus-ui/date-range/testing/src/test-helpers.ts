import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DebugElement } from '@angular/core';
import { TsInputComponent } from '@terminus/ui/input';
import { TsDateRangeComponent } from '@terminus/ui/date-range';


/**
 * Get an array of all TsDateRangeComponent debug elements
 *
 * @param fixture - The component fixture
 * @return The array of DebugElements
 */
export function getAllDateRangeDebugElements(fixture: ComponentFixture<any>): DebugElement[] {
  const debugElements = fixture.debugElement.queryAll(By.css('ts-date-range'));
  if (!debugElements || debugElements.length < 1) {
    throw new Error(`'getAllDateRangeInstances' found no date range instances`);
  }
  return debugElements;
}

/**
 * Get all TsDateRangeComponent instances
 *
 * @param fixture - The component fixture
 * @return The array of TsDateRangeComponent instances
 */
export function getAllDateRangeInstances(fixture: ComponentFixture<any>): TsDateRangeComponent[] {
  return getAllDateRangeDebugElements(fixture).map((i) => i.componentInstance);
}

/**
 * Get an array of debug elements for TsInputComponents within a single TsDateRangeComponent
 *
 * @param fixture - The component fixture
 * @param index - The index of the TsDateRangeComponent
 * @return The array of DebugElements
 */
export function getDateRangeInputDebugElements(fixture: ComponentFixture<any>, index = 0): DebugElement[] {
  const debugElement = getAllDateRangeDebugElements(fixture)[index];
  if (!debugElement) {
    throw new Error(`'getDebugRangeInputs' found no debug element at '${index}'`);
  }
  return debugElement.queryAll(By.css('ts-input'));
}

/**
 * Get an array of TsInputComponent instances for a single TsDateRangeComponent
 *
 * @param fixture - The component fixture
 * @param index - The index of the TsDateRangeComponent
 * @return The array of TsInputComponent instances
 */
export function getRangeInputInstances(fixture: ComponentFixture<any>, index = 0): TsInputComponent[] {
  return getDateRangeInputDebugElements(fixture, index).map((v) => v.componentInstance);
}

/**
 * Get an array of HTMLInputElements for a single TsDateRangeComponent
 *
 * @param fixture - The component fixture
 * @param index - The index of the TsDateRangeComponent
 * @return The array of TsInputComponent instances
 */
export function getRangeInputElements(fixture: ComponentFixture<any>, index = 0): HTMLInputElement[] {
  return getDateRangeInputDebugElements(fixture, index).map((v) => v.componentInstance.inputElement.nativeElement);
}

/**
 * Create a date range form group with required controls
 *
 * @param startDate - The initial start date
 * @param endDate - The initial end date
 * @return The FormGroup
 */
export function createDateRangeGroup(startDate: null | Date = null, endDate: null | Date = null): FormGroup {
  const formBuilder = new FormBuilder();

  return formBuilder.group({
    startDate: [
      startDate,
      [Validators.required],
    ],
    endDate: [
      endDate,
      [Validators.required],
    ],
  });
}


/**
 * Set values for both date range inputs
 *
 * @param fixture - The component fixture
 * @param startDate - The date to set the start input
 * @param endDate - The date to set the end input
 * @param index - The select instance
 * @return The whenStable promise
 */
export function setDateRangeValues(fixture: ComponentFixture<any>, startDate: Date, endDate: Date, index = 0): Promise<any> {
  const [startElement, endElement] = getRangeInputElements(fixture, index);

  // Set input values
  startElement.value = startDate.toISOString();
  endElement.value = endDate.toISOString();

  // Create events
  const startEvent = document.createEvent('KeyboardEvent');
  startEvent.initEvent('input', true, false);
  const endEvent = document.createEvent('KeyboardEvent');
  endEvent.initEvent('input', true, false);

  // Dispatch Events
  startElement.dispatchEvent(startEvent);
  endElement.dispatchEvent(endEvent);

  fixture.detectChanges();
  return fixture.whenStable();
}
