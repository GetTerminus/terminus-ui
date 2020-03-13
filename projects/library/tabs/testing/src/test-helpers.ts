import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TsTabCollectionComponent } from '@terminus/ui/tabs';

/**
 * Get an array of all DebugElements for TsTabCollectionComponents
 *
 * @param fixture - The component fixture
 * @returns An array of DebugElements
 */
export function getAllTabCollectionDebugElements(fixture: ComponentFixture<any>): DebugElement[] {
  const debugElements = fixture.debugElement.queryAll(By.css('ts-tab-collection'));
  if (!debugElements) {
    throw new Error(`'getAllTabCollectionDebugElements' did not find any debug elements`);
  }
  return debugElements;
}

/**
 * Get the DebugElement for a TsTabCollectionComponent
 *
 * @param fixture - The component fixture
 * @param index - The index of the desired TsTabCollectionComponent
 * @returns The DebugElement
 */
export function getTabCollectionDebugElement(fixture: ComponentFixture<any>, index = 0): DebugElement {
  const debugElements = getAllTabCollectionDebugElements(fixture);
  if (!debugElements[index]) {
    throw new Error(`'getTabCollectionDebugElement' did not find a debug element at index '${index}'`);
  }
  return debugElements[index];
}

/**
 * Get the component instance for a TsTabCollectionComponent
 *
 * @param fixture - The component fixture
 * @param index - The index of the desired TsTabCollectionComponent
 * @returns The component instance
 */
export function getTabCollectionInstance(fixture: ComponentFixture<any>, index = 0): TsTabCollectionComponent {
  const debugElement = getTabCollectionDebugElement(fixture, index);
  return debugElement.componentInstance;
}

/**
 * Get all label debug elements for a TsTabCollectionComponent
 *
 * @param fixture - The component fixture
 * @param index - The index of the desired TsTabCollectionComponent
 * @returns An array of debug elements
 */
export function getAllTabLabelDebugElements(fixture: ComponentFixture<any>, index = 0): DebugElement[] {
  const debugElement = getTabCollectionDebugElement(fixture, index);
  return debugElement.queryAll(By.css('.ts-tab-label'));
}

/**
 * Get all label elements for a TsTabCollectionComponent
 *
 * @param fixture - The component fixture
 * @param index - The index of the desired TsTabCollectionComponent
 * @returns The array of elements
 */
export function getAllTabLabelElements(fixture: ComponentFixture<any>, index = 0): HTMLElement[] {
  const debugElements = getAllTabLabelDebugElements(fixture, index);
  if (!debugElements) {
    throw new Error(`'getAllTabLabelElements' did not find any debug elements`);
  }
  return debugElements.map(v => v.nativeElement);
}

/**
 * Get a label element for a TsTabCollectionComponent
 *
 * @param fixture - The component fixture
 * @param collectionIndex - The index of the desired TsTabCollectionComponent
 * @param labelIndex - The index of the desired label element
 * @returns The element
 */
export function getTabLabelElement(fixture: ComponentFixture<any>, collectionIndex = 0, labelIndex = 0): HTMLElement {
  const debugElements = getAllTabLabelDebugElements(fixture, collectionIndex);
  if (!debugElements[labelIndex]) {
    throw new Error(`'getTabLabelElement' did not find a debug element at index '${labelIndex}'`);
  }
  return debugElements[labelIndex].nativeElement as HTMLElement;
}

/**
 * Get the tab wrapper element for a TsTabCollectionComponent
 *
 * @param fixture - The component fixture
 * @param collectionIndex - The index of the desired TsTabCollectionComponent
 * @param tabIndex - The index of the desired tab element
 * @returns The element
 */
export function getTabBodyWrapperElement(fixture: ComponentFixture<any>, collectionIndex = 0, tabIndex = 0): HTMLElement {
  const debugElement = fixture.debugElement.query(By.css('.ts-tab-collection__body-wrapper'));
  if (!debugElement) {
    throw new Error(`'getTabBodyWrapperElement' did not find a debug element`);
  }
  return debugElement.nativeElement as HTMLElement;
}

/**
 * Get the selected label element
 *
 * @param fixture - The component fixture
 * @returns The selected label element
 */
export const getSelectedLabelElement =
  (fixture: ComponentFixture<any>): HTMLElement => fixture.nativeElement.querySelector('.ts-tab-label--active');

/**
 * Get the selected content element
 *
 * @param fixture - The component fixture
 * @returns The selected tab content element
 */
export const getSelectedContentElement =
  (fixture: ComponentFixture<any>): HTMLElement => fixture.nativeElement.querySelector('.ts-tab-body--active');
