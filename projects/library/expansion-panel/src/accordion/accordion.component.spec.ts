import { Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { KEYS } from '@terminus/ngx-tools/keycodes';
import {
  createComponent as createComponentInner,
  createKeyboardEvent,
} from '@terminus/ngx-tools/testing';
import * as testComponents from '@terminus/ui/expansion-panel/testing';
// eslint-disable-next-line no-duplicate-imports
import {
  getAccordionInstance,
  getPanelInstance,
  getTriggerElement,
  togglePanel,
} from '@terminus/ui/expansion-panel/testing';

import { TsExpansionPanelModule } from '../expansion-panel.module';

/**
 * Create test host component
 *
 * @param component
 */
// eslint-disable-next-line max-len
const createComponent = <T>(component: Type<T>): ComponentFixture<T> => createComponentInner<T>(component, undefined, [TsExpansionPanelModule, NoopAnimationsModule]);

describe(`TsAccordionComponent`, function() {
  test(`should be able to enforce a single panel open at a time`, function() {
    const fixture = createComponent<testComponents.Accordion>(testComponents.Accordion);
    fixture.detectChanges();
    const panel1 = getPanelInstance(fixture);
    const panel2 = getPanelInstance(fixture, 1);

    expect(panel1.expanded).toEqual(false);
    expect(panel2.expanded).toEqual(false);

    togglePanel(fixture);
    expect(panel1.expanded).toEqual(true);
    expect(panel2.expanded).toEqual(false);

    togglePanel(fixture, 1);
    expect(panel1.expanded).toEqual(false);
    expect(panel2.expanded).toEqual(true);

    expect.assertions(6);
  });

  test(`should allow multiple panels to be open`, function() {
    const fixture = createComponent<testComponents.AccordionMulti>(testComponents.AccordionMulti);
    fixture.detectChanges();
    const panel1 = getPanelInstance(fixture);
    const panel2 = getPanelInstance(fixture, 1);

    expect(panel1.expanded).toEqual(false);
    expect(panel2.expanded).toEqual(false);

    togglePanel(fixture);
    expect(panel1.expanded).toEqual(true);
    expect(panel2.expanded).toEqual(false);

    togglePanel(fixture, 1);
    expect(panel1.expanded).toEqual(true);
    expect(panel2.expanded).toEqual(true);

    expect.assertions(6);
  });

  test(`should be able to open or close all panels when multi is true`, function() {
    const fixture = createComponent<testComponents.AccordionMulti>(testComponents.AccordionMulti);
    fixture.detectChanges();
    const accordion = getAccordionInstance(fixture);
    const panel1 = getPanelInstance(fixture);
    const panel2 = getPanelInstance(fixture, 1);

    expect(panel1.expanded).toEqual(false);
    expect(panel2.expanded).toEqual(false);

    accordion.openAll();
    expect(panel1.expanded).toEqual(true);
    expect(panel2.expanded).toEqual(true);

    accordion.closeAll();
    expect(panel1.expanded).toEqual(false);
    expect(panel2.expanded).toEqual(false);

    expect.assertions(6);
  });

  test(`should be able to hide all toggle icons`, function() {
    const fixture = createComponent<testComponents.HideToggleAccordion>(testComponents.HideToggleAccordion);
    fixture.detectChanges();
    const triggerElement1: HTMLElement = getTriggerElement(fixture);
    const toggleIcon1 = triggerElement1.querySelector('.ts-expansion-panel__indicator');
    const triggerElement2: HTMLElement = getTriggerElement(fixture);
    const toggleIcon2 = triggerElement2.querySelector('.ts-expansion-panel__indicator');

    expect(toggleIcon1).toBeNull();
    expect(toggleIcon2).toBeNull();
  });

  describe(`Keyboard controls`, function() {
    test(`should focus first trigger when HOME is used and the last when END is used`, function() {
      const fixture = createComponent<testComponents.Accordion>(testComponents.Accordion);
      fixture.detectChanges();
      const trigger1 = getTriggerElement(fixture);
      const trigger2 = getTriggerElement(fixture, 1);

      expect(document.activeElement === trigger1).toEqual(false);
      expect(document.activeElement === trigger2).toEqual(false);

      // Non-special key to complete coverage
      const keyEvent = createKeyboardEvent('keydown', KEYS.A, trigger1);
      trigger1.dispatchEvent(keyEvent);
      fixture.detectChanges();

      const homeEvent = createKeyboardEvent('keydown', KEYS.HOME, trigger1);
      trigger1.dispatchEvent(homeEvent);
      fixture.detectChanges();

      expect(document.activeElement === trigger1).toEqual(true);
      expect(document.activeElement === trigger2).toEqual(false);

      const endEvent = createKeyboardEvent('keydown', KEYS.END, trigger1);
      trigger1.dispatchEvent(endEvent);
      fixture.detectChanges();

      expect(document.activeElement === trigger1).toEqual(false);
      expect(document.activeElement === trigger2).toEqual(true);
    });

    // NOTE: ngx-tools `createKeyboardEvent` function seems to generate an event
    // where `event.metaKey` is true which does not work for this test.
    test(`should toggle a panel when SPACE or ENTER is used`, function() {
      const fixture = createComponent<testComponents.Accordion>(testComponents.Accordion);
      fixture.detectChanges();
      const panel1 = getPanelInstance(fixture);
      const trigger1 = getTriggerElement(fixture);
      const panel2 = getPanelInstance(fixture, 1);
      const trigger2 = getTriggerElement(fixture, 1);

      const spaceEvent = document.createEvent('KeyboardEvent');
      spaceEvent.initEvent('keydown', true, false);
      Object.defineProperties(spaceEvent, {
        code: { get: () => KEYS.SPACE.code },
        key: { get: () => KEYS.SPACE.code },
      });
      const enterEvent = document.createEvent('KeyboardEvent');
      enterEvent.initEvent('keydown', true, false);
      Object.defineProperties(enterEvent, {
        code: { get: () => KEYS.ENTER.code },
        key: { get: () => KEYS.ENTER.code },
      });

      trigger1.dispatchEvent(spaceEvent);
      fixture.detectChanges();

      expect(panel1.expanded).toEqual(true);
      expect(panel2.expanded).toEqual(false);

      trigger2.dispatchEvent(enterEvent);
      fixture.detectChanges();

      expect(panel1.expanded).toEqual(false);
      expect(panel2.expanded).toEqual(true);
    });
  });

  describe(`Events`, function() {
    test(`should emit when destroyed`, function() {
      const fixture = createComponent<testComponents.AccordionDestroyed>(testComponents.AccordionDestroyed);
      fixture.detectChanges();
      const host = fixture.componentInstance;
      host.destroyed = jest.fn();
      const accordion = getAccordionInstance(fixture);
      accordion.ngOnDestroy();

      expect(host.destroyed).toHaveBeenCalledTimes(1);
    });
  });
});
