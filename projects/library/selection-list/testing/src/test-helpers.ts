import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  TsOptgroupComponent,
  TsOptionComponent,
} from '@terminus/ui/option';
import {
  TsSelectionListComponent,
  TsSelectionListTriggerDirective,
} from '@terminus/ui/selection-list';
import { TsUILibraryError } from '@terminus/ui/utilities';

/**
 * Get the DebugElement for a {@link TsSelectionListComponent}
 *
 * @param fixture - The component fixture
 * @param index - The index of the desired
 * @returns The DebugElement
 */
export function getSelectionListDebugElement(fixture: ComponentFixture<any>, index = 0): DebugElement {
  const debugElements = getAllSelectionListDebugElements(fixture);
  if (!debugElements[index]) {
    throw new TsUILibraryError(`'getSelectionListDebugElement' did not find a debug element at index '${index}'`);
  }
  return debugElements[index];
}

/**
 * Get the input element for a {@link TsSelectionListComponent}
 *
 * @param fixture - The component fixture
 * @param index - The index of the desired TsSelectionListComponent
 * @returns The input element
 */
export function getSelectionListInput(fixture: ComponentFixture<any>, index = 0): HTMLInputElement {
  const debugElement = getSelectionListDebugElement(fixture, index);
  const inputDebugElement = debugElement.query(By.css('.ts-selection-list__input'));
  if (!inputDebugElement) {
    throw new TsUILibraryError(`'getSelectionListInput' did not find an input at index '${index}'`);
  }
  return inputDebugElement.nativeElement as HTMLInputElement;
}

/**
 * Get an array of all DebugElements for {@link TsSelectionListComponent}
 *
 * @param fixture - The component fixture
 * @returns An array of DebugElements
 */
export function getAllSelectionListDebugElements(fixture: ComponentFixture<any>): DebugElement[] {
  const debugElements = fixture.debugElement.queryAll(By.css('ts-selection-list'));
  if (!debugElements) {
    throw new TsUILibraryError(`'getAllSelectionListDebugElements' did not find any debug elements`);
  }
  return debugElements;
}

/**
 * Get an array of all component instances for {@link TsSelectionListComponent}
 *
 * NOTE: Importing {@link TsSelectionListComponent} into this file was causing ng-packagr build to fail. Casting to any for now.
 *
 * @param fixture - The component fixture
 * @returns An array of TsSelectionListComponent
 */
export const getAllSelectionListInstances =
  (fixture: ComponentFixture<any>): TsSelectionListComponent[] => getAllSelectionListDebugElements(fixture).map(v => v.componentInstance);

/**
 * Get a component instances for {@link TsSelectionListComponent}
 *
 * NOTE: Importing TsSelectionListComponent into this file was causing ng-packagr build to fail. Casting to any for now.
 *
 * @param fixture - The component fixture
 * @param index - The index of the desired TsSelectionListComponent
 * @returns The instance
 */
export function getSelectionListInstance(fixture: ComponentFixture<any>, index = 0): TsSelectionListComponent {
  const instances = getAllSelectionListInstances(fixture);
  if (!instances[index]) {
    throw new TsUILibraryError(`'getSelectionListInstance' did not find an instance at index '${index}'`);
  }
  return instances[index];
}

/**
 * Get the element for a {@link TsSelectionListComponent}
 *
 * @param fixture - The component fixture
 * @param index - The index of the desired TsSelectionListComponent
 * @returns The element
 */
export function getSelectionListElement(fixture: ComponentFixture<any>, index = 0): HTMLElement {
  const instance = getSelectionListInstance(fixture, index);
  return instance.elementRef.nativeElement as HTMLElement;
}

/**
 * Get the trigger element for a {@link TsSelectionListComponent}
 *
 * @param fixture - The component fixture
 * @param index - The index of the desired TsSelectionListComponent
 * @returns The element
 */
export function getSelectionListTriggerElement(fixture: ComponentFixture<any>, index = 0): HTMLElement {
  const debugElement = getSelectionListDebugElement(fixture, index);
  return debugElement.query(By.directive(TsSelectionListTriggerDirective)).nativeElement;
}

