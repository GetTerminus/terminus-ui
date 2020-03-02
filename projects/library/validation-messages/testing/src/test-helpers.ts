import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';


export function getValidationMessageElement(fixture: ComponentFixture<any>): HTMLElement {
  return fixture.debugElement.query(By.css('.ts-validation-messages')).nativeElement;
}

