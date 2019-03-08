import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  TsAccordionComponent,
  TsExpansionPanelComponent,
  TsExpansionPanelTriggerComponent,
} from '@terminus/ui/expansion-panel';


/**
 * Get an array of all DebugElements for TsExpansionPanelComponents
 *
 * @param fixture - The component fixture
 * @return An array of DebugElements
 */
export function getAllPanelDebugElements(fixture: ComponentFixture<any>): DebugElement[] {
  return fixture.debugElement.queryAll(By.css('ts-expansion-panel'));
}

/**
 * Get an array of all TsExpansionPanelComponent instances
 *
 * @param fixture - The component fixture
 * @return An array of TsExpansionPanelComponent
 */
export function getAllPanelInstances(fixture: ComponentFixture<any>): TsExpansionPanelComponent[] {
  const debugElements = getAllPanelDebugElements(fixture);
  if (debugElements.length < 1) {
    throw new Error(`getAllPanelInstances did not find any instances`);
  }
  return debugElements.map((debugElement) => debugElement.componentInstance);
}

/**
 * Get the DebugElement for a TsExpansionPanelComponent
 *
 * @param fixture - The component fixture
 * @param index - The index of the desired TsExpansionPanelComponent
 * @return The DebugElement
 */
export function getPanelDebugElement(fixture: ComponentFixture<any>, index = 0): DebugElement {
  const all = getAllPanelDebugElements(fixture);
  if (!all[index]) {
    throw new Error(`getPanelDebugElement could not find a debug element at index '${index}'`);
  }
  return all[index];
}

/**
 * Get the component instance for a TsExpansionPanelComponent
 *
 * @param fixture - The component fixture
 * @param index - The index of the desired TsExpansionPanelComponent
 * @return The instance
 */
export function getPanelInstance(fixture: ComponentFixture<any>, index = 0): TsExpansionPanelComponent {
  const debugElement = getPanelDebugElement(fixture, index);
  return debugElement.componentInstance;
}

/**
 * Get the element for a TsExpansionPanelComponent
 *
 * @param fixture - The component fixture
 * @param index - The index of the desired TsExpansionPanelComponent
 * @return The element
 */
export function getPanelElement(fixture: ComponentFixture<any>, index = 0): HTMLElement {
  const debugElement = getPanelDebugElement(fixture, index);
  return debugElement.nativeElement;
}

/**
 * Get the element for a TsExpansionPanelComponent
 *
 * @param fixture - The component fixture
 * @param index - The index of the desired TsExpansionPanelComponent
 * @return The element
 */
export function getPanelBodyElement(fixture: ComponentFixture<any>, index = 0): HTMLElement {
  const instance = getPanelInstance(fixture, index);
  return instance.panelBody.nativeElement;
}

/**
 * Get the element for a TsExpansionPanelComponent content container
 *
 * @param fixture - The component fixture
 * @param index - The index of the desired TsExpansionPanelComponent
 * @return The element
 */
export function getPanelBodyContentElement(fixture: ComponentFixture<any>, index = 0): HTMLElement {
  const debugElement = getPanelDebugElement(fixture, index);
  const contentElement = debugElement.query(By.css('.ts-expansion-panel__body'));
  return contentElement.nativeElement;
}

/**
 * Get an array of all DebugElements for TsAccordionComponents
 *
 * @param fixture - The component fixture
 * @return An array of DebugElements
 */
export function getAllAccordionDebugElements(fixture: ComponentFixture<any>): DebugElement[] {
  return fixture.debugElement.queryAll(By.css('ts-accordion'));
}

/**
 * Get an array of all TsAccordionComponent instances
 *
 * @param fixture - The component fixture
 * @return An array of TsAccordionComponent
 */
export function getAllAccordionInstances(fixture: ComponentFixture<any>): TsAccordionComponent[] {
  const debugElements = getAllAccordionDebugElements(fixture);
  if (debugElements.length < 1) {
    throw new Error(`getAllAccordionInstances did not find any instances`);
  }
  return debugElements.map((debugElement) => debugElement.componentInstance);
}

/**
 * Get the component instance for a TsAccordionComponent
 *
 * @param fixture - The component fixture
 * @param index - The index of the desired TsAccordionComponent
 * @return The instance
 */
export function getAccordionInstance(fixture: ComponentFixture<any>, index = 0): TsAccordionComponent {
  const all = getAllAccordionInstances(fixture);
  if (!all[index]) {
    throw new Error(`getAllAccordionInstance could not find an accordion at index '${index}'`);
  }
  return all[index];
}

