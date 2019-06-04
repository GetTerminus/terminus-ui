import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { MatChip } from '@angular/material/chips';
import { By } from '@angular/platform-browser';
import { TsAutocompleteComponent } from '@terminus/ui/autocomplete';
import {
  TsOptionComponent,
  TsOptgroupComponent,
} from '@terminus/ui/option';

/**
 * Get the DebugElement for a TsAutocompleteComponent
 *
 * @param fixture - The component fixture
 * @param index - The index of the desired TsAutocompleteComponent
 * @return The DebugElement
 */
export function getAutocompleteDebugElement(fixture: ComponentFixture<any>, index = 0): DebugElement {
  const debugElements = getAllAutocompleteDebugElements(fixture);
  if (!debugElements[index]) {
    throw new Error(`'getAutocompleteDebugElement' did not find a debug element at index '${index}'`);
  }
  return debugElements[index];
}

/**
 * Get the autocomplete input element for a TsAutocompleteComponent
 *
 * @param fixture - The component fixture
 * @param index - The index of the desired TsAutocompleteComponent
 * @return The input element
 *
 */
export function getAutocompleteInput(fixture: ComponentFixture<any>, index = 0): HTMLInputElement {
  const debugElement = getAutocompleteDebugElement(fixture, index);
  const inputDebugElement = debugElement.query(By.css('.ts-autocomplete__input'));
  if (!inputDebugElement) {
    throw new Error(`'getAutocompleteInput' did not find an input at index '${index}'`);
  }
  return inputDebugElement.nativeElement as HTMLInputElement;
}

/**
 * Get an array of all DebugElements for TsAutocompleteComponent
 *
 * @param fixture - The component fixture
 * @return An array of DebugElements
 */
export function getAllAutocompleteDebugElements(fixture: ComponentFixture<any>): DebugElement[] {
  const debugElements = fixture.debugElement.queryAll(By.css('ts-autocomplete'));
  if (!debugElements) {
    throw new Error(`'getAllAutocompleteInstances' did not find any debug elements`);
  }
  return debugElements;
}

/**
 * Get an array of all component instances for TsAutocompleteComponent
 *
 * @param fixture - The component fixture
 * @return An array of TsAutocompleteComponent
 */
export function getAllAutocompleteInstances(fixture: ComponentFixture<any>): TsAutocompleteComponent[] {
  return getAllAutocompleteDebugElements(fixture).map(v => v.componentInstance);
}

/**
 * Get a component instances for TsAutocompleteComponent
 *
 * @param fixture - The component fixture
 * @param index - The index of the desired TsAutocompleteComponent
 * @return The instance
 */
export function getAutocompleteInstance(fixture: ComponentFixture<any>, index = 0): TsAutocompleteComponent {
  const instances = getAllAutocompleteInstances(fixture);
  if (!instances[index]) {
    throw new Error(`'getAutocompleteInstance' did not find an instance at index '${index}'`);
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
export function getAutocompleteElement(fixture: ComponentFixture<any>, index = 0): HTMLElement {
  const instance = getAutocompleteInstance(fixture, index);
  return instance.elementRef.nativeElement as HTMLElement;
}

/**
 * Get an array of all chip instances for a TsSelectComponent
 *
 * @param fixture - The component fixture
 * @param index - The index of the desired TsSelectComponent
 * @return An array of chip instances
 */
export function getAllChipInstances(fixture: ComponentFixture<any>, index = 0): MatChip[] {
  const instance = getAutocompleteInstance(fixture, index);
  if (!instance.chipList) {
    throw new Error(`'getAllChipInstances' did not find a chips collection from the select at index '${index}'`);
  }
  return instance.chipList.chips.toArray();
}

/**
 * Get a specific chip instance for a TsSelectComponent
 *
 * @param fixture - The component fixture
 * @param selectIndex - The index of the desired TsSelectComponent
 * @param chipIndex - The index of the desired chip
 * @return A chip instances
 */
export function getChipInstance(fixture: ComponentFixture<any>, selectIndex = 0, chipIndex = 0): MatChip {
  const chips = getAllChipInstances(fixture, selectIndex);
  if (!chips[chipIndex]) {
    throw new Error(`'getChipInstance' did not find a chip at index '${chipIndex}'`);
  }
  return chips[chipIndex];
}

/**
 * Get the element for a specific chip instance for a TsSelectComponent
 *
 * @param fixture - The component fixture
 * @param selectIndex - The index of the desired TsSelectComponent
 * @param chipIndex - The index of the desired chip
 * @return The chip element
 */
export function getChipElement(fixture: ComponentFixture<any>, selectIndex = 0, chipIndex = 0): HTMLElement {
  const chip = getChipInstance(fixture, selectIndex, chipIndex);
  return chip._elementRef.nativeElement;
}

/**
 * Get the display value for a specific chip instance for a TsSelectComponent
 *
 * @param fixture - The component fixture
 * @param selectIndex - The index of the desired TsSelectComponent
 * @param chipIndex - The index of the desired chip
 * @return The chip element
 */
export function getChipElementDisplayValue(fixture: ComponentFixture<any>, selectIndex = 0, chipIndex = 0): string | null {
  const chipElement = getChipElement(fixture, selectIndex, chipIndex);
  // We need to remove the text that represents the chip's delete icon
  const chipTextContent = chipElement.textContent;
  if (chipTextContent) {
    return chipTextContent.replace(/cancel/g, '').trim();
  }
  return null;
}

/**
 * Get the trigger element for a TsAutocompleteComponent
 *
 * @param fixture - The component fixture
 * @param index - The index of the desired TsAutocompleteComponent
 * @return The element
 */
export function getAutocompleteTriggerElement(fixture: ComponentFixture<any>, index = 0): HTMLElement {
  const debugElement = getAutocompleteDebugElement(fixture, index);
  return debugElement.query(By.css('.ts-autocomplete-trigger')).nativeElement as HTMLElement;
}

/**
 * Get all TsOptionComponent instances for a TsSelectComponent
 *
 * @param fixture - The component fixture
 * @param index - The index of the desired TsSelectComponent
 * @return An array of TsOptionComponent
 */
export function getAllOptionInstances(fixture: ComponentFixture<any>, index = 0): TsOptionComponent[] {
  const instance = getAutocompleteInstance(fixture, index);
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
export function getOptionElement(fixture: ComponentFixture<any>, selectIndex = 0, optionIndex = 0): HTMLElement {
  const option = getOptionInstance(fixture, selectIndex, optionIndex);
  return option.elementRef.nativeElement;
}

/**
 * Get an array of all TsOptgroupComponents
 *
 * @param fixture - The component fixture
 * @param index - The index of the desired TsSelectComponent
 * @return An array of TsOptionComponent
 */
export function getAllOptgroups(fixture: ComponentFixture<any>, index = 0): TsOptgroupComponent[] {
  const debugElement = getAutocompleteDebugElement(fixture, index);
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
export function getOptgroupElement(fixture: ComponentFixture<any>, selectIndex = 0, groupIndex = 0): HTMLElement {
  const group = getOptgroup(fixture, selectIndex, groupIndex);
  return group.elementRef.nativeElement;
}
