import { PlatformModule } from '@angular/cdk/platform';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { Type } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  tick,
} from '@angular/core/testing';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KEYS } from '@terminus/ngx-tools';
import {
  createComponent as createComponentInner,
  dispatchKeyboardEvent,
} from '@terminus/ngx-tools/testing';
import {
  TsDrawerFooterComponent,
  TsDrawerHeaderComponent,
} from '@terminus/ui/drawer';
import * as testComponents from '@terminus/ui/drawer/testing';
// eslint-disable-next-line no-duplicate-imports
import { TsDrawerTestComponents } from '@terminus/ui/drawer/testing';

import {
  TsDrawerComponent,
  TsDrawerModule,
} from './drawer.module';

describe(`drawer`, () => {
  let fixture: ComponentFixture<any>;

  /**
   * Create test host component
   *
   * @param component
   */
  function createComponent<T>(component: Type<T>): ComponentFixture<T> {
    const moduleImports = [
      BrowserAnimationsModule,
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      MatRippleModule,
      ScrollingModule,
      PlatformModule,
      TsDrawerModule,
    ];

    return createComponentInner(component, undefined, moduleImports);
  }

  describe(`TsDrawerComponent`, () => {
    let testComponent;
    let drawerNativeElement;
    let drawerDebugElement;
    let drawer;

    /**
     * Set up test env
     *
     * @param component
     */
    function setup(component: TsDrawerTestComponents = testComponents.SimpleDrawer) {
      fixture = createComponent(component);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      drawerDebugElement = fixture.debugElement.query(By.directive(TsDrawerComponent));
      drawerNativeElement = drawerDebugElement.nativeElement;
      drawer = fixture.debugElement.query(By.directive(TsDrawerComponent)).componentInstance;
    }

    describe(`basic behaviors`, () => {
      test(`should add ts-drawer class`, () => {
        setup();
        expect(drawerNativeElement.classList).toContain('ts-drawer');
      });

      test(`should set default size `, fakeAsync(() => {
        setup();
        fixture.detectChanges();
        expect(parseFloat(drawerNativeElement.style.width)).toEqual(3.75);

        drawer.expand();
        fixture.detectChanges();
        tick();
        expect(parseFloat(drawerNativeElement.style.width)).toEqual(12.5);
      }));

      test(`should set size based on inputs`, fakeAsync(() => {
        setup();
        fixture.detectChanges();
        testComponent.collapsedSize = '3rem';
        testComponent.expandedSize = '14rem';
        fixture.detectChanges();

        expect(parseFloat(drawerNativeElement.style.width)).toEqual(3);
        drawer.expand();
        fixture.detectChanges();
        tick();
        expect(parseFloat(drawerNativeElement.style.width)).toEqual(14);
      }));

      test('should resolve the open method promise with the new state of the drawer', fakeAsync(() => {
        setup(testComponents.SimpleDrawer);
        fixture.detectChanges();

        drawer.expand().then(result => expect(result).toBe('open'));
        fixture.detectChanges();
        tick();
      }));
    });

    test('should close when pressing escape', fakeAsync(() => {
      setup(testComponents.BasicDrawer);

      fixture.detectChanges();

      const component = fixture.debugElement.componentInstance;
      const drawerElement = fixture.debugElement.query(By.directive(TsDrawerComponent));

      drawerElement.componentInstance.expand();
      fixture.detectChanges();
      tick();

      expect(component.openCount).toBe(1);
      expect(component.openStartCount).toBe(1);
      expect(component.closeCount).toBe(0);
      expect(component.closeStartCount).toBe(0);

      const event = dispatchKeyboardEvent(drawerElement.nativeElement, 'keydown', KEYS.ESCAPE);
      fixture.detectChanges();
      flush();

      expect(component.closeCount).toBe(1);
      expect(component.closeStartCount).toBe(1);
      expect(event.defaultPrevented).toBe(true);
    }));

    describe(`header and footer`, () => {
      test(`should have header and footer set`, fakeAsync(() => {
        setup(testComponents.DrawerWithHeaderAndFooter);
        fixture.detectChanges();
        const drawerElement = fixture.debugElement.query(By.directive(TsDrawerComponent));
        drawerElement.componentInstance.expand();
        fixture.detectChanges();
        tick();
        const headerElement = fixture.debugElement.query(By.directive(TsDrawerHeaderComponent));
        const footerElement = fixture.debugElement.query(By.directive(TsDrawerFooterComponent));
        expect(headerElement.nativeElement.textContent.trim()).toEqual('HEADER');
        expect(footerElement.nativeElement.textContent.trim()).toEqual('FOOTER');
      }));
    });
  });
});
