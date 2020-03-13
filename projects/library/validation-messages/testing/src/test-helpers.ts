import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

/**
 * Get the message element
 *
 * @param fixture
 * @returns HTMLElement
 */
export const getValidationMessageElement =
  (fixture: ComponentFixture<any>): HTMLElement => fixture.debugElement.query(By.css('.ts-validation-messages')).nativeElement;