/**
 * Get the DebugElement for a TsAccordionComponent
 *
 * @param fixture - The component fixture
 * @param index - The index of the desired TsAccordionComponent
 * @return The DebugElement
 */
export function getAccordionDebugElement(fixture: ComponentFixture<any>, index = 0): DebugElement {
  const all = getAllAccordionDebugElements(fixture);
  if (!all[index]) {
    throw new Error(`getAccordionDebugElement could not find an accordion at index '${index}'`);
  }
  return all[index];
}

/**
 * Get the element for a TsAccordionComponent
 *
 * @param fixture - The component fixture
 * @param index - The index of the desired TsAccordionComponent
 * @return The element
 */
export function getAccordionElement(fixture: ComponentFixture<any>, index = 0): HTMLElement {
  const debugElement = getAccordionDebugElement(fixture, index);
  return debugElement.nativeElement;
}

/**
 * Get the element for a TsExpansionPanelTriggerComponent
 *
 * @param fixture - The component fixture
 * @param index - The index of the desired TsExpansionPanelComponent
 * @return The element
 */
export function getTriggerDebugElement(fixture: ComponentFixture<any>, panelIndex = 0): DebugElement {
  const panelDebugElement = getPanelDebugElement(fixture, panelIndex);
  const triggerDebugElement = panelDebugElement.query(By.css('ts-expansion-panel-trigger'));
  if (!triggerDebugElement) {
    throw new Error(`getTriggerDebugElement found no triggers within the panel at index '${panelIndex}'`);
  }
  return triggerDebugElement;
}

/**
 * Get the instance for a TsExpansionPanelTriggerComponent
 *
 * @param fixture - The component fixture
 * @param index - The index of the desired TsExpansionPanelComponent
 * @return The instance
 */
export function getTriggerInstance(fixture: ComponentFixture<any>, panelIndex = 0): TsExpansionPanelTriggerComponent {
  const triggerDebugElement = getTriggerDebugElement(fixture, panelIndex);
  return triggerDebugElement.componentInstance;
}

/**
 * Get the element for a TsExpansionPanelTriggerComponent
 *
 * @param fixture - The component fixture
 * @param index - The index of the desired TsExpansionPanelComponent
 * @return The element
 */
export function getTriggerElement(fixture: ComponentFixture<any>, panelIndex = 0): HTMLElement {
  const triggerDebugElement = getTriggerDebugElement(fixture, panelIndex);
  return triggerDebugElement.nativeElement;
}

/**
 * Get the element for a TsExpansionPanelTriggerTitleComponent
 *
 * @param fixture - The component fixture
 * @param index - The index of the desired TsExpansionPanelComponent
 * @return The element
 */
export function getTriggerTitleElement(fixture: ComponentFixture<any>, panelIndex = 0): HTMLElement {
  const triggerDebugElement = getTriggerDebugElement(fixture, panelIndex);
  const title = triggerDebugElement.query(By.css('.ts-expansion-panel__trigger-title'));
  if (!title) {
    throw new Error(`getTriggerTitleElement found no title within the trigger at index '${panelIndex}'`);
  }
  return title.nativeElement;
}

/**
 * Get the element for a TsExpansionPanelTriggerDescriptionComponent
 *
 * @param fixture - The component fixture
 * @param index - The index of the desired TsExpansionPanelComponent
 * @return The element
 */
export function getTriggerDescriptionElement(fixture: ComponentFixture<any>, panelIndex = 0): HTMLElement {
  const triggerDebugElement = getTriggerDebugElement(fixture, panelIndex);
  const description = triggerDebugElement.query(By.css('.ts-expansion-panel__trigger-description'));
  if (!description) {
    throw new Error(`getTriggerTitleElement found no description within the trigger at index '${panelIndex}'`);
  }
  return description.nativeElement;
}

/**
 * Get the element for a TsExpansionPanelActionRowComponent
 *
 * @param fixture - The component fixture
 * @param index - The index of the desired TsExpansionPanelComponent
 * @return The element
 */
export function getPanelActionRow(fixture: ComponentFixture<any>, index = 0): HTMLElement {
  const debugElement = getPanelDebugElement(fixture, index);
  const row = debugElement.query(By.css('.ts-expansion-panel__action-row'));
  return row.nativeElement;
}

/**
 * Return the difference in time in words
 *
 * @param fixture - The component fixture
 * @param index - The index of the desired TsExpansionPanelComponent
 * @return The whenStable promise
 */
export function togglePanel(fixture: ComponentFixture<any>, panelIndex = 0): Promise<any> {
  const triggerElement = getTriggerElement(fixture, panelIndex);
  triggerElement.click();
  fixture.detectChanges();
  return fixture.whenStable();
}
