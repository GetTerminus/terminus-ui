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
// tslint:disable-next-line no-any
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
// tslint:disable-next-line no-any
export function updateRecordsPerPage(fixture: ComponentFixture<any>, value: string) {
  selectOption(fixture, value);
  return fixture.whenStable();
}

/**
 * Get the debug element for a TsPaginatorComponent
 *
 * @param fixture - The test fixture
 * @return The debug element
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
 * @return A TsPaginatorComponent instance
 */
export function getPaginatorInstance(fixture: ComponentFixture<any>): TsPaginatorComponent {
  const debug = getPaginatorDebug(fixture);
  return debug.componentInstance;
}

export function expectAllButtonsEnabled(fixture: ComponentFixture<any>) {
  const firstPageButton =
    fixture.debugElement.query(By.css(`.qa-paginator-first-page-button .c-button`)).nativeElement as HTMLButtonElement;
  const previousPageButton =
    fixture.debugElement.query(By.css(`.qa-paginator-previous-page-button .c-button`)).nativeElement as HTMLButtonElement;
  const lastPageButton =
    fixture.debugElement.query(By.css(`.qa-paginator-last-page-button .c-button`)).nativeElement as HTMLButtonElement;
  const nextPageButton =
    fixture.debugElement.query(By.css(`.qa-paginator-next-page-button .c-button`)).nativeElement as HTMLButtonElement;

  expect(firstPageButton.disabled).toEqual(true);
  expect(previousPageButton.disabled).toEqual(true);
  expect(lastPageButton.disabled).toEqual(true);
  expect(nextPageButton.disabled).toEqual(true);
}
