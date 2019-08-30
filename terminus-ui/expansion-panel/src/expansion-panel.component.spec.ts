import { Type } from '@angular/core';
import {
  ComponentFixture,
  discardPeriodicTasks,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { createComponent as createComponentInner } from '@terminus/ngx-tools/testing';
import * as testComponents from '@terminus/ui/expansion-panel/testing';
// eslint-disable-next-line no-duplicate-imports
import {
  getPanelActionRow,
  getPanelBodyContentElement,
  getPanelDebugElement,
  getPanelElement,
  getPanelInstance,
  getTriggerDescriptionElement,
  getTriggerElement,
  getTriggerInstance,
  getTriggerTitleElement,
  togglePanel,
} from '@terminus/ui/expansion-panel/testing';

import { TsExpansionPanelModule } from './expansion-panel.module';


function createComponent<T>(component: Type<T>): ComponentFixture<T> {
  return createComponentInner<T>(component, undefined, [TsExpansionPanelModule, NoopAnimationsModule]);
}


describe(`TsExpansionPanelComponent`, function() {

  describe(`Single panel`, function() {

    test(`should defer rendering content when ng-template is used`, fakeAsync(function() {
      const fixture = createComponent<testComponents.DeferredContent>(testComponents.DeferredContent);
      fixture.detectChanges();
      const body = getPanelBodyContentElement(fixture);

      expect(body.textContent).toEqual('');

      togglePanel(fixture);
      tick();
      fixture.detectChanges();
      expect(body.textContent.trim()).toEqual('My content');

      discardPeriodicTasks();
      expect.assertions(2);
    }));


    test(`should be able to default to open`, function() {
      const fixture = createComponent<testComponents.DefaultOpen>(testComponents.DefaultOpen);
      fixture.detectChanges();
      const triggerElement: HTMLElement = getTriggerElement(fixture);
      const panelContainerElement: HTMLElement = getPanelElement(fixture);
      const panel = getPanelInstance(fixture);

      expect(panel.expanded).toEqual(true);
      expect(panel.isExpanded).toEqual(true);
      expect(triggerElement.classList).toContain('ts-expansion-panel__trigger--expanded');
      expect(panelContainerElement.classList).toContain('ts-expansion-panel--expanded');
    });


    test(`should be able to disable the panel via input`, function() {
      const fixture = createComponent<testComponents.DisabledPanel>(testComponents.DisabledPanel);
      fixture.detectChanges();
      const triggerElement: HTMLElement = getTriggerElement(fixture);
      const panel = getPanelInstance(fixture);

      expect(triggerElement.getAttribute('aria-disabled')).toEqual('true');
      expect(panel.isDisabled).toEqual(true);
    });


    test(`should support an action row below panel content`, function() {
      const fixture = createComponent<testComponents.ActionRow>(testComponents.ActionRow);
      fixture.detectChanges();
      const row = getPanelActionRow(fixture);

      expect(row).toBeTruthy();
      expect(row.textContent).toContain('Foo');
    });


    test(`should be able to programmatically open, close and toggle`, function() {
      const fixture = createComponent<testComponents.ProgrammaticControl>(testComponents.ProgrammaticControl);
      fixture.detectChanges();
      const panel = getPanelInstance(fixture);

      expect(panel.expanded).toEqual(false);

      panel.open();
      expect(panel.expanded).toEqual(true);

      panel.close();
      expect(panel.expanded).toEqual(false);

      panel.toggle();
      expect(panel.expanded).toEqual(true);

      panel.toggle();
      expect(panel.expanded).toEqual(false);

      expect.assertions(5);
    });


    test(`should be able to programmatically control disabled panels`, function() {
      const fixture = createComponent<testComponents.DisabledPanel>(testComponents.DisabledPanel);
      fixture.detectChanges();
      const panel = getPanelInstance(fixture);
      const triggerElement: HTMLElement = getTriggerElement(fixture);
      const panelContainerElement: HTMLElement = getPanelElement(fixture);


      expect(panel.expanded).toEqual(false);
      panel.expanded = true;
      fixture.detectChanges();

      expect(triggerElement.classList).toContain('ts-expansion-panel__trigger--expanded');
      expect(panelContainerElement.classList).toContain('ts-expansion-panel--expanded');
    });


    test(`should call focus monitor when panel closes while it has focus`, function() {
      const fixture = createComponent<testComponents.DefaultOpen>(testComponents.DefaultOpen);
      fixture.detectChanges();
      const trigger = getTriggerInstance(fixture);
      const panel = getPanelInstance(fixture);
      Object.defineProperties(panel, { contentContainsFocus: { get: () => true } });
      trigger.focusMonitor.focusVia = jest.fn();

      panel.expanded = false;
      fixture.detectChanges();
      expect(trigger.focusMonitor.focusVia).toHaveBeenCalled();
    });


    describe(`Events`, function() {

      test(`should emit opened and closed events`, function() {
        const fixture = createComponent<testComponents.Events>(testComponents.Events);
        fixture.detectChanges();
        const host = fixture.componentInstance;
        host.opened = jest.fn();
        host.closed = jest.fn();
        host.expandedChange = jest.fn();

        togglePanel(fixture);
        expect(host.opened).toHaveBeenCalledTimes(1);
        expect(host.expandedChange).toHaveBeenCalledWith(true);

        togglePanel(fixture);
        expect(host.closed).toHaveBeenCalledTimes(1);
        expect(host.expandedChange).toHaveBeenCalledWith(false);
      });


      test(`should emit events when animations finish`, function() {
        const fixture = createComponent<testComponents.Events>(testComponents.Events);
        fixture.detectChanges();
        const host = fixture.componentInstance;
        host.afterCollapse = jest.fn();
        host.afterExpand = jest.fn();

        togglePanel(fixture).then(() => {
          expect(host.afterExpand).toHaveBeenCalledTimes(1);
        });

        togglePanel(fixture).then(() => {
          expect(host.afterCollapse).toHaveBeenCalledTimes(1);
        });

        expect.assertions(2);
      });


      test(`should emit when destroyed`, function() {
        const fixture = createComponent<testComponents.Events>(testComponents.Events);
        fixture.detectChanges();
        const host = fixture.componentInstance;
        const panel = getPanelInstance(fixture);
        host.destroyed = jest.fn();

        panel.ngOnDestroy();
        expect(host.destroyed).toHaveBeenCalledTimes(1);
      });

    });

  });


  describe(`Panel trigger`, function() {

    test(`should support title and descriptions`, function() {
      const fixture = createComponent<testComponents.TriggerTitleDescription>(testComponents.TriggerTitleDescription);
      fixture.detectChanges();
      const triggerElement: HTMLElement = getTriggerElement(fixture);
      const title = getTriggerTitleElement(fixture);
      const description = getTriggerDescriptionElement(fixture);

      expect(title.textContent.trim()).toEqual('My title');
      expect(description.textContent.trim()).toEqual('My description');
    });


    test(`should have customizable collapsed and expanded heights`, fakeAsync(function() {
      const fixture = createComponent<testComponents.CustomHeights>(testComponents.CustomHeights);
      fixture.detectChanges();
      const triggerElement: HTMLElement = getTriggerElement(fixture);

      // Open the panel
      togglePanel(fixture);
      tick();
      fixture.detectChanges();
      expect(triggerElement.getAttribute('style')).toContain('height:66px');

      // Close the panel
      togglePanel(fixture);
      tick();
      fixture.detectChanges();
      expect(triggerElement.getAttribute('style')).toContain('height:33px');

      discardPeriodicTasks();
      expect.assertions(2);
    }));


    test(`should be able to set custom heights & toggle visibility via provider configuration`, fakeAsync(function() {
      const fixture = createComponent<testComponents.CustomDefaults>(testComponents.CustomDefaults);
      fixture.detectChanges();
      const triggerElement: HTMLElement = getTriggerElement(fixture);

      // Open the panel
      togglePanel(fixture);
      tick();
      fixture.detectChanges();
      expect(triggerElement.getAttribute('style')).toContain('height:88px');

      // Close the panel
      togglePanel(fixture);
      tick();
      fixture.detectChanges();
      expect(triggerElement.getAttribute('style')).toContain('height:55px');

      const toggleIcon = triggerElement.querySelector('.ts-expansion-panel__indicator');
      expect(toggleIcon).toBeNull();

      discardPeriodicTasks();
      expect.assertions(3);
    }));


    test(`should be able to hide the toggle icon`, function() {
      const fixture = createComponent<testComponents.HideToggle>(testComponents.HideToggle);
      fixture.detectChanges();
      const triggerElement: HTMLElement = getTriggerElement(fixture);
      const toggleIcon = triggerElement.querySelector('.ts-expansion-panel__indicator');

      expect(toggleIcon).toBeNull();
    });


    test(`should pass program through to focus monitor`, function() {
      const fixture = createComponent<testComponents.SinglePanel>(testComponents.SinglePanel);
      fixture.detectChanges();
      const trigger = getTriggerInstance(fixture);
      trigger.focusMonitor.focusVia = jest.fn();

      trigger.focus();
      expect(trigger.focusMonitor.focusVia.mock.calls[0][1]).toEqual('program');

      trigger.focus('keyboard');
      expect(trigger.focusMonitor.focusVia.mock.calls[1][1]).toEqual('keyboard');
    });

  });




  describe(`Accessibility`, function() {

    test(`should have the correct role and aria labels on triggers`, function() {
      const fixture = createComponent<testComponents.SinglePanel>(testComponents.SinglePanel);
      fixture.detectChanges();
      const triggerElement = getTriggerElement(fixture);

      expect(triggerElement.getAttribute('aria-controls')).toEqual(expect.stringContaining('cdk-accordion-child-'));
      expect(triggerElement.getAttribute('role')).toEqual('button');
    });


    test(`should have the correct role and aria labels on panels`, function() {
      const fixture = createComponent<testComponents.SinglePanel>(testComponents.SinglePanel);
      fixture.detectChanges();
      const panelDebugElement = getPanelDebugElement(fixture);
      const panelElement = panelDebugElement.nativeElement.querySelector('.ts-expansion-panel__content');

      expect(panelElement.getAttribute('role')).toEqual('region');
      expect(panelElement.getAttribute('aria-labelledby')).toEqual(expect.stringContaining('ts-expansion-panel-trigger-'));
      expect(panelElement.getAttribute('aria-hidden')).toEqual('true');

      togglePanel(fixture);

      expect(panelElement.getAttribute('aria-hidden')).toEqual('false');
    });

  });


  describe(`contentContainsFocus`, function() {

    test(`should return false if the panel doesn't exist`, function() {
      const fixture = createComponent<testComponents.SinglePanel>(testComponents.SinglePanel);
      fixture.detectChanges();
      const panel = getPanelInstance(fixture);
      panel.panelBody = undefined as any;
      fixture.detectChanges();

      expect(panel.contentContainsFocus).toEqual(false);
    });

  });

});
