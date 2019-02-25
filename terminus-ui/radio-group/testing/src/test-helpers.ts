import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TsRadioGroupComponent } from '@terminus/ui/radio-group';
import { DebugElement } from '@angular/core';


/**
 * Get all TsRadioGroupComponent instances
 *
 * @param fixture - The component fixture
 * @return The array of TsRadioGroupComponent instances
 */
export function getAllRadioGroupInstances(fixture: ComponentFixture<any>): TsRadioGroupComponent[] {
  const debugElements = fixture.debugElement.queryAll(By.css('ts-radio-group'));
  if (!debugElements) {
    throw new Error(`'getAllRadioGroupInstances' found no radio groups`);
  }
  return debugElements.map((i) => i.componentInstance);
}

/**
 * Get a TsRadioGroupComponent instance
 *
 * @param fixture - The component fixture
 * @param index - The index of the radio group to return
 * @return The TsRadioGroupComponent instance
 */
export function getRadioGroupInstance(fixture: ComponentFixture<any>, index = 0): TsRadioGroupComponent {
  const all = getAllRadioGroupInstances(fixture);
  if (!all[index]) {
    throw new Error(`'getRadioGroupInstance' found no radio groups at index '${index}'. ${all.length} were found.`);
  }
  return all[index];
}

/**
 * Get the radio group element
 *
 * @param fixture - The component fixture
 * @param index - The index of the radio group to query
 * @return The HTMLElement
 */
export function getRadioGroupParentElement(fixture: ComponentFixture<any>, index = 0): HTMLElement {
  const debugElements = fixture.debugElement.queryAll(By.css('ts-radio-group'));
  if (!debugElements) {
    throw new Error(`'getRadioGroupParentElement' found no radio groups`);
  }
  if (!debugElements[index]) {
    throw new Error(`'getRadioGroupParentElement' found no radio groups at index '${index}'. ${debugElements.length} were found.`);
  }
  return debugElements[index].nativeElement as HTMLElement;
}

/**
 * Make a selection on a standard radio group
 *
 * @param fixture - The component fixture
 * @param radioValue - The value to match
 * @param index - The index of the radio group to set
 * @return The Promise from fixture.whenStable
 */
export function selectStandardRadio(fixture: ComponentFixture<any>, radioValue: string, index = 0): Promise<any> {
  const debugElement: DebugElement = fixture.debugElement.queryAll(By.css('ts-radio-group'))[index];
  if (!debugElement) {
    throw new Error(`'selectStandardRadio' found no radio group`);
  }
  const labels: DebugElement[] = debugElement.queryAll(By.css('.mat-radio-label'));

  labels.forEach((labelDebugEl) => {
    const labelTextElement = labelDebugEl.query(By.css('.mat-radio-label-content')).nativeElement;

    if (labelTextElement.textContent.trim() === radioValue) {
      labelDebugEl.nativeElement.click();
    }
  });

  fixture.detectChanges();
  return fixture.whenStable();
}

/**
 * Make a selection on a visual radio group
 *
 * @param fixture - The component fixture
 * @param radioValue - The value to match
 * @param index - The index of the radio group to set
 * @return The Promise from fixture.whenStable
 */
export function selectVisualRadio(fixture: ComponentFixture<any>, radioValue: string, index = 0): Promise<any> {
  const debugElement: DebugElement = fixture.debugElement.queryAll(By.css('ts-radio-group .c-radio--visual'))[index];
  if (!debugElement) {
    throw new Error(`'selectVisualRadio' found no radio group`);
  }
  const labels: DebugElement[] = debugElement.queryAll(By.css('.c-radio__control'));

  labels.forEach((labelDebugEl) => {
    const labelTextElement = labelDebugEl.query(By.css('.c-radio__content-label')).nativeElement;

    if (labelTextElement.textContent.trim() === radioValue) {
      labelDebugEl.nativeElement.click();
    }
  });

  fixture.detectChanges();
  return fixture.whenStable();
}