/**
 * Get all TsOptionComponent instances for a {@link TsSelectionListComponent}
 *
 * @param fixture - The component fixture
 * @param index - The index of the desired TsSelectionListComponent
 * @returns An array of TsOptionComponent
 */
export function getAllOptionInstances(fixture: ComponentFixture<any>, index = 0): TsOptionComponent[] {
  const instance = getSelectionListInstance(fixture, index);
  const options = instance.options.toArray();
  if (options.length < 1) {
    throw new TsUILibraryError(`'getAllOptionInstances' found no options.`);
  }
  return options;
}

/**
 * Get a specific TsOptionComponent instance for a {@link TsSelectionListComponent}
 *
 * @param fixture - The component fixture
 * @param selectIndex - The index of the desired TsSelectionListComponent
 * @param optionIndex - The index of the desired TsOptionComponent
 * @returns A TsOptionComponent
 */
export function getOptionInstance(fixture: ComponentFixture<any>, selectIndex = 0, optionIndex = 0): TsOptionComponent {
  const options = getAllOptionInstances(fixture, selectIndex);
  if (!options[optionIndex]) {
    throw new TsUILibraryError(`'getOptionInstance' did not find an option at index '${optionIndex}' from the selection list`
      + ` at index '${selectIndex}'`);
  }
  return options[optionIndex];
}

/**
 * Get the element of a TsOptionComponent instance for a {@link TsSelectionListComponent}
 *
 * @param fixture - The component fixture
 * @param selectIndex - The index of the desired TsSelectionListComponent
 * @param optionIndex - The index of the desired TsOptionComponent
 * @returns The TsOptionComponent element
 */
export function getOptionElement(fixture: ComponentFixture<any>, selectIndex = 0, optionIndex = 0): HTMLElement {
  const option = getOptionInstance(fixture, selectIndex, optionIndex);
  return option.elementRef.nativeElement;
}

/**
 * Get an array of all {@link TsOptgroupComponent}s
 *
 * TODO: Deprecate and move to TsOption test helpers file
 *
 * @param fixture - The component fixture
 * @param index - The index of the desired TsSelectionListComponent
 * @returns An array of TsOptionComponent
 */
export function getAllOptgroups(fixture: ComponentFixture<any>, index = 0): TsOptgroupComponent[] {
  const debugElement = getSelectionListDebugElement(fixture, index);
  const optgroups = debugElement.queryAll(By.css('ts-select-optgroup'));
  if (!optgroups) {
    throw new TsUILibraryError(`'getAllOptgroups' did not find any optgroups`);
  }
  return optgroups.map(i => i.componentInstance);
}

/**
 * Get a specific {@link TsOptgroupComponent}
 *
 * TODO: Deprecate and move to TsOption test helpers file
 *
 * @param fixture - The component fixture
 * @param selectIndex - The index of the desired TsSelectionListComponent
 * @param groupIndex - The index of the desired TsOptgroupComponent
 * @returns A TsOptgroupComponent
 */
export function getOptgroup(fixture: ComponentFixture<any>, selectIndex = 0, groupIndex = 0): TsOptgroupComponent {
  const groups = getAllOptgroups(fixture, selectIndex);
  if (!groups[groupIndex]) {
    throw new TsUILibraryError(`'getOptgroup' did not find an optgroup at index '${groupIndex}'`);
  }
  return groups[groupIndex];
}

/**
 * Get the element for a {@link TsOptgroupComponent}
 *
 * TODO: Deprecate and move to TsOption test helpers file
 *
 * @param fixture - The component fixture
 * @param selectIndex - The index of the desired TsSelectionListComponent
 * @param groupIndex - The index of the desired TsOptgroupComponent
 * @returns The optgroup element
 */
export function getOptgroupElement(fixture: ComponentFixture<any>, selectIndex = 0, groupIndex = 0): HTMLElement {
  const group = getOptgroup(fixture, selectIndex, groupIndex);
  return group.elementRef.nativeElement;
}

/**
 * Open the panel
 *
 * @param fixture - The component fixture
 * @param index - The index of the desired TsSelectionListComponent
 * @returns The whenStable promise
 */
export function openSelectionList(fixture: ComponentFixture<any>, index = 0): Promise<any> {
  const trigger = getSelectionListTriggerElement(fixture, index);
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
 * @returns The whenStable promise
 */
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
