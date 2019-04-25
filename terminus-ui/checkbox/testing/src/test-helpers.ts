import {
  DebugElement, Predicate,
} from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TsCheckboxComponent } from '@terminus/ui/checkbox';


/**
 * Get all TsCheckboxComponent instances
 *
 * @param fixture - The component fixture
 * @return The array of TsCheckboxComponent instances
 */
export function getAllCheckboxInstances(fixture: ComponentFixture<any>): TsCheckboxComponent[] {
  const debugElements = fixture.debugElement.queryAll(By.css('ts-checkbox'));
  if (!debugElements) {
    throw new Error(`'getAllCheckboxInstances' found no checkboxes`);
  }
  return debugElements.map(i => i.componentInstance);
}

/**
 * Get a single TsCheckboxComponent instance
 *
 * @param fixture - The component fixture
 * @param index - The index of the checkbox to return
 * @return The TsCheckboxComponent instance
 */
export function getCheckboxInstance(fixture: ComponentFixture<any>, index = 0): TsCheckboxComponent {
  const all = getAllCheckboxInstances(fixture);
  if (!all[index]) {
    throw new Error(`'getCheckboxInstance' found no checkboxes at index '${index}'. ${all.length} were found.`);
  }
  return all[index];
}

/**
 * Get a single TsCheckboxComponent element
 *
 * @param fixture - The component fixture
 * @param index - The index of the checkbox to return
 * @return The TsCheckboxComponent element
 */
export function getCheckboxElement(fixture: ComponentFixture<any>, index = 0): HTMLElement {
  const debugElements = fixture.debugElement.queryAll(By.css('ts-checkbox'));
  if (!debugElements) {
    throw new Error(`'getCheckboxElement' found no checkboxes`);
  }
  if (!debugElements[index]) {
    throw new Error(`'getCheckboxElement' found no checkboxes at index '${index}'. ${debugElements.length} were found.`);
  }
  return debugElements[index].nativeElement as HTMLElement;
}

/**
 * Toggle a single checkbox
 *
 * @param fixture - The component fixture
 * @param index - The index of the checkbox to return
 * @return The Promise from fixture.whenStable
 */
export function toggleCheckbox(fixture: ComponentFixture<any>, index = 0): Promise<any> {
  const element = getCheckboxElement(fixture);
  const innerCheckbox: HTMLElement | null = element.querySelector('input');
  if (!innerCheckbox) {
    throw new Error(`'toggleCheckbox' found no inner checkbox`);
  }
  innerCheckbox.click();
  fixture.detectChanges();
  return fixture.whenStable();
}
