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
import { KEYS } from '@terminus/ngx-tools';
import {
  createComponent as createComponentInner,
  dispatchEvent,
  dispatchKeyboardEvent,
} from '@terminus/ngx-tools/testing';

import * as testComponents from '@terminus/ui/popover/testing';
import { TsPopoverTestComponents } from '../testing/src/test-components';
import { TsPopoverTriggerDirective } from './popover-trigger.directive';
import { TsPopoverModule } from './popover.module';

describe(`popover trigger`, () => {
  let fixture: ComponentFixture<TsPopoverTestComponents>;

  function createComponent<T>(component: Type<T>): ComponentFixture<T> {
    const moduleImports = [
      CommonModule,
      PlatformModule,
      TsPopoverModule,
    ];
    const providers = [];

    return createComponentInner(component, providers, moduleImports);
  }

  describe(`TsPopoverTriggerDirective`, () => {
    let testComponent: ComponentFixture<TsPopoverTestComponents>;
    let popoverNativeElement: HTMLElement;
    let popoverTriggerDebugElement: DebugElement;
    let buttonDebugElement: HTMLElement;
    let popoverTriggerInstance: ComponentFixture<TsPopoverTestComponents>;
    let popoverTrigger: ComponentFixture<TsPopoverTestComponents>;
    let popoverDebugElement: DebugElement;
    let buttonInstance: ComponentFixture<TsPopoverTestComponents>;
    let popoverInstance: ComponentFixture<TsPopoverTestComponents>;

    function setup(component = testComponents.Basic) {
      fixture = createComponent(component);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      popoverTriggerDebugElement = fixture.debugElement.query(By.directive(TsPopoverTriggerDirective));
      popoverDebugElement = fixture.debugElement.query(By.css('.popover__container'));
      buttonDebugElement = fixture.debugElement.query(By.css('.popover-button')).nativeElement as HTMLElement;
      buttonInstance = fixture.debugElement.query(By.css('.popover-button')).componentInstance;
      popoverNativeElement = popoverDebugElement.nativeElement as HTMLElement;
      popoverTriggerInstance = popoverTriggerDebugElement.componentInstance;
      popoverTrigger = fixture.debugElement.query(By.directive(TsPopoverTriggerDirective)).componentInstance;
      popoverInstance = popoverDebugElement.componentInstance;
    }

    // TODO: In order to get this condition tested, we might have to create a service and token and mock the service
    // describe(`popper.js import`, () => {
    //   test(`should throw error if no popper.js import`, () => {
    //     const component = new TsPopoverComponent({} as any, {} as any);
    //     global.Popper = undefined as any;
    //
    //     const spinUp = () => component.ngOnInit();
    //     expect(spinUp).toThrowError();
    //   });
    // });

    describe(`ID`, () => {
      test(`should support a custom ID`, fakeAsync(() => {
        setup();
        fixture.componentInstance.id = 'example10reference1';
        fixture.detectChanges();
        tick();
        expect(popoverDebugElement.componentInstance.id).toEqual('example10reference1');
      }));

      test(`should fall back to the UID if no ID is passed in`, () => {
        setup();
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
        setup();
        fixture.componentInstance.position = 'right';
        fixture.detectChanges();

        dispatchEvent(buttonDebugElement, event);
        fixture.detectChanges();
        tick();
        expect(popoverDebugElement.nativeElement.getAttribute('x-placement')).toEqual('right');
      }));

      test(`should throw UI library error if provided position is not allowed`, fakeAsync(() => {
        setup();
        const setPosition = () => {
          fixture.componentInstance.position = 'foo';
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
        setup();
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
        setup();
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
      setup();
      popoverInstance.popoverOnShown = jest.fn();
      popoverInstance.referenceObject = undefined;
      fixture.detectChanges();
      popoverInstance.show();
      expect(popoverInstance.popoverOnShown).not.toHaveBeenCalled();
    });
  });
});
