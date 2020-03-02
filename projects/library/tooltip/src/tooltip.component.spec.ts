import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { createComponent } from '@terminus/ngx-tools/testing';

import { TsTooltipComponent } from './tooltip.component';
import { TsTooltipModule } from './tooltip.module';

import * as testComponents from '../testing/src/test-components';
import { getTooltipText } from '../testing/src/test-helpers';


describe(`TsTooltipComponent`, function() {

  describe(`Defaults`, () => {
    let component: testComponents.Basic;
    let fixture: ComponentFixture<testComponents.Basic>;
    let tooltipEl: HTMLElement;
    let tooltipComponent: TsTooltipComponent;

    beforeEach(() => {
      fixture = createComponent(testComponents.Basic, [], [TsTooltipModule]);
      component = fixture.componentInstance;
      fixture.detectChanges();
      tooltipComponent = component.tooltipComponent;

      tooltipEl = fixture.debugElement.query(By.css('.c-tooltip')).nativeElement as HTMLElement;
    });

    test(`should exist`, () => {
      expect(tooltipComponent).toBeTruthy();
      expect(tooltipEl).toBeTruthy();
    });

    test(`should set position to below`, () => {
      expect(tooltipComponent.tooltipPosition).toEqual('below');
    });

    test('should set underline to false', () => {
      expect(tooltipComponent.hasUnderline).toEqual(false);
      expect(tooltipEl.classList).not.toContain('c-tooltip--underline');
    });

  });

  describe('Customized', () => {
    let component: testComponents.TestHostComponent;
    let fixture: ComponentFixture<testComponents.TestHostComponent>;
    let tooltipEl: HTMLElement;
    let tooltipComponent: TsTooltipComponent;

    beforeEach(() => {
      fixture = createComponent(testComponents.TestHostComponent, [], [TsTooltipModule]);
      component = fixture.componentInstance;
      fixture.detectChanges();
      tooltipComponent = component.tooltipComponent;
      tooltipEl = fixture.debugElement.query(By.css('.c-tooltip')).nativeElement as HTMLElement;
    });

    test(`should exist`, () => {
      expect(tooltipComponent).toBeTruthy();
      expect(tooltipEl).toBeTruthy();
    });

    describe(`tooltipPosition`, () => {
      test(`should set and retrieve above`, () => {
        component.tooltipPosition = 'above';
        fixture.detectChanges();

        expect(tooltipComponent.tooltipPosition).toEqual('above');
      });

      test(`should set and retrieve below`, () => {
        component.tooltipPosition = 'below';
        fixture.detectChanges();

        expect(tooltipComponent.tooltipPosition).toEqual('below');
      });

      test(`should set and retrieve before`, () => {
        component.tooltipPosition = 'before';
        fixture.detectChanges();

        expect(tooltipComponent.tooltipPosition).toEqual('before');
      });

      test(`should set and retrieve after`, () => {
        component.tooltipPosition = 'after';
        fixture.detectChanges();

        expect(tooltipComponent.tooltipPosition).toEqual('after');
      });

      test(`should fail with bad input`, () => {
        window.console.warn = jest.fn();
        component.tooltipPosition = 'foo' as any;
        fixture.detectChanges();

        expect(window.console.warn).toHaveBeenCalled();
      });
    });

    describe(`hasUnderline`, () => {
      test(`should set and retrieve`, () => {
        component.hasUnderline = true;
        fixture.detectChanges();

        expect(tooltipComponent.hasUnderline).toEqual(true);
        expect(tooltipEl.classList).toContain('c-tooltip--underline');
      });
    });
  });

  describe(`tooltipValue`, () => {
    test(`should set and retrieve`, () => {
      const fixture: ComponentFixture<testComponents.TooltipValue> =
        createComponent(testComponents.TooltipValue, [], [TsTooltipModule, NoopAnimationsModule]);
      const component: testComponents.TooltipValue = fixture.componentInstance;
      fixture.detectChanges();
      const tooltipComponent = component.tooltipComponent;

      component.tooltipValue = 'foo';
      fixture.detectChanges();
      const toolTipValue = getTooltipText(fixture);

      expect(tooltipComponent.tooltipValue).toEqual('foo');
      expect(toolTipValue).toEqual('foo');
    });
  });
});

