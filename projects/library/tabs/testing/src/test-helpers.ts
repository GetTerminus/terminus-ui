import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TsTabCollectionComponent } from '@terminus/ui/tabs';


/**
 * Get an array of all DebugElements for TsTabCollectionComponents
 *
 * @param fixture - The component fixture
 * @return An array of DebugElements
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
 * @return The DebugElement
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
 * @return The component instance
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
 * @return An array of debug elements
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
 * @return The array of elements
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
 * @return The element
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
 * @return The element
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
 * @return The selected label element
 */
export function getSelectedLabelElement(fixture: ComponentFixture<any>): HTMLElement {
  return fixture.nativeElement.querySelector('.ts-tab-label--active');
}

/**
 * Get the selected content element
 *
 * @param fixture - The component fixture
 * @return The selected tab content element
 */
export function getSelectedContentElement(fixture: ComponentFixture<any>): HTMLElement {
  return fixture.nativeElement.querySelector('.ts-tab-body--active');
}


/**
 * Checks that:
 * a) The `selectedIndex` has been updated
 * b) The label and body have their respective `active` classes
 *
 * @param fixture - The component fixture
 * @param expectedIndex - The index to use in the expect statement
 */
export function checkSelectedIndex(fixture: ComponentFixture<any>, expectedIndex: number): void {
  fixture.detectChanges();

  const collection: TsTabCollectionComponent = getTabCollectionDebugElement(fixture).componentInstance;
  expect(collection.selectedIndex).toEqual(expectedIndex);

  const tabLabelElement = fixture.debugElement.query(By.css(`.ts-tab-label:nth-of-type(${expectedIndex + 1})`)).nativeElement;
  expect(tabLabelElement.classList.contains('ts-tab-label--active')).toEqual(true);

  const tabContentElement = fixture.debugElement.query(By.css(`ts-tab-body:nth-of-type(${expectedIndex + 1})`)).nativeElement;
  expect(tabContentElement.classList.contains('ts-tab-body--active')).toEqual(true);
}
