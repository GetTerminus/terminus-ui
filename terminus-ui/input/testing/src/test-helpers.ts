import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TsInputComponent } from '@terminus/ui/input';


/**
 * Get all TsInputComponent instances
 *
 * @param fixture - The component fixture
 * @return The array of TsInputComponent instances
 */
export function getAllInputInstances(fixture: ComponentFixture<any>): TsInputComponent[] {
  const debugElements = fixture.debugElement.queryAll(By.css('ts-input'));
  if (!debugElements) {
    throw new Error(`'getAllInputInstances' found no inputs`);
  }
  return debugElements.map((i) => i.componentInstance);
}

/**
 * Get a TsInputComponent instance
 *
 * @param fixture - The component fixture
 * @param index - The index of the input to return
 * @return The TsInputComponent instance
 */
export function getInputInstance(fixture: ComponentFixture<any>, index = 0): TsInputComponent {
  const all = getAllInputInstances(fixture);
  if (!all[index]) {
    throw new Error(`'getInputInstance' found no inputs at index '${index}'. ${all.length} were found.`);
  }
  return all[index];
}

/**
 * Get the input element
 *
 * @param fixture - The component fixture
 * @param index - The index of the input to query
 * @return The HTMLInputElement
 */
export function getInputElement(fixture: ComponentFixture<any>, index = 0): HTMLInputElement {
  const instance = getInputInstance(fixture, index);
  if (!instance.inputElement) {
    throw new Error(`'getInputElement' found no input elements at index '${index}'`);
  }
  return instance.inputElement.nativeElement as HTMLInputElement;
}

/**
 * Send an input event to the input element
 *
 * @param fixture - The component fixture
 * @param text - The value to set
 * @param index - The index of the input to set
 * @return The Promise from fixture.whenStable
 */
export function sendInput(fixture: ComponentFixture<any>, text: string, index = 0): Promise<any> {
  const inputElement = getInputElement(fixture, index);
  inputElement.focus();
  inputElement.value = text;
  const event = document.createEvent('KeyboardEvent');
  event.initEvent('input', true, false);
  inputElement.dispatchEvent(event);
  fixture.detectChanges();
  return fixture.whenStable();
}
