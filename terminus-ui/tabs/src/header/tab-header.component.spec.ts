import {
  MutationObserverFactory,
  ObserversModule,
} from '@angular/cdk/observers';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import {
  ComponentFixture,
  discardPeriodicTasks,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { MatRippleModule } from '@angular/material';
import { By } from '@angular/platform-browser';
import {
  KeyCode,
  KEYS,
} from '@terminus/ngx-tools/keycodes';
import { dispatchFakeEvent } from '@terminus/ngx-tools/testing';
import {
  TsTabHeaderComponent,
  TsTabInkBarComponent,
  TsTabLabelWrapperDirective,
} from '@terminus/ui/tabs';
import * as testComponents from '@terminus/ui/tabs/testing';



function createKeydownEvent(key: KeyCode): KeyboardEvent {
  const event = document.createEvent('KeyboardEvent');
  event.initEvent('keydown', true, false);
  Object.defineProperties(event, {
    keyCode: { get: () => key.keyCode },
    key: { get: () => key.code },
    code: { get: () => key.code },
  });
  event.preventDefault = jest.fn();
  return event;
}


describe(`TsTabHeaderComponent`, function() {
  let fixture: ComponentFixture<testComponents.TabHeader>;
  let hostComponent: testComponents.TabHeader;
  let EVENTS;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, PortalModule, MatRippleModule, ScrollingModule, ObserversModule],
      declarations: [
        TsTabHeaderComponent,
        TsTabInkBarComponent,
        TsTabLabelWrapperDirective,
        testComponents.TabHeader,
      ],
    });

    TestBed.compileComponents();

    EVENTS = {
      LEFT: createKeydownEvent(KEYS.LEFT_ARROW),
      RIGHT: createKeydownEvent(KEYS.RIGHT_ARROW),
      ENTER: createKeydownEvent(KEYS.ENTER),
      SPACE: createKeydownEvent(KEYS.SPACE),
      HOME: createKeydownEvent(KEYS.HOME),
      END: createKeydownEvent(KEYS.END),
    };
  });


  describe(`focusing`, () => {
    let tabListContainer: HTMLElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(testComponents.TabHeader);
      fixture.detectChanges();

      hostComponent = fixture.componentInstance;
      tabListContainer = hostComponent.tabHeader.tabListContainer.nativeElement;
    });


    test(`should initialize to the selected index`, () => {
      fixture.detectChanges();
      expect(hostComponent.tabHeader.focusIndex).toEqual(hostComponent.selectedIndex);
    });


    test(`should send the focus change event`, () => {
      hostComponent.tabHeader.focusIndex = 2;
      fixture.detectChanges();
      expect(hostComponent.tabHeader.focusIndex).toEqual(2);
    });


    test(`should not set focus to a disabled tab`, () => {
      hostComponent.tabHeader.focusIndex = 0;
      fixture.detectChanges();
      expect(hostComponent.tabHeader.focusIndex).toEqual(0);

      // Set focus on the disabled tab, but focus should remain 0
      hostComponent.tabHeader.focusIndex = hostComponent.disabledTabIndex;
      fixture.detectChanges();
      expect(hostComponent.tabHeader.focusIndex).toEqual(0);
    });


    test(`should move focus right and skip disabled tabs`, () => {
      hostComponent.tabHeader.focusIndex = 0;
      fixture.detectChanges();
      expect(hostComponent.tabHeader.focusIndex).toEqual(0);

      // Move focus right, verify that the disabled tab is 1 and should be skipped
      expect(hostComponent.disabledTabIndex).toEqual(1);
      tabListContainer.dispatchEvent(EVENTS.RIGHT);
      fixture.detectChanges();
      expect(hostComponent.tabHeader.focusIndex).toEqual(2);

      // Move focus right to index 3
      tabListContainer.dispatchEvent(EVENTS.RIGHT);
      fixture.detectChanges();
      expect(hostComponent.tabHeader.focusIndex).toEqual(3);
    });


    test(`should move focus left and skip disabled tabs`, () => {
      hostComponent.tabHeader.focusIndex = 3;
      fixture.detectChanges();
      expect(hostComponent.tabHeader.focusIndex).toEqual(3);

      // Move focus left to index 3
      tabListContainer.dispatchEvent(EVENTS.LEFT);
      fixture.detectChanges();
      expect(hostComponent.tabHeader.focusIndex).toEqual(2);

      // Move focus left, verify that the disabled tab is 1 and should be skipped
      expect(hostComponent.disabledTabIndex).toEqual(1);
      tabListContainer.dispatchEvent(EVENTS.LEFT);
      fixture.detectChanges();
      expect(hostComponent.tabHeader.focusIndex).toEqual(0);
    });


    test(`should support key down events to move and select focus`, () => {
      hostComponent.tabHeader.focusIndex = 0;
      fixture.detectChanges();
      expect(hostComponent.tabHeader.focusIndex).toEqual(0);

      // Move focus right to 2
      tabListContainer.dispatchEvent(EVENTS.RIGHT);
      fixture.detectChanges();
      expect(hostComponent.tabHeader.focusIndex).toEqual(2);

      // Select the focused index 2
      expect(hostComponent.selectedIndex).toEqual(0);
      tabListContainer.dispatchEvent(EVENTS.ENTER);
      fixture.detectChanges();
      expect(hostComponent.selectedIndex).toEqual(2);
      expect(EVENTS.ENTER.preventDefault).toHaveBeenCalled();

      // Move focus right to 0
      tabListContainer.dispatchEvent(EVENTS.LEFT);
      fixture.detectChanges();
      expect(hostComponent.tabHeader.focusIndex).toEqual(0);

      // Select the focused 0 using space.
      expect(hostComponent.selectedIndex).toEqual(2);
      tabListContainer.dispatchEvent(EVENTS.SPACE);
      fixture.detectChanges();
      expect(hostComponent.selectedIndex).toEqual(0);
      expect(EVENTS.SPACE.preventDefault).toHaveBeenCalled();
    });


    test(`should move focus to the first tab when pressing HOME`, () => {
      hostComponent.tabHeader.focusIndex = 3;
      fixture.detectChanges();
      expect(hostComponent.tabHeader.focusIndex).toEqual(3);

      tabListContainer.dispatchEvent(EVENTS.HOME);
      fixture.detectChanges();

      expect(hostComponent.tabHeader.focusIndex).toEqual(0);
      expect(EVENTS.HOME.preventDefault).toHaveBeenCalled();
    });


    test(`should skip disabled items when moving focus using HOME`, () => {
      hostComponent.tabHeader.focusIndex = 3;
      hostComponent.tabs[0].disabled = true;
      fixture.detectChanges();
      expect(hostComponent.tabHeader.focusIndex).toEqual(3);

      tabListContainer.dispatchEvent(EVENTS.HOME);
      fixture.detectChanges();

      // Note that the second tab is disabled by default already.
      expect(hostComponent.tabHeader.focusIndex).toEqual(2);
      expect(EVENTS.HOME.preventDefault).toHaveBeenCalled();
    });


    test(`should move focus to the last tab when pressing END`, () => {
      hostComponent.tabHeader.focusIndex = 0;
      fixture.detectChanges();
      expect(hostComponent.tabHeader.focusIndex).toEqual(0);

      tabListContainer.dispatchEvent(EVENTS.END);
      fixture.detectChanges();

      expect(hostComponent.tabHeader.focusIndex).toEqual(3);
      expect(EVENTS.END.preventDefault).toHaveBeenCalled();
    });


    test(`should skip disabled items when moving focus using END`, () => {
      hostComponent.tabHeader.focusIndex = 0;
      hostComponent.tabs[3].disabled = true;
      fixture.detectChanges();
      expect(hostComponent.tabHeader.focusIndex).toEqual(0);

      tabListContainer.dispatchEvent(EVENTS.END);
      fixture.detectChanges();

      expect(hostComponent.tabHeader.focusIndex).toEqual(2);
    });


    test(`should not do anything if a modifier key is pressed`, () => {
      [EVENTS.RIGHT, EVENTS.ENTER].forEach(event => {
        Object.defineProperty(event, 'shiftKey', { get: () => true });
      });

      hostComponent.tabHeader.focusIndex = 0;
      fixture.detectChanges();
      expect(hostComponent.tabHeader.focusIndex).toEqual(0);

      tabListContainer.dispatchEvent(EVENTS.RIGHT);
      fixture.detectChanges();
      expect(hostComponent.tabHeader.focusIndex).toEqual(0);
      expect(EVENTS.RIGHT.preventDefault).not.toHaveBeenCalled();

      expect(hostComponent.selectedIndex).toEqual(0);
      tabListContainer.dispatchEvent(EVENTS.ENTER);
      fixture.detectChanges();
      expect(hostComponent.selectedIndex).toEqual(0);
      expect(EVENTS.ENTER.preventDefault).not.toHaveBeenCalled();
    });

  });


  describe(`pagination`, () => {

    describe(`ltr`, () => {
      let listElement: HTMLElement;
      let containerElement: HTMLElement;
      let tabElements: HTMLElement[];
      let updateDimensions: Function;


      beforeEach(() => {
        fixture = TestBed.createComponent(testComponents.TabHeader);
        fixture.detectChanges();
        hostComponent = fixture.componentInstance;

        // NOTE: List is 300px wide - Each tab is 100px wide
        updateDimensions = function() {
          // Mock dimensions
          listElement = hostComponent.tabHeader.tabList.nativeElement;
          containerElement = hostComponent.tabHeader.tabListContainer.nativeElement;
          tabElements = fixture.debugElement.queryAll(By.directive(TsTabLabelWrapperDirective)).map(d => d.nativeElement);

          // Set list scrollWidth
          Object.defineProperties(listElement, { scrollWidth: { get: () => tabElements.length * 100 } });

          // Set container width
          Object.defineProperties(containerElement, { offsetWidth: { get: () => 300 } });

          // Set tabs width and position
          for (let i = 0; i < tabElements.length; i += 1) {
            Object.defineProperties(tabElements[i], {
              offsetLeft: { get: () => i * 100 },
              offsetWidth: { get: () => 100 },
            });
          }
        };

        updateDimensions();
      });


      test(`should show width when tab list width exceeds container`, () => {
        fixture.detectChanges();
        expect(hostComponent.tabHeader.showPaginationControls).toEqual(false);

        // Add enough tabs that it will obviously exceed the width
        hostComponent.addTabsForScrolling();
        fixture.detectChanges();

        expect(hostComponent.tabHeader.showPaginationControls).toEqual(true);
      });


      test(`should scroll to show the focused tab label`, () => {
        hostComponent.addTabsForScrolling();
        fixture.detectChanges();
        expect(hostComponent.tabHeader.scrollDistance).toEqual(0);
        updateDimensions();

        // Focus on the last tab, expect this to be the maximum scroll distance.
        hostComponent.tabHeader.focusIndex = hostComponent.tabs.length - 1;
        fixture.detectChanges();

        expect(hostComponent.tabHeader.scrollDistance).toEqual(hostComponent.tabHeader.getMaxScrollDistance());

        // Focus on the first tab, expect this to be the maximum scroll distance.
        hostComponent.tabHeader.focusIndex = 0;
        fixture.detectChanges();
        expect(hostComponent.tabHeader.scrollDistance).toEqual(0);
        expect.assertions(3);
      });


      test(`should show ripples for pagination buttons`, () => {
        hostComponent.addTabsForScrolling();
        fixture.detectChanges();

        expect(hostComponent.tabHeader.showPaginationControls).toEqual(true);

        const buttonAfter = fixture.debugElement.query(By.css('.ts-tab-header__pagination--after'));

        expect(fixture.nativeElement.querySelectorAll('.mat-ripple-element').length).toEqual(0);
        dispatchFakeEvent(buttonAfter.nativeElement, 'mousedown');
        dispatchFakeEvent(buttonAfter.nativeElement, 'mouseup');

        expect(fixture.nativeElement.querySelectorAll('.mat-ripple-element').length).toEqual(1);
      });

    });


    describe(`scrolling when holding paginator`, () => {
      let nextButton: HTMLElement;
      let prevButton: HTMLElement;
      let header: TsTabHeaderComponent;
      let headerElement: HTMLElement;
      let listElement: HTMLElement;
      let containerElement: HTMLElement;
      let tabElements: HTMLElement[];
      let updateDimensions: Function;

      beforeEach(() => {
        fixture = TestBed.createComponent(testComponents.TabHeader);
        hostComponent = fixture.componentInstance;
        hostComponent.addTabsForScrolling(50);
        fixture.detectChanges();

        nextButton = fixture.nativeElement.querySelector('.ts-tab-header__pagination--after');
        prevButton = fixture.nativeElement.querySelector('.ts-tab-header__pagination--before');
        header = fixture.componentInstance.tabHeader;
        headerElement = fixture.nativeElement.querySelector('.ts-tab-header');

        // NOTE: List is 300px wide - Each tab is 100px wide
        updateDimensions = function() {
          // Mock dimensions
          listElement = hostComponent.tabHeader.tabList.nativeElement;
          containerElement = hostComponent.tabHeader.tabListContainer.nativeElement;
          tabElements = fixture.debugElement.queryAll(By.directive(TsTabLabelWrapperDirective)).map(d => d.nativeElement);

          // Set list scrollWidth
          Object.defineProperties(listElement, { scrollWidth: { get: () => tabElements.length * 100 } });

          // Set container width
          Object.defineProperties(containerElement, { offsetWidth: { get: () => 300 } });

          // Set tabs width and position
          for (let i = 0; i < tabElements.length; i += 1) {
            Object.defineProperties(tabElements[i], {
              offsetLeft: { get: () => i * 100 },
              offsetWidth: { get: () => 100 },
            });
          }
        };

        updateDimensions();
      });


      test(`should scroll towards the end while holding down the next button using a mouse`, fakeAsync(() => {
        assertNextButtonScrolling('mousedown', 'click');
      }));


      test(`should scroll towards the start while holding down the prev button using a mouse`, fakeAsync(() => {
        assertPrevButtonScrolling('mousedown', 'click');
      }));


      test(`should scroll towards the end while holding down the next button using touch`, fakeAsync(() => {
        assertNextButtonScrolling('touchstart', 'touchend');
      }));


      test(`should scroll towards the start while holding down the prev button using touch`, fakeAsync(() => {
        assertPrevButtonScrolling('touchstart', 'touchend');
      }));


      test(`should not scroll if the sequence is interrupted quickly`, fakeAsync(() => {
        // Start not scrolled
        expect(header.scrollDistance).toBe(0);

        dispatchFakeEvent(nextButton, 'mousedown');
        fixture.detectChanges();

        tick(100);

        dispatchFakeEvent(headerElement, 'mouseleave');
        fixture.detectChanges();

        tick(3000);

        // Expect not to have scrolled
        expect(header.scrollDistance).toBe(0);
      }));


      test(`should clear the timeouts on destroy`, fakeAsync(() => {
        dispatchFakeEvent(nextButton, 'mousedown');
        fixture.detectChanges();
        fixture.destroy();

        // No need to assert. If fakeAsync doesn't throw, it means that the timers were cleared.
      }));


      test(`should clear the timeouts on click`, fakeAsync(() => {
        dispatchFakeEvent(nextButton, 'mousedown');
        fixture.detectChanges();

        dispatchFakeEvent(nextButton, 'click');
        fixture.detectChanges();

        // No need to assert. If fakeAsync doesn't throw, it means that the timers were cleared.
      }));


      test(`should clear the timeouts on touchend`, fakeAsync(() => {
        dispatchFakeEvent(nextButton, 'touchstart');
        fixture.detectChanges();

        dispatchFakeEvent(nextButton, 'touchend');
        fixture.detectChanges();

        // No need to assert. If fakeAsync doesn't throw, it means that the timers were cleared.
      }));


      test(`should clear the timeouts when reaching the end`, fakeAsync(() => {
        dispatchFakeEvent(nextButton, 'mousedown');
        fixture.detectChanges();

        // Simulate a very long timeout.
        tick(60000);

        // No need to assert. If fakeAsync doesn't throw, it means that the timers were cleared.
      }));


      test(`should clear the timeouts when reaching the start`, fakeAsync(() => {
        header.scrollDistance = Infinity;
        fixture.detectChanges();

        dispatchFakeEvent(prevButton, 'mousedown');
        fixture.detectChanges();

        // Simulate a very long timeout.
        tick(60000);

        // No need to assert. If fakeAsync doesn't throw, it means that the timers were cleared.
      }));


      test(`should stop scrolling if the pointer leaves the header`, fakeAsync(() => {
        // Start not scrolled
        expect(header.scrollDistance).toBe(0);

        dispatchFakeEvent(nextButton, 'mousedown');
        fixture.detectChanges();
        tick(300);

        // Expect not to have scrolled after short time
        expect(header.scrollDistance).toBe(0);

        tick(1000);

        // Expect to scroll after some time
        expect(header.scrollDistance).toBeGreaterThan(0);

        const previousDistance = header.scrollDistance;

        dispatchFakeEvent(headerElement, 'mouseleave');
        fixture.detectChanges();
        tick(100);

        expect(header.scrollDistance).toBe(previousDistance);
      }));


      /**
       * Asserts that auto scrolling using the next button works
       *
       * @param startEventName - Name of the event that is supposed to start the scrolling
       * @param endEventName - Name of the event that is supposed to end the scrolling
       */
      function assertNextButtonScrolling(startEventName: string, endEventName: string): void {
        // Expect to start off not scrolled
        expect(header.scrollDistance).toBe(0);

        dispatchFakeEvent(nextButton, startEventName);
        fixture.detectChanges();
        tick(300);

        // Expect to not be scrolled after short amount of time
        expect(header.scrollDistance).toBe(0);

        tick(1000);

        // Expect to be scrolled after some time
        expect(header.scrollDistance).toBeGreaterThan(0);

        const previousDistance = header.scrollDistance;

        tick(100);

        // Expected to scroll again after some time
        expect(header.scrollDistance).toBeGreaterThan(previousDistance);

        dispatchFakeEvent(nextButton, endEventName);
      }

      /**
       * Asserts that auto scrolling using the previous button works.
       *
       * @param startEventName - Name of the event that is supposed to start the scrolling
       * @param endEventName - Name of the event that is supposed to end the scrolling
       */
      function assertPrevButtonScrolling(startEventName: string, endEventName: string): void {
        header.scrollDistance = Infinity;
        fixture.detectChanges();

        let currentScroll = header.scrollDistance;

        // Expect to start off scrolled
        expect(currentScroll).toBeGreaterThan(0);

        const startEvent = document.createEvent('TouchEvent');
        startEvent.initEvent(startEventName);
        prevButton.dispatchEvent(startEvent);
        fixture.detectChanges();
        tick(300);

        // Expect to not scroll after a short amount of time
        expect(header.scrollDistance).toBe(currentScroll);

        tick(1000);

        // Expect to scroll after some time
        expect(header.scrollDistance).toBeLessThan(currentScroll);

        currentScroll = header.scrollDistance;

        tick(100);

        // Expect to scroll again after some more time
        expect(header.scrollDistance).toBeLessThan(currentScroll);

        const endEvent = document.createEvent('TouchEvent');
        endEvent.initEvent(endEventName);
        prevButton.dispatchEvent(endEvent);
      }

    });


    test('should update arrows when the window is resized', fakeAsync(() => {
      fixture = TestBed.createComponent(testComponents.TabHeader);

      const header = fixture.componentInstance.tabHeader;

      jest.spyOn(header, 'checkPaginationEnabled');

      dispatchFakeEvent(window, 'resize');
      tick(10);
      fixture.detectChanges();

      expect(header.checkPaginationEnabled).toHaveBeenCalled();
      discardPeriodicTasks();
    }));


    test('should update the pagination state if the content of the labels changes', () => {
      const mutationCallbacks: Function[] = [];
      TestBed.overrideProvider(MutationObserverFactory, {
        useValue: {
          // Stub out the MutationObserver since the native one is async.
          create(callback: Function) {
            mutationCallbacks.push(callback);
            return {
              observe: () => {},
              disconnect: () => {},
            };
          },
        },
      });

      fixture = TestBed.createComponent(testComponents.TabHeader);
      fixture.detectChanges();

      const headerElement: HTMLElement = fixture.nativeElement.querySelector('.ts-tab-header');
      const labels = fixture.debugElement.queryAll(By.directive(TsTabLabelWrapperDirective)).map(d => d.nativeElement);
      const extraText = new Array(100).join('w');
      const enabledClass = 'ts-tab-header__pagination--enabled';

      expect(headerElement.classList).not.toContain(enabledClass);

      // Set mock dimensions
      const listElement = fixture.componentInstance.tabHeader.tabList.nativeElement;
      Object.defineProperties(listElement, { scrollWidth: { get: () => 600 } });
      Object.defineProperties(headerElement, { offsetWidth: { get: () => 300 } });

      // Change label content to trigger update
      labels.forEach(label => {
        label.style.width = '';
        label.textContent += extraText;
        Object.defineProperties(label, { offsetWidth: { get: () => 200 } });
      });

      mutationCallbacks.forEach(callback => callback());
      fixture.detectChanges();

      expect(headerElement.classList).toContain(enabledClass);
    });

  });


  test(`should re-align the ink bar when the window is resized`, fakeAsync(() => {
    fixture = TestBed.createComponent(testComponents.TabHeader);
    fixture.detectChanges();

    const inkBar = fixture.componentInstance.tabHeader.inkBar;

    jest.spyOn(inkBar, 'alignToElement');

    dispatchFakeEvent(window, 'resize');
    tick(150);
    fixture.detectChanges();

    expect(inkBar.alignToElement).toHaveBeenCalled();
    discardPeriodicTasks();
  }));


  describe(`small tests to complete coverage`, function() {

    beforeEach(() => {
      fixture = TestBed.createComponent(testComponents.TabHeader);
      hostComponent = fixture.componentInstance;
    });


    describe(`get focusIndex`, function() {

      test(`should return 0 if there is no key manager`, function() {
        fixture.detectChanges();
        hostComponent.tabHeader.keyManager = undefined;

        expect(hostComponent.tabHeader.focusIndex).toEqual(0);
      });

    });


    describe(`ngAfterContentInit`, function() {

      test(`should realign if requestAnimationFrame is undefined`, function() {
        hostComponent.tabHeader.updatePagination = jest.fn();
        hostComponent.tabHeader.alignInkBarToSelectedTab = jest.fn();
        window.requestAnimationFrame = undefined;
        fixture.detectChanges();

        expect(hostComponent.tabHeader.updatePagination).toHaveBeenCalled();
        expect(hostComponent.tabHeader.alignInkBarToSelectedTab).toHaveBeenCalled();
      });

    });


    describe(`alignInkBarToSelectedTab`, function() {

      test(`should pass null to the ink bar if no label wrappers exist`, function() {
        fixture.detectChanges();
        hostComponent.tabHeader.inkBar.alignToElement = jest.fn();
        hostComponent.tabHeader.labelWrappers = undefined;
        hostComponent.tabHeader.alignInkBarToSelectedTab();

        expect(hostComponent.tabHeader.inkBar.alignToElement).toHaveBeenCalledWith(null);
      });

    });


    describe(`isValidIndex`, function() {

      test(`should return true if no label wrappers exist`, function() {
        fixture.detectChanges();
        hostComponent.tabHeader.labelWrappers = undefined;

        expect(hostComponent.tabHeader.isValidIndex(1)).toEqual(true);
      });


      test(`should return false if the correct label wrapper is not found`, function() {
        fixture.detectChanges();

        expect(hostComponent.tabHeader.isValidIndex(99)).toEqual(false);
      });

    });


    describe(`updateTabScrollPosition`, function() {

      test(`should set scrollLeft to 0 on IE`, function() {
        hostComponent.tabHeader.platform.TRIDENT = true;
        hostComponent.tabHeader.updateTabScrollPosition();

        expect(hostComponent.tabHeader.tabListContainer.nativeElement.scrollLeft).toEqual(0);

        hostComponent.tabHeader.platform.TRIDENT = false;
        hostComponent.tabHeader.platform.EDGE = true;
        hostComponent.tabHeader.updateTabScrollPosition();

        expect(hostComponent.tabHeader.tabListContainer.nativeElement.scrollLeft).toEqual(0);
      });

    });


    describe(`scrollToLabel`, function() {

      test(`should do nothing if no selected label is found`, function() {
        hostComponent.tabHeader.labelWrappers = undefined;
        hostComponent.tabHeader.scrollTo = jest.fn();

        expect(hostComponent.tabHeader.scrollToLabel()).toEqual(undefined);
        expect(hostComponent.tabHeader.scrollTo).not.toHaveBeenCalled();
      });

    });

  });

});
