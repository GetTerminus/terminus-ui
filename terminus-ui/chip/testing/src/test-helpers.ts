import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { getAutocompleteInstance } from '@terminus/ui/autocomplete/testing';
import {
  TsChipCollectionComponent,
  TsChipComponent,
} from '@terminus/ui/chip';
import { TsUILibraryError } from '@terminus/ui/utilities';


/**
 * Get an array of all DebugElements for {@link TsChipCollectionComponent}s
 *
 * @param fixture - The component fixture
 * @return An array of DebugElements
 */
export function getAllChipCollectionDebugElements(fixture: ComponentFixture<any>): DebugElement[] {
  return fixture.debugElement.queryAll(By.css('ts-chip-collection'));
}

/**
 * Get the component instance for a {@link TsChipCollectionComponent}
 *
 * @param fixture - The component fixture
 * @param index - The index of the desired {@link TsChipCollectionComponent}
 * @return The instance
 */
export function getChipCollectionInstance(fixture: ComponentFixture<any>, index = 0): TsChipCollectionComponent {
  const debugElement = getChipCollectionDebugElement(fixture, index);
  return debugElement.componentInstance;
}

/**
 * Get the element for a {@link TsChipCollectionComponent}
 *
 * @param fixture - The component fixture
 * @param index - The index of the desired {@link TsChipCollectionComponent}
 * @return The element
 */
export function getChipCollectionElement(fixture: ComponentFixture<any>, index = 0): HTMLElement {
  const debugElement = getChipCollectionDebugElement(fixture, index);
  return debugElement.nativeElement;
}

/**
 * Get an array of all chip instances for a {@link TsChipCollectionComponent}
 *
 * @param fixture - The component fixture
 * @param index - The index of the desired {@link TsChipCollectionComponent}
 * @return An array of chip instances
 */
export function getAllChipInstances(fixture: ComponentFixture<any>, index = 0): TsChipComponent[] {
  const instance = getChipCollectionInstance(fixture, index);
  if (!instance.chips) {
    throw new TsUILibraryError(`'getAllChipInstances' did not find chips from the collection at index '${index}'`);
  }
  return instance.chips.toArray();
}

/**
 * Get a specific chip instance for a {@link TsChipCollectionComponent}
 *
 * @param fixture - The component fixture
 * @param collectionIndex - The index of the desired {@link TsChipCollectionComponent
 * @param chipIndex - The index of the desired chip
 * @return A chip instance
 */
export function getChipInstance(fixture: ComponentFixture<any>, collectionIndex = 0, chipIndex = 0): TsChipComponent {
  const chips = getAllChipInstances(fixture, collectionIndex);
  if (!chips[chipIndex]) {
    throw new TsUILibraryError(`'getChipInstance' did not find a chip at index '${chipIndex}'`);
  }
  return chips[chipIndex];
}

/**
 * Get an array of all {@link TsChipCollectionComponent} instances
 *
 * @param fixture - The component fixture
 * @return An array of {@link TsChipCollectionComponent}
 */
export function getAllChipCollectionInstances(fixture: ComponentFixture<any>): TsChipCollectionComponent[] {
  const debugElements = getAllChipCollectionDebugElements(fixture);
  if (debugElements.length < 1) {
    throw new TsUILibraryError(`getAllChipCollectionInstances did not find any instances`);
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
    throw new TsUILibraryError(`'getChipCollectionInstanceInAutocomplete' found no chip collection.`);
  }
  return instance.chipCollection;
}

/**
 * Get an array of all DebugElements for {@link TsChipComponent}s
 *
 * @param fixture - The component fixture
 * @return An array of DebugElements
 */
export function getAllChipDebugElements(fixture: ComponentFixture<any>): DebugElement[] {
  return fixture.debugElement.queryAll(By.css('.ts-chip'));
}

/**
 * Get the DebugElement for a {@link TsChipComponent}
 *
 * @param fixture - The component fixture
 * @param index - The index of the desired {@link TsChipComponent}
 * @return The DebugElement
 */
export function getChipDebugElement(fixture: ComponentFixture<any>, index = 0): DebugElement {
  const all = getAllChipDebugElements(fixture);
  if (!all[index]) {
    throw new TsUILibraryError(`'getChipDebugElement' could not find a debug element at index '${index}'`);
  }
  return all[index];
}

/**
 * Get the DebugElement for a {@link TsChipCollectionComponent}
 *
 * @param fixture - The component fixture
 * @param index - The index of the desired {@link TsChipCollectionComponent}
 * @return The DebugElement
 */
export function getChipCollectionDebugElement(fixture: ComponentFixture<any>, index = 0): DebugElement {
  const all = getAllChipCollectionDebugElements(fixture);
  if (!all[index]) {
    throw new TsUILibraryError(`'getChipCollectionDebugElement' could not find a debug element at index '${index}'`);
  }
  return all[index];
}

/**
 * Get the element for a {@link TsChipComponent}
 *
 * @param fixture - The component fixture
 * @param index - The index of the desired {@link TsChipComponent}
 * @return The element
 */
export function getChipElement(fixture: ComponentFixture<any>, index = 0): HTMLElement {
  const debugElement = getChipDebugElement(fixture, index);
  return debugElement.nativeElement;
}

/**
 * Get the element for the button that removes a chip
 *
 * @param chip - The chip component
 * @return The element
 */
export function getChipRemoveButton(chip: TsChipComponent): HTMLElement {
  const removeElement = chip.elementRef.nativeElement.querySelector('.c-chip__remove');
  if (!removeElement) {
    throw new TsUILibraryError(`'getChipRemoveButton' could not find the element inside the chip '${chip.id}'`);
  }
  return removeElement as HTMLElement;
}

