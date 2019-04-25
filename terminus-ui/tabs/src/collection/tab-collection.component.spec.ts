import { CommonModule } from '@angular/common';
import {
  async,
  ComponentFixture,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { KEYS } from '@terminus/ngx-tools/keycodes';
import {
  createComponent,
  dispatchFakeEvent,
} from '@terminus/ngx-tools/testing';
import {
  TsTabCollectionComponent,
  TsTabComponent,
  TsTabsModule,
} from '@terminus/ui/tabs';
import * as testComponents from '@terminus/ui/tabs/testing';
// eslint-disable-next-line no-duplicate-imports
import {
  checkSelectedIndex,
  getAllTabLabelElements,
  getSelectedContentElement,
  getSelectedLabelElement,
  getTabBodyWrapperElement,
  getTabCollectionInstance,
  getTabLabelElement,
} from '@terminus/ui/tabs/testing';


const IMPORTS = [
  CommonModule,
  NoopAnimationsModule,
  TsTabsModule,
];


describe(`TsTabCollectionComponent`, function() {

  describe(`basic behavior`, function() {
    let fixture: ComponentFixture<testComponents.Basic>;
    let element: HTMLElement;

    beforeEach(() => {
      fixture = createComponent<testComponents.Basic>(testComponents.Basic, undefined, IMPORTS);
      element = fixture.nativeElement;
    });


    test(`should default to the first tab`, function() {
      checkSelectedIndex(fixture, 1);
    });


    test(`will properly load content on first change detection pass`, () => {
      fixture.detectChanges();
      expect(element.querySelectorAll('.ts-tab-body')[1].querySelectorAll('span').length).toBe(3);
    });


    test(`should support two-way binding for selectedIndex`, fakeAsync(() => {
      const component = fixture.componentInstance;
      component.selectedIndex = 0;
      fixture.detectChanges();

      const tabLabel = getTabLabelElement(fixture, 0, 1);
      tabLabel.click();
      fixture.detectChanges();
      tick();

      expect(component.selectedIndex).toBe(1);
    }));


    // NOTE: needs to be `async` in order to fail when we expect it to.
    test(`should set to correct tab on fast change`, async(() => {
      const component = fixture.componentInstance;
      component.selectedIndex = 0;
      fixture.detectChanges();

      setTimeout(() => {
        component.selectedIndex = 1;
        fixture.detectChanges();

        setTimeout(() => {
          component.selectedIndex = 0;
          fixture.detectChanges();
          fixture.whenStable().then(() => {
            expect(component.selectedIndex).toBe(0);
          });
        }, 1);
      }, 1);
    }));


    test(`should change tabs based on selectedIndex`, fakeAsync(() => {
      const component = fixture.componentInstance;
      const tabComponent = getTabCollectionInstance(fixture);
      jest.spyOn(component, 'handleSelection');

      checkSelectedIndex(fixture, 1);

      tabComponent.selectedIndex = 2;

      checkSelectedIndex(fixture, 2);
      tick();

      expect(component.handleSelection).toHaveBeenCalledTimes(1);
      expect(component.selectEvent.index).toBe(2);
    }));


    test(`should update tab positions when selected index is changed`, () => {
      fixture.detectChanges();
      const component: TsTabCollectionComponent = getTabCollectionInstance(fixture);
      const tabs: TsTabComponent[] = component.tabs.toArray();

      expect(tabs[0].position).toBeLessThan(0);
      expect(tabs[1].position).toBe(0);
      expect(tabs[2].position).toBeGreaterThan(0);

      // Move to third tab
      component.selectedIndex = 2;
      fixture.detectChanges();
      expect(tabs[0].position).toBeLessThan(0);
      expect(tabs[1].position).toBeLessThan(0);
      expect(tabs[2].position).toBe(0);

      // Move to the first tab
      component.selectedIndex = 0;
      fixture.detectChanges();
      expect(tabs[0].position).toBe(0);
      expect(tabs[1].position).toBeGreaterThan(0);
      expect(tabs[2].position).toBeGreaterThan(0);
    });


    test(`should clamp the selected index to the size of the number of tabs`, () => {
      fixture.detectChanges();
      const component: TsTabCollectionComponent = getTabCollectionInstance(fixture);

      // Set the index to be negative, expect first tab selected
      fixture.componentInstance.selectedIndex = -1;
      fixture.detectChanges();
      expect(component.selectedIndex).toBe(0);

      // Set the index beyond the size of the tabs, expect last tab selected
      fixture.componentInstance.selectedIndex = 3;
      fixture.detectChanges();
      expect(component.selectedIndex).toBe(2);
    });


    test(`should not crash when setting the selected index to NaN`, () => {
      const component = fixture.debugElement.componentInstance;

      expect(() => {
        component.selectedIndex = NaN;
        fixture.detectChanges();
      }).not.toThrow();
    });


    test(`should show ripples for tab-group labels`, () => {
      fixture.detectChanges();

      const testElement = fixture.nativeElement;
      const tabLabelElement = getTabLabelElement(fixture, 0, 1);

      expect(testElement.querySelectorAll('.mat-ripple-element').length).toEqual(0);

      dispatchFakeEvent(tabLabelElement, 'mousedown');
      dispatchFakeEvent(tabLabelElement, 'mouseup');

      expect(testElement.querySelectorAll('.mat-ripple-element').length).toEqual(1);
    });


    test(`should set the isActive flag on each of the tabs`, fakeAsync(() => {
      fixture.detectChanges();
      tick();

      const component: TsTabCollectionComponent = getTabCollectionInstance(fixture);
      const tabs = component.tabs.toArray();

      expect(tabs[0].isActive).toBe(false);
      expect(tabs[1].isActive).toBe(true);
      expect(tabs[2].isActive).toBe(false);

      fixture.componentInstance.selectedIndex = 2;
      fixture.detectChanges();
      tick();

      expect(tabs[0].isActive).toBe(false);
      expect(tabs[1].isActive).toBe(false);
      expect(tabs[2].isActive).toBe(true);
    }));


    test(`should fire animation done event`, fakeAsync(() => {
      fixture.detectChanges();
      fixture.componentInstance.animationFinished = jest.fn();
      const tabLabel = getTabLabelElement(fixture, 0, 1);

      tabLabel.click();
      fixture.detectChanges();
      tick();

      expect(fixture.componentInstance.animationFinished).toHaveBeenCalledTimes(1);
    }));


    test(`should add the proper 'aria-setsize' and 'aria-posinset'`, () => {
      fixture.detectChanges();
      const labels = getAllTabLabelElements(fixture);

      expect(labels.map(label => label.getAttribute('aria-posinset'))).toEqual(['1', '2', '3']);
      expect(labels.every(label => label.getAttribute('aria-setsize') === '3')).toBe(true);
    });


    test(`should emit focusChange event on click`, () => {
      jest.spyOn(fixture.componentInstance, 'handleFocus');
      fixture.detectChanges();
      const labelElement = getTabLabelElement(fixture, 0, 1);

      expect(fixture.componentInstance.handleFocus).toHaveBeenCalledTimes(0);

      labelElement.click();
      fixture.detectChanges();

      expect(fixture.componentInstance.handleFocus).toHaveBeenCalledTimes(1);
      expect(fixture.componentInstance.handleFocus).toHaveBeenCalledWith(expect.objectContaining({
        index: 1,
      }));
    });


    test(`should emit focusChange on arrow key navigation`, () => {
      jest.spyOn(fixture.componentInstance, 'handleFocus');
      fixture.detectChanges();

      // const tabLabels = getAllTabLabelElements(fixture);
      const tabLabels = fixture.debugElement.queryAll(By.css('.ts-tab-label'));
      const tabLabelContainer = fixture.debugElement.query(By.css('.ts-tab-header__labels-container')).nativeElement as HTMLElement;

      expect(fixture.componentInstance.handleFocus).toHaveBeenCalledTimes(0);

      // In order to verify that the `focusChange` event also fires with the correct index,
      // we focus the second tab before testing the keyboard navigation
      tabLabels[1].nativeElement.click();
      fixture.detectChanges();

      expect(fixture.componentInstance.handleFocus).toHaveBeenCalledTimes(1);

      const KEY_EVENT = document.createEvent('KeyboardEvent');
      KEY_EVENT.initEvent('keydown', true, false);
      Object.defineProperties(KEY_EVENT, {
        code: {
          get: () => KEYS.LEFT_ARROW.code,
        },
        key: {
          get: () => KEYS.LEFT_ARROW.code,
        },
        keyCode: {
          get: () => KEYS.LEFT_ARROW.keyCode,
        },
      });
      tabLabelContainer.dispatchEvent(KEY_EVENT);
      fixture.detectChanges();

      expect(fixture.componentInstance.handleFocus).toHaveBeenCalledTimes(2);
      expect(fixture.componentInstance.handleFocus).toHaveBeenCalledWith(expect.objectContaining({
        index: 0,
      }));
    });

  });


  describe(`basic`, function() {

    test(`should support a tab-group with the simple api`, fakeAsync(() => {
      const fixture = createComponent<testComponents.SimpleLabels>(testComponents.SimpleLabels, undefined, IMPORTS);
      fixture.detectChanges();
      const instance = getTabCollectionInstance(fixture);
      const label = getTabLabelElement(fixture);

      expect(getSelectedLabelElement(fixture).textContent).toMatch('Foo');
      expect(getSelectedContentElement(fixture).textContent).toMatch('foo content');

      instance.selectedIndex = 1;
      fixture.detectChanges();
      tick();

      expect(getSelectedLabelElement(fixture).textContent).toMatch('Bar');
      expect(getSelectedContentElement(fixture).textContent).toMatch('bar content');

      fixture.componentInstance.otherLabel = 'Baz';
      fixture.componentInstance.otherContent = 'baz content';
      fixture.detectChanges();

      expect(getSelectedLabelElement(fixture).textContent).toMatch('Baz');
      expect(getSelectedContentElement(fixture).textContent).toMatch('baz content');

    }));


    test(`should support @ViewChild in the tab content`, () => {
      const fixture = createComponent<testComponents.SimpleLabels>(testComponents.SimpleLabels, undefined, IMPORTS);
      expect(fixture.componentInstance.testSelector).toBeTruthy();
    });


    test(`should only have the active tab in the DOM`, fakeAsync(() => {
      const fixture = createComponent<testComponents.SimpleLabels>(testComponents.SimpleLabels, undefined, IMPORTS);
      fixture.detectChanges();
      const instance = getTabCollectionInstance(fixture);

      expect(fixture.nativeElement.textContent).toContain('foo content');
      expect(fixture.nativeElement.textContent).not.toContain('bar content');

      instance.selectedIndex = 1;
      fixture.detectChanges();
      tick();

      expect(fixture.nativeElement.textContent).not.toContain('foo content');
      expect(fixture.nativeElement.textContent).toContain('bar content');
    }));


    test(`should support setting the header position`, () => {
      const fixture = createComponent<testComponents.SimpleLabels>(testComponents.SimpleLabels, undefined, IMPORTS);
      fixture.detectChanges();
      const instance = getTabCollectionInstance(fixture);
      const tabGroupNode = fixture.debugElement.query(By.css('ts-tab-collection')).nativeElement;

      expect(tabGroupNode.classList).not.toContain('ts-tab-collection--inverted-header');

      instance.headerPosition = 'below';
      fixture.detectChanges();

      expect(tabGroupNode.classList).toContain('ts-tab-collection--inverted-header');
    });

  });


  describe(`aria labelling`, () => {
    let fixture: ComponentFixture<testComponents.CollectionWithAriaInputs>;
    let tab: HTMLElement;
    let tabElement: HTMLElement;

    beforeEach(fakeAsync(() => {
      fixture = createComponent<testComponents.CollectionWithAriaInputs>(testComponents.CollectionWithAriaInputs, undefined, IMPORTS);
      fixture.detectChanges();
      tick();
      tab = fixture.nativeElement.querySelector('.ts-tab-label');
      tabElement = getTabLabelElement(fixture);
    }));


    test(`should not set aria-label or aria-labelledby attributes if they are not passed in`, () => {
      expect(tabElement.hasAttribute('aria-label')).toEqual(false);
      expect(tabElement.hasAttribute('aria-labelledby')).toEqual(false);
    });


    test(`should set the aria-label attribute`, () => {
      fixture.componentInstance.ariaLabel = 'Foo';
      fixture.detectChanges();

      expect(tab.getAttribute('aria-label')).toEqual('Foo');
    });

    test(`should set the aria-labelledby attribute`, () => {
      fixture.componentInstance.ariaLabelledby = 'foo-bar';
      fixture.detectChanges();

      expect(tab.getAttribute('aria-labelledby')).toEqual('foo-bar');
    });


    test(`should not be able to set both an aria-label and aria-labelledby`, () => {
      fixture.componentInstance.ariaLabel = 'Foo';
      fixture.componentInstance.ariaLabelledby = 'foo-bar';
      fixture.detectChanges();

      expect(tab.getAttribute('aria-label')).toBe('Foo');
      expect(tab.hasAttribute('aria-labelledby')).toEqual(false);
    });

  });


  describe(`disable tabs`, () => {
    let fixture: ComponentFixture<testComponents.DisabledTabsTestApp>;

    beforeEach(() => {
      fixture = createComponent<testComponents.DisabledTabs>(testComponents.DisabledTabs, undefined, IMPORTS);
    });


    test(`should set the disabled flag on tab`, () => {
      fixture.detectChanges();

      const instance = getTabCollectionInstance(fixture);
      const tabs = instance.tabs.toArray();
      let disabledLabels = fixture.debugElement.queryAll(By.css('.ts-tab-label--disabled'));
      expect(tabs[1].isDisabled).toBe(false);
      expect(disabledLabels.length).toBe(0);

      fixture.componentInstance.isDisabled = true;
      fixture.detectChanges();

      expect(tabs[1].isDisabled).toBe(true);
      disabledLabels = fixture.debugElement.queryAll(By.css('.ts-tab-label--disabled'));
      expect(disabledLabels.length).toBe(1);
      expect(disabledLabels[0].nativeElement.getAttribute('aria-disabled')).toEqual('true');
    });

  });


  describe(`dynamic binding tabs`, () => {
    let fixture: ComponentFixture<testComponents.DynamicTabs>;

    beforeEach(fakeAsync(() => {
      fixture = createComponent<testComponents.DynamicTabs>(testComponents.DynamicTabs, undefined, IMPORTS);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
    }));


    test(`should be able to add a new tab, select it, and have correct origin position`,
      fakeAsync(() => {
        const component: TsTabCollectionComponent = getTabCollectionInstance(fixture);

        let tabs: TsTabComponent[] = component.tabs.toArray();
        expect(tabs[0].origin).toBe(null);
        expect(tabs[1].origin).toBe(0);
        expect(tabs[2].origin).toBe(null);

        // Add a new tab on the right and select it, expect an origin >= than 0 (animate right)
        fixture.componentInstance.tabs.push({
          label: 'New tab',
          content: 'to right of index',
        });
        fixture.componentInstance.selectedIndex = 4;
        fixture.detectChanges();
        tick();

        tabs = component.tabs.toArray();
        expect(tabs[3].origin).toBeGreaterThanOrEqual(0);

        // Add a new tab in the beginning and select it, expect an origin < than 0 (animate left)
        fixture.componentInstance.selectedIndex = 0;
        fixture.detectChanges();
        tick();

        fixture.componentInstance.tabs.push({
          label: 'New tab',
          content: 'to left of index',
        });
        fixture.detectChanges();
        tick();

        tabs = component.tabs.toArray();
        expect(tabs[0].origin).toBeLessThan(0);
      }));


    test(`should update selected index if the last tab removed while selected`, fakeAsync(() => {
      const component: TsTabCollectionComponent = getTabCollectionInstance(fixture);

      const numberOfTabs = component.tabs.length;
      fixture.componentInstance.selectedIndex = numberOfTabs - 1;
      fixture.detectChanges();
      tick();

      // Remove last tab while last tab is selected, expect next tab over to be selected
      fixture.componentInstance.tabs.pop();
      fixture.detectChanges();
      tick();

      expect(component.selectedIndex).toBe(numberOfTabs - 2);
    }));


    test(`should maintain the selected tab if a new tab is added`, () => {
      fixture.detectChanges();
      const component: TsTabCollectionComponent = getTabCollectionInstance(fixture);

      fixture.componentInstance.selectedIndex = 1;
      fixture.detectChanges();

      // Add a new tab at the beginning.
      fixture.componentInstance.tabs.unshift({
        label: 'New tab',
        content: 'at the start',
      });
      fixture.detectChanges();

      expect(component.selectedIndex).toBe(2);
      expect(component.tabs.toArray()[2].isActive).toBe(true);
    });


    test(`should maintain the selected tab if a tab is removed`, () => {
      // Select the second tab.
      fixture.componentInstance.selectedIndex = 1;
      fixture.detectChanges();
      const component: TsTabCollectionComponent = getTabCollectionInstance(fixture);

      // Remove the first tab that is right before the selected one.
      fixture.componentInstance.tabs.splice(0, 1);
      fixture.detectChanges();

      // Since the first tab has been removed and the second one was selected before, the selected
      // tab moved one position to the right. Meaning that the tab is now the first tab.
      expect(component.selectedIndex).toBe(0);
      expect(component.tabs.toArray()[0].isActive).toBe(true);
    });


    test(`should be able to select a new tab after creation`, fakeAsync(() => {
      fixture.detectChanges();
      const component: TsTabCollectionComponent = getTabCollectionInstance(fixture);

      fixture.componentInstance.tabs.push({
        label: 'Last tab',
        content: 'at the end',
      });
      fixture.componentInstance.selectedIndex = 3;

      fixture.detectChanges();
      tick();

      expect(component.selectedIndex).toBe(3);
      expect(component.tabs.toArray()[3].isActive).toBe(true);
    }));


    test(`should not fire 'selectedTabChange' when the amount of tabs changes`, fakeAsync(() => {
      fixture.detectChanges();
      fixture.componentInstance.selectedIndex = 1;
      fixture.detectChanges();

      // Add a new tab at the beginning.
      jest.spyOn(fixture.componentInstance, 'handleSelection');
      fixture.componentInstance.tabs.unshift({
        label: 'New tab',
        content: 'at the start',
      });
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      expect(fixture.componentInstance.handleSelection).not.toHaveBeenCalled();
    }));

  });


  describe(`async tabs`, () => {
    let fixture: ComponentFixture<testComponents.AsyncTabs>;

    it(`should show tabs when they are available`, fakeAsync(() => {
      fixture = createComponent<testComponents.AsyncTabs>(testComponents.AsyncTabs, undefined, IMPORTS);

      expect(fixture.debugElement.queryAll(By.css('.ts-tab-label')).length).toBe(0);

      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      tick();

      expect(fixture.debugElement.queryAll(By.css('.ts-tab-label')).length).toBe(2);
    }));
  });


  describe(`lazy loaded tabs`, () => {

    test(`should lazy load the second tab`, fakeAsync(() => {
      const fixture = createComponent<testComponents.TemplateTabs>(testComponents.TemplateTabs, undefined, IMPORTS);
      fixture.detectChanges();
      tick();

      let child = fixture.debugElement.query(By.css('.child'));
      expect(child).toEqual(null);

      const secondLabel = getTabLabelElement(fixture, 0, 1);
      secondLabel.click();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      child = fixture.debugElement.query(By.css('.child'));
      expect(child.nativeElement).toBeDefined();
    }));

  });


  // NOTE: Jest doesn't render the element, so we need to test the height method directly
  describe(`setTabBodyWrapperHeight`, function() {

    test(`should set the height to tabBodyWrapperHeight if it exists`, () => {
      const fixture = createComponent<testComponents.DynamicHeight>(testComponents.DynamicHeight, undefined, IMPORTS);
      fixture.detectChanges();
      const instance = getTabCollectionInstance(fixture);

      expect(instance.setTabBodyWrapperHeight(10)).toEqual(undefined);

      // Set a fake existing height (would normally be set during initialization)
      instance['tabBodyWrapperHeight'] = 50;
      fixture.detectChanges();

      instance.setTabBodyWrapperHeight(75);
      fixture.detectChanges();

      const element = getTabBodyWrapperElement(fixture);
      expect(element.style.height).toEqual('50px');
    });


    test(`should set the height to the passed in height if the wrapper has an offset height`, function() {
      const fixture = createComponent<testComponents.DynamicHeight>(testComponents.DynamicHeight, undefined, IMPORTS);
      fixture.detectChanges();
      const instance = getTabCollectionInstance(fixture);
      // Set a fake existing height (this would normally be set during initialization)
      instance['tabBodyWrapperHeight'] = 50;
      fixture.detectChanges();


      const bodyInstance = fixture.debugElement.query(By.css('.ts-tab-body')).componentInstance;
      Object.defineProperties(instance.tabBodyWrapper.nativeElement, {
        offsetHeight: {
          get: () => '80px',
        },
      });

      instance.setTabBodyWrapperHeight(75);
      fixture.detectChanges();

      const element = getTabBodyWrapperElement(fixture);
      expect(element.style.height).toEqual('75px');
    });

  });


  describe(`realignInkBar`, function() {

    test(`should call to align ink bar to selected tab`, function() {
      const fixture = createComponent<testComponents.Basic>(testComponents.Basic, undefined, IMPORTS);
      const hostComponent = fixture.componentInstance;
      const instance = getTabCollectionInstance(fixture);
      instance.tabHeader.alignInkBarToSelectedTab = jest.fn();
      instance.realignInkBar();

      expect(instance.tabHeader.alignInkBarToSelectedTab).toHaveBeenCalled();
    });

  });


});
