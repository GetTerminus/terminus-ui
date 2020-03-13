import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TsPaginatorComponent } from '@terminus/ui/paginator';
import { selectOption } from '@terminus/ui/select/testing';
import { TsUILibraryError } from '@terminus/ui/utilities';

export type TsPaginatorPage
  = 'first'
  | 'last'
  | 'next'
  | 'previous'
;

/**
 * Helper function to click a button to update results set
 *
 * @param fixture - fixture
 * @param dir - direction: first, last, next or previous, to determine which button to click
 */
export function clickToChangePage(fixture: ComponentFixture<any>, dir: TsPaginatorPage) {
  const buttonEl = fixture.debugElement.query(By.css(`.qa-paginator-${dir}-page-button .c-button`)).nativeElement as HTMLButtonElement;
  buttonEl.click();
  fixture.detectChanges();
  return fixture.whenStable();
}

/**
 * Helper function to select an option from a select component
 *
 * @param fixture - fixture
 * @param value - viewable string selected
 */
export function updateRecordsPerPage(fixture: ComponentFixture<any>, value: string) {
  selectOption(fixture, value);
  return fixture.whenStable();
}

/**
 * Get the debug element for a TsPaginatorComponent
 *
 * @param fixture - The test fixture
 * @returns The debug element
 */
export function getPaginatorDebug(fixture: ComponentFixture<any>): DebugElement {
  const debug = fixture.debugElement.query(By.directive(TsPaginatorComponent));
  if (!debug) {
    throw new TsUILibraryError(`'getPaginatorDebug' could not find a TsPaginatorComponent.`);
  }
  return debug;
}

/**
 * Get a paginator instance from a fixture
 *
 * @param fixture - The component fixture
 * @returns A TsPaginatorComponent instance
 */
export function getPaginatorInstance(fixture: ComponentFixture<any>): TsPaginatorComponent {
  const debug = getPaginatorDebug(fixture);
  return debug.componentInstance;
}
