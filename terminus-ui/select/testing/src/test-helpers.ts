import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { MatChip } from '@angular/material/chips';
import { By } from '@angular/platform-browser';
import { KeyCode } from '@terminus/ngx-tools/keycodes';
import {
  TsOptgroupComponent,
  TsOptionComponent,
} from '@terminus/ui/option';
import { TsSelectComponent } from '@terminus/ui/select';


/**
 * Create a mock keydown event
 *
 * @param key - The key that should be pressed
 * @param keyCode - The corresponding keyCode
 * @return The KeyboardEvent
 */
export function createKeydownEvent(key: KeyCode): KeyboardEvent {
  const event = document.createEvent('KeyboardEvent');
  event.initEvent('keydown', true, false);
  Object.defineProperties(event, {
    key: {get: () => key.code},
    code: {get: () => key.code},
    keyCode: {get: () => key.keyCode},
  });
  return event;
}

/**
 * Get an array of all DebugElements for TsSelectComponents
 *
 * @param fixture - The component fixture
 * @return An array of DebugElements
 */
// tslint:disable-next-line no-any
export function getAllSelectDebugElements(fixture: ComponentFixture<any>): DebugElement[] {
  const debugElements = fixture.debugElement.queryAll(By.css('ts-select'));
  if (!debugElements) {
    throw new Error(`'getAllSelectInstances' did not find any debug elements`);
  }
  return debugElements;
}

/**
 * Get an array of all component instances for TsSelectComponents
 *
 * @param fixture - The component fixture
 * @return An array of TsSelectComponents
 */
// tslint:disable-next-line no-any
export function getAllSelectInstances(fixture: ComponentFixture<any>): TsSelectComponent[] {
  return getAllSelectDebugElements(fixture).map(v => v.componentInstance);
}

/**
 * Get the DebugElement for a TsSelectComponent
 *
 * @param fixture - The component fixture
 * @param index - The index of the desired TsSelectComponent
 * @return The DebugElement
 */
// tslint:disable-next-line no-any
export function getSelectDebugElement(fixture: ComponentFixture<any>, index = 0): DebugElement {
  const debugElements = getAllSelectDebugElements(fixture);
  if (!debugElements[index]) {
    throw new Error(`'getSelectDebugElement' did not find a debug element at index '${index}'`);
  }
  return debugElements[index];
}

/**
 * Get the component instance for a TsSelectComponent
 *
 * @param fixture - The component fixture
 * @param index - The index of the desired TsSelectComponent
 * @return The instance
 */
// tslint:disable-next-line no-any
export function getSelectInstance(fixture: ComponentFixture<any>, index = 0): TsSelectComponent {
  const instances = getAllSelectInstances(fixture);
  if (!instances[index]) {
    throw new Error(`'getSelectInstance' did not find an instance at index '${index}'`);
  }
  return instances[index];
}

/**
 * Get the element for a TsSelectComponent
 *
 * @param fixture - The component fixture
 * @param index - The index of the desired TsSelectComponent
 * @return The element
 */
// tslint:disable-next-line no-any
export function getSelectElement(fixture: ComponentFixture<any>, index = 0): HTMLElement {
  const instance = getSelectInstance(fixture, index);
  // eslint-disable-next-line dot-notation
  return instance['elementRef'].nativeElement as HTMLElement;
}

/**
 * Get the trigger element for a TsSelectComponent
 *
 * @param fixture - The component fixture
 * @param index - The index of the desired TsSelectComponent
 * @return The element
 */
// tslint:disable-next-line no-any
export function getSelectTriggerElement(fixture: ComponentFixture<any>, index = 0): HTMLElement {
  const debugElement = getSelectDebugElement(fixture, index);
  return debugElement.query(By.css('.ts-select-trigger')).nativeElement as HTMLElement;
}

/**
 * Get the trigger element for a TsSelectComponent
 *
 * @param fixture - The component fixture
 * @param index - The index of the desired TsSelectComponent
 * @return The trigger element
 */
// tslint:disable-next-line no-any
export function getToggleAllElement(fixture: ComponentFixture<any>, index = 0): HTMLElement {
  const debugElement = getSelectDebugElement(fixture, index);
  return debugElement.query(By.css('.ts-select-panel__toggle-all')).nativeElement as HTMLElement;
}

/**
 * Get the panel element for a TsSelectComponent
 *
 * @param fixture - The component fixture
 * @param index - The index of the desired TsSelectComponent
 * @return The panel element
 */
// tslint:disable-next-line no-any
export function getPanelElement(fixture: ComponentFixture<any>, index = 0): HTMLElement {
  const debugElement = getSelectDebugElement(fixture, index);
  return debugElement.query(By.css('.ts-select-panel')).nativeElement as HTMLElement;
}

/**
 * Get all TsOptionComponent instances for a TsSelectComponent
 *
 * @param fixture - The component fixture
 * @param index - The index of the desired TsSelectComponent
 * @return An array of TsOptionComponents
 */
// tslint:disable-next-line no-any
export function getAllOptionInstances(fixture: ComponentFixture<any>, index = 0): TsOptionComponent[] {
  const instance = getSelectInstance(fixture, index);
  const options = instance.options.toArray();
  if (options.length < 1) {
    throw new Error(`'getAllOptionInstances' found no options.`);
  }
  return options;
}

