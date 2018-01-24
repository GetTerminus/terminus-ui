import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';


/**
 * Reusable Query helper function
 *
 * @param fixture - The test fixture
 * @return The query result
 */
export function queryFor(fixture: ComponentFixture<any>, selector: string): any {
  return fixture.debugElement.query(By.css(selector))
}
