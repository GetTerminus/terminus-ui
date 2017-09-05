import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';


/**
 * Reusable Query helper function
 *
 * @param {Object} fixture The test fixture
 * @return {Object} query The query result
 */
export function queryFor(fixture: ComponentFixture<any>, selector: string): any {
  return fixture.debugElement.query(By.css(selector))
}