/**
 * Get a specific TsOptionComponent instance for a TsSelectComponent
 *
 * @param fixture - The component fixture
 * @param selectIndex - The index of the desired TsSelectComponent
 * @param optionIndex - The index of the desired TsOptionComponent
 * @return A TsOptionComponent
 */
// tslint:disable-next-line no-any
export function getOptionInstance(fixture: ComponentFixture<any>, selectIndex = 0, optionIndex = 0): TsOptionComponent {
  const options = getAllOptionInstances(fixture, selectIndex);
  if (!options[optionIndex]) {
    throw new Error(`'getOptionInstance' did not find an option at index '${optionIndex}' from the select at index '${selectIndex}'`);
  }
  return options[optionIndex];
}

/**
 * Get the element of a TsOptionComponent instance for a TsSelectComponent
 *
 * @param fixture - The component fixture
 * @param selectIndex - The index of the desired TsSelectComponent
 * @param optionIndex - The index of the desired TsOptionComponent
 * @return The TsOptionComponent element
 */
// tslint:disable-next-line no-any
export function getOptionElement(fixture: ComponentFixture<any>, selectIndex = 0, optionIndex = 0): HTMLElement {
  const option = getOptionInstance(fixture, selectIndex, optionIndex);
  return option.elementRef.nativeElement;
}

/**
 * Get an array of all TsOptgroupComponent
 *
 * @param fixture - The component fixture
 * @param index - The index of the desired TsSelectComponent
 * @return An array of TsOptionComponents
 */
// tslint:disable-next-line no-any
export function getAllOptgroups(fixture: ComponentFixture<any>, index = 0): TsOptgroupComponent[] {
  const debugElement = getSelectDebugElement(fixture, index);
  const optgroups = debugElement.queryAll(By.css('ts-select-optgroup'));
  if (!optgroups) {
    throw new Error(`'getAllOptgroups' did not find any optgroups`);
  }
  return optgroups.map(i => i.componentInstance);
}

/**
 * Get a specific TsOptgroupComponent
 *
 * @param fixture - The component fixture
 * @param selectIndex - The index of the desired TsSelectComponent
 * @param groupIndex - The index of the desired TsOptgroupComponent
 * @return A TsOptgroupComponent
 */
// tslint:disable-next-line no-any
export function getOptgroup(fixture: ComponentFixture<any>, selectIndex = 0, groupIndex = 0): TsOptgroupComponent {
  const groups = getAllOptgroups(fixture, selectIndex);
  if (!groups[groupIndex]) {
    throw new Error(`'getOptgroup' did not find an optgroup at index '${groupIndex}'`);
  }
  return groups[groupIndex];
}

/**
 * Get the element for a TsOptgroupComponent
 *
 * @param fixture - The component fixture
 * @param selectIndex - The index of the desired TsSelectComponent
 * @param groupIndex - The index of the desired TsOptgroupComponent
 * @return The optgroup element
 */
// tslint:disable-next-line no-any
export function getOptgroupElement(fixture: ComponentFixture<any>, selectIndex = 0, groupIndex = 0): HTMLElement {
  const group = getOptgroup(fixture, selectIndex, groupIndex);
  // eslint-disable-next-line dot-notation
  return group['elementRef'].nativeElement;
}

/**
 * Get the element for the filter input for a TsSelectComponent
 *
 * @param fixture - The component fixture
 * @param index - The index of the desired TsSelectComponent
 * @return The filter input element
 */
// tslint:disable-next-line no-any
export function getFilterInputElement(fixture: ComponentFixture<any>, index = 0): HTMLInputElement {
  const debugElement = getSelectDebugElement(fixture, index);
  const inputDebugElement = debugElement.query(By.css('.ts-select-panel__filter-input .c-input__text'));
  if (!inputDebugElement) {
    throw new Error(`'getFilterInputElement' did not find the filter input`);
  }
  return inputDebugElement.nativeElement as HTMLInputElement;
}

/**
 * Open a select element
 *
 * @param fixture - The component fixture
 * @param index - The index of the desired TsSelectComponent
 * @return The whenStable promise
 */
// tslint:disable-next-line no-any
export function openSelect(fixture: ComponentFixture<any>, index = 0): Promise<any> {
  const trigger = getSelectTriggerElement(fixture, index);
  trigger.click();
  fixture.detectChanges();
  return fixture.whenStable();
}

/**
 * Select an option
 *
 * @param fixture - The component fixture
 * @param optionText - The text to find the option by
 * @param selectIndex - The index of the desired TsSelectComponent
 * @return The whenStable promise
 */
// tslint:disable-next-line no-any
export function selectOption(fixture: ComponentFixture<any>, optionText: string, selectIndex = 0): Promise<any> {
  const allOptions = getAllOptionInstances(fixture, selectIndex);
  const foundOptions = allOptions.filter(option => option.viewValue === optionText);

  if (foundOptions.length < 1) {
    throw new Error(`'selectOption' did not find an option with the view value of '${optionText}'`);
  }

  foundOptions[0].select();
  fixture.detectChanges();
  return fixture.whenStable();
}
