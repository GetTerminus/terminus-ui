import { ComponentFixture } from '@angular/core/testing';


/**
 * Note: this helper only accesses the 1st-level child within a component
 *       A different helper method is need to access deep-level DOM nodes
 */
export function expectNativeEl(fixture: ComponentFixture<any>): any {
  fixture.detectChanges();

  // Return response of `expect(...)`
  return expect(fixture.debugElement.children[0].nativeElement);
}
