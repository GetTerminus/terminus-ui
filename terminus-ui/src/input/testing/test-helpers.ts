import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TsInputComponent } from './../input.component';


/**
 * Get the TsInputComponent instance
 *
 * @param fixture - The component fixture
 * @return The TsInputComponent instance
 */
export function getInputComponent(fixture: ComponentFixture<any>): TsInputComponent {
  return fixture.debugElement.query(By.css('.ts-input')).componentInstance;
}


/**
 * Get the input element instance
 *
 * @param fixture - The component fixture
 * @return The HTMLInputfElement
 */
export function getInputElement(fixture: ComponentFixture<any>): HTMLInputElement {
  return fixture.debugElement.query(By.css('.c-input__text')).nativeElement as HTMLInputElement;
}


/**
 * Send an input event to the input element
 *
 * @param fixture - The component fixture
 * @return The Promise from fixture.whenStable
 */
export function sendInput(text: string, el: HTMLInputElement, fixture: ComponentFixture<any>): Promise<any> {
  el.value = text;
  const event = document.createEvent('KeyboardEvent');
  event.initEvent('input', true, false);
  el.dispatchEvent(event);
  fixture.detectChanges();
  return fixture.whenStable();
}
