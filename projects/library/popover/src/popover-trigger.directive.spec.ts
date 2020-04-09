import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import {
  DebugElement,
  Type,
} from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { KEYS } from '@terminus/ngx-tools/keycodes';
import {
  createComponent as createComponentInner,
  dispatchEvent,
  dispatchKeyboardEvent,
} from '@terminus/ngx-tools/testing';
import * as testComponents from '@terminus/ui/popover/testing';
// eslint-disable-next-line no-duplicate-imports
import { TsPopoverTestComponents } from '@terminus/ui/popover/testing';

import {
  TsPopoverComponent,
  TsPopoverModule,
} from './popover.module';

describe(`popover trigger`, () => {
  let fixture: ComponentFixture<TsPopoverTestComponents>;

  /**
   * Create test host component
   *
   * @param component
   */
  function createComponent<T>(component: Type<T>): ComponentFixture<T> {
    const moduleImports = [
      CommonModule,
      PlatformModule,
      TsPopoverModule,
    ];
    const providers = [];

    return createComponentInner<T>(component, providers, moduleImports);
  }

  describe(`TsPopoverTriggerDirective`, () => {
    let buttonDebugElement: HTMLElement;
    let popoverDebugElement: DebugElement;
    let popoverInstance: TsPopoverComponent;

    /**
     * Set up for tests
     *
     * @param component
     */
    function setup<T>(component: T) {
      // TODO: fix this
      // @ts-ignore
      fixture = createComponent<T>(component);
      fixture.detectChanges();
      popoverDebugElement = fixture.debugElement.query(By.css('.popover__container'));
      buttonDebugElement = fixture.debugElement.query(By.css('.popover-button')).nativeElement as HTMLElement;
      popoverInstance = popoverDebugElement.componentInstance;
    }

    // TODO: In order to get this condition tested, we might have to create a service and token and mock the service
    test.todo(`should throw error if popper.js was not imported`);

    describe(`ID`, () => {
      test(`should support a custom ID`, fakeAsync(() => {
        setup(testComponents.Basic);
        fixture.componentInstance.id = 'example10reference1';
        fixture.detectChanges();
        tick();
        expect(popoverDebugElement.componentInstance.id).toEqual('example10reference1');
      }));

      test(`should fall back to the UID if no ID is passed in`, () => {
        setup(testComponents.Basic);
        fixture.componentInstance.id = undefined as any;
        fixture.detectChanges();

        expect(popoverDebugElement.nativeElement.getAttribute('aria-labelledby')).toEqual(expect.stringContaining('ts-popover-'));
      });
    });

    describe(`position`, () => {
      let event: MouseEvent;
      beforeEach(() => {
        event = document.createEvent('MouseEvent');
        event.initEvent('click', true, false);
      });
      test(`should set popover position based on input`, fakeAsync(() => {
        setup(testComponents.Basic);
        fixture.componentInstance.position = 'right';
        fixture.detectChanges();

        dispatchEvent(buttonDebugElement, event);
        fixture.detectChanges();
        tick();
        expect(popoverDebugElement.nativeElement.getAttribute('x-placement')).toEqual('right');
      }));

      test(`should throw UI library error if provided position is not allowed`, fakeAsync(() => {
        setup(testComponents.Basic);
        const setPosition = () => {
          fixture.componentInstance.position = 'foo' as any;
          fixture.detectChanges();
          tick();
        };
        expect(setPosition).toThrowError();
      }));
    });

    describe(`hide on blur`, () => {
      let event: MouseEvent;
      beforeEach(() => {
        event = document.createEvent('MouseEvent');
        event.initEvent('click', true, false);
      });

      test(`should hide if click outside and hideOnBlur set to true`, fakeAsync(() => {
        setup(testComponents.Basic);
        fixture.componentInstance.popoverOnHidden = jest.fn();
        fixture.componentInstance.popoverOnShown = jest.fn();
        fixture.detectChanges();
        fixture.componentInstance.hideOnBlur = true;
        fixture.detectChanges();
        dispatchEvent(buttonDebugElement, event);
        fixture.detectChanges();
        tick();
        expect(fixture.componentInstance.popoverOnShown).toHaveBeenCalled();
        const outsideElement = fixture.debugElement.query(By.css('.outside')).nativeElement as HTMLElement;
        dispatchEvent(outsideElement, event);
        fixture.detectChanges();
        tick();
        expect(fixture.componentInstance.popoverOnHidden).toHaveBeenCalled();
      }));
    });

    describe(`default opened`, () => {
      test(`should open on load if defaultOpened set to true`, fakeAsync(() => {
        setup(testComponents.DefaultOpen);
        tick();
        expect(popoverDebugElement.nativeElement.classList).toContain('c-popover--visible');
        expect(popoverDebugElement.nativeElement.getAttribute('x-placement')).toEqual('right');
      }));
    });

    describe(`escape`, () => {
      test(`should close popover with escape key down`, fakeAsync(() => {
        setup(testComponents.Basic);
        fixture.componentInstance.popoverOnHidden = jest.fn();
        fixture.detectChanges();
        const event = document.createEvent('MouseEvent');
        event.initEvent('click', true, false);
        dispatchEvent(buttonDebugElement, event);
        fixture.detectChanges();
        tick();
        const escape = dispatchKeyboardEvent(buttonDebugElement, 'keydown', KEYS.ESCAPE);
        fixture.detectChanges();
        flush();
        expect(escape.defaultPrevented).toBe(true);
        expect(fixture.componentInstance.popoverOnHidden).toHaveBeenCalled();
      }));
    });

    test(`should return if referenceObject is null`, () => {
      setup(testComponents.Basic);
      popoverInstance.onUpdate.emit = jest.fn();
      popoverInstance.referenceObject = undefined as any;
      fixture.detectChanges();
      popoverInstance.show({});
      expect(popoverInstance.onUpdate.emit).not.toHaveBeenCalled();
    });
  });
});
