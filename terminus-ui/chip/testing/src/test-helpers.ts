import { ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import {
  TsChipComponent,
  TsChipCollectionComponent,
} from '@terminus/ui/chip';
import { getAutocompleteInstance } from '@terminus/ui/autocomplete/testing';

/**
 * Get an array of all DebugElements for TsChipComponents
 *
 * @param fixture - The component fixture
 * @return An array of DebugElements
 */
export function getAllChipDebugElements(fixture: ComponentFixture<any>): DebugElement[] {
  return fixture.debugElement.queryAll(By.css('.ts-chip'));
}

/**
 * Get an array of all DebugElements for TsChipCollections
 *
 * @param fixture - The component fixture
 * @return An array of DebugElements
 */
export function getAllChipCollectionDebugElements(fixture: ComponentFixture<any>): DebugElement[] {
  return fixture.debugElement.queryAll(By.css('ts-chip-collection'));
}

/**
 * Get an array of all chip instances for a TsSelectComponent
 *
 * @param fixture - The component fixture
 * @param index - The index of the desired TsSelectComponent
 * @return An array of chip instances
 */
export function getAllChipInstances(fixture: ComponentFixture<any>, index = 0): TsChipComponent[] {
  const instance = getChipCollectionInstance(fixture, index);
  if (!instance.chips) {
    throw new Error(`'getAllChipInstances' did not find a chips collection from the select at index '${index}'`);
  }
  return instance.chips.toArray();
}

/**
 * Get a specific chip instance for a TsChipCollection
 *
 * @param fixture - The component fixture
 * @param selectIndex - The index of the desired TsChipCollection
 * @param chipIndex - The index of the desired chip
 * @return A chip instances
 */
export function getChipInstance(fixture: ComponentFixture<any>, selectIndex = 0, chipIndex = 0): TsChipComponent {
  const chips = getAllChipInstances(fixture, selectIndex);
  if (!chips[chipIndex]) {
    throw new Error(`'getChipInstance' did not find a chip at index '${chipIndex}'`);
  }
  return chips[chipIndex];
}


/**
 * Get an array of all TsChipCollectionComponent instances
 *
 * @param fixture - The component fixture
 * @return An array of TsChipCollectionComponent
 */
export function getAllChipCollectionInstances(fixture: ComponentFixture<any>): TsChipCollectionComponent[] {
  const debugElements = getAllChipCollectionDebugElements(fixture);
  if (debugElements.length < 1) {
    throw new Error(`getAllChipCollectionInstances did not find any instances`);
  }
  return debugElements.map(debugElement => debugElement.componentInstance);
}

/**
 * Get chip collection instance when lives inside an autocomplete component
 *
 * @param fixture - The component fixture
 * @return a chip collection instance
 */
export function getChipCollectionInstanceInAutocomplete(fixture: ComponentFixture<any>): TsChipCollectionComponent {
  const instance = getAutocompleteInstance(fixture);
  if (!instance.chipCollection) {
    throw new Error('no chip collection');
  }
  return instance.chipCollection;
}

/**
 * Get the DebugElement for a TsChipComponent
 *
 * @param fixture - The component fixture
 * @param index - The index of the desired TsChipComponent
 * @return The DebugElement
 */
export function getChipDebugElement(fixture: ComponentFixture<any>, index = 0): DebugElement {
  const all = getAllChipDebugElements(fixture);
  if (!all[index]) {
    throw new Error(`getChipDebugElement could not find a debug element at index '${index}'`);
  }
  return all[index];
}

/**
 * Get the DebugElement for a TsChipCollection
 *
 * @param fixture - The component fixture
 * @param index - The index of the desired TsChipCollection
 * @return The DebugElement
 */
export function getChipCollectionDebugElement(fixture: ComponentFixture<any>, index = 0): DebugElement {
  const all = getAllChipCollectionDebugElements(fixture);
  if (!all[index]) {
    throw new Error(`getChipCollectionDebugElement could not find a debug element at index '${index}'`);
  }
  return all[index];
}

/**
 * Get the component instance for a TsChipCollection
 *
 * @param fixture - The component fixture
 * @param index - The index of the desired TsChipCollection
 * @return The instance
 */

export function getChipCollectionInstance(fixture: ComponentFixture<any>, index = 0): TsChipCollectionComponent {
  const debugElement = getChipCollectionDebugElement(fixture, index);
  return debugElement.componentInstance;
}

/**
 * Get the element for a TsChipComponent
 *
 * @param fixture - The component fixture
 * @param index - The index of the desired TsChipComponent
 * @return The element
 */
export function getChipElement(fixture: ComponentFixture<any>, index = 0): HTMLElement {
  const debugElement = getChipDebugElement(fixture, index);
  return debugElement.nativeElement;
}

/**
 * Get the element for a TsChipCollection
 *
 * @param fixture - The component fixture
 * @param index - The index of the desired TsChipCollection
 * @return The element
 */
export function getChipCollectionElement(fixture: ComponentFixture<any>, index = 0): HTMLElement {
  const debugElement = getChipCollectionDebugElement(fixture, index);
  return debugElement.nativeElement;
}

