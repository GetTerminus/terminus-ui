import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { selectOption } from '@terminus/ui/select/testing';


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
