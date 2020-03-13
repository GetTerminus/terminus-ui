import { PlatformModule } from '@angular/cdk/platform';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { Type } from '@angular/core';
import {
  async,
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
import { createComponent as createComponentInner } from '@terminus/ngx-tools/testing';
import * as testComponents from '@terminus/ui/drawer/testing';

import { TsDrawerComponent } from './drawer.component';
import { TsDrawerModule } from './drawer.module';

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

describe(`TsDrawerContainerComponent`, () => {
  let fixture;
  let component;

  /**
   * Set up test component
   *
   * @param testComponent
   */
  function setUpTestComponent(testComponent) {
    fixture = createComponent(testComponent);
    fixture.detectChanges();
    component = fixture.debugElement.queryAll(By.css('ts-drawer-container'))[0].componentInstance;
  }

  test(`should exist`, () => {
    setUpTestComponent(testComponents.RegularDrawer);
    expect(fixture.debugElement.query(By.css('.ts-drawer-container'))).toBeTruthy();
  });

  test('should be able to open and close all drawers', fakeAsync(() => {
    setUpTestComponent(testComponents.RegularDrawer);
    const allDrawers = fixture.debugElement.queryAll(By.directive(TsDrawerComponent));

    expect(allDrawers.every(drawer => drawer.componentInstance.isExpanded)).toBeFalsy();

    component.expand();
    fixture.detectChanges();
    tick();

    expect(allDrawers.every(drawer => drawer.componentInstance.isExpanded)).toBe(true);

    component.collapse();
    fixture.detectChanges();
    flush();

    expect(allDrawers.every(drawer => drawer.componentInstance.isExpanded)).toBeFalsy();
  }));

  describe(`should set size accordingly`, () => {
    test('should calculate the left margin', fakeAsync(() => {
      setUpTestComponent(testComponents.SetMargins);
      const drawerElement = fixture.debugElement.nativeElement.querySelector('.ts-drawer');

      fixture.detectChanges();
      Object.defineProperty(drawerElement, 'offsetWidth', {
        configurable: true,
        value: 500,
      });
      fixture.componentInstance.drawer.expand();
      fixture.detectChanges();
      tick();
      expect(component.contentMargins.left).toEqual(204);
    }));

    test(`should calculate the right margin`, fakeAsync(() => {
      setUpTestComponent(testComponents.SetMargins);
      const drawerElement = fixture.debugElement.nativeElement.querySelector('.ts-drawer');

      fixture.debugElement.componentInstance.position = 'end';
      fixture.detectChanges();
      Object.defineProperty(drawerElement, 'offsetWidth', {
        configurable: true,
        value: 500,
      });
      fixture.componentInstance.drawer.expand();
      fixture.detectChanges();
      tick();
      expect(component.contentMargins.right).toEqual(204);
    }));

    test(`should have no right margin in overlay mode expanding on end position`, () => {
      setUpTestComponent(testComponents.MultipleDrawer);
      const drawer2 = component.drawers.last;
      const contentElement = fixture.debugElement.nativeElement.querySelector('.ts-drawer-content');
      const content = component.content;
      Object.defineProperty(contentElement, 'rightMargin', {
        configurable: true,
        value: 20,
      });
      Object.defineProperty(content, 'rightMargin', {
        configurable: true,
        value: 20,
      });

      drawer2.expand();
      fixture.detectChanges();

      expect(component.contentMargins.right).toBeFalsy();
    });

    test(`should not move the margin if 2nd drawer is overlay on top of first drawer`, async(() => {
      setUpTestComponent(testComponents.MultipleDrawer);
      const drawer1 = component.drawers.first;
      const drawer2 = component.drawers.last;
      const contentElement = fixture.debugElement.nativeElement.querySelector('.ts-drawer-content');
      const content = component.content;
      Object.defineProperty(contentElement, 'rightMargin', {
        configurable: true,
        value: 20,
      });
      Object.defineProperty(content, 'rightMargin', {
        configurable: true,
        value: 20,
      });
      Object.defineProperty(component, 'contentMargins', {
        configurable: true,
        value: {
          left: 20,
          right: 20,
        },
      });
      drawer1.expand();
      fixture.detectChanges();

      drawer2.expand();
      fixture.detectChanges();
      // When second drawer with overlay mode, the content margin should not change
      expect(component.contentMargins.right).toEqual(20);
    }));
  });

  describe(`backdrop`, () => {
    beforeEach(() => {
      setUpTestComponent(testComponents.BasicDrawer);
    });

    test('should be able to toggle whether the container has a backdrop', fakeAsync(() => {
      expect(fixture.nativeElement.querySelector('.ts-drawer__backdrop')).toBeTruthy();

      fixture.componentInstance.hasBackdrop = false;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.ts-drawer__backdrop')).toBeFalsy();
    }));

    test(`should dismiss the opening drawer if backdrop is enabled and click on container`, async(() => {
      const backdrop = document.querySelector('.ts-drawer__backdrop')! as HTMLElement;
      expect(fixture.debugElement.componentInstance.drawer.isExpanded).toBeFalsy();
      component.expand();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        backdrop.click();
        fixture.detectChanges();
        expect(fixture.debugElement.componentInstance.drawer.isExpanded).toBeFalsy();
      });
    }));
  });

  describe(`open on load`, () => {
    test(`should not animated`, async(() => {
      setUpTestComponent(testComponents.OpenOnLoadDrawer);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const container = fixture.debugElement.nativeElement.querySelector('.ts-drawer-container');
        expect(container.classList).not.toContain('ts-drawer-transition');
      });
    }));
  });

  test('should throw when multiple drawers have the same position', () => {
    setUpTestComponent(testComponents.MultiDrawerSameSidePush);
    fixture.detectChanges();
    const setup = () => {
      component.validateDrawers();
    };
    expect(setup).toThrowError();
  });

  test(`should readjust drawers when mode changed`, () => {
    setUpTestComponent(testComponents.SetSizeDrawer);
    component.validateDrawers = jest.fn();
    component.updateContentMargins = jest.fn();
    component.changeDetectorRef.markForCheck = jest.fn();
    fixture.debugElement.componentInstance.mode = 'push';
    fixture.detectChanges();
    expect(component.validateDrawers).toHaveBeenCalled();
    expect(component.updateContentMargins).toHaveBeenCalled();
    expect(component.changeDetectorRef.markForCheck).toHaveBeenCalled();
  });
});

