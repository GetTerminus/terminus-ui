// tslint:disable: no-use-before-declare component-class-suffix
import {
  Provider,
  Type,
} from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { createComponent as createComponentInner } from '@terminus/ngx-tools/testing';
import * as testComponents from '@terminus/ui/chart/testing';
// eslint-disable-next-line no-duplicate-imports
import {
  AmChartsServiceMock,
  getChartInstance,
} from '@terminus/ui/chart/testing';

import { TsAmChartsService } from './amcharts.service';
import {
  tsChartChordTypeCheck,
  tsChartMapTypeCheck,
  tsChartPieTypeCheck,
  tsChartRadarTypeCheck,
  tsChartSankeyTypeCheck,
  tsChartTreeTypeCheck,
  tsChartXYTypeCheck,
} from './chart-type-check';
import {
  TsChart,
  TsChartVisualizationOptions,
} from './chart.component';
import { TsChartModule } from './chart.module';


describe(`ChartComponent`, function() {

  test(`should exist`, () => {
    const fixture = createComponent<testComponents.SimpleHost>(testComponents.SimpleHost);
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });

  describe(`ngOnInit`, () => {

    test(`should call protectedInitialize`, () => {
      const fixture = createComponent<testComponents.SimpleHost>(testComponents.SimpleHost);
      fixture.componentInstance.component['protectedInitialize'] = jest.fn();
      fixture.detectChanges();
      const component = getChartInstance(fixture);

      expect(component['protectedInitialize']).toHaveBeenCalled();
    });

  });

  describe(`ngOnChanges`, () => {

    test(`should call protected initialize if the visualization changes`, () => {
      const fixture = createComponent<testComponents.VisualizationsHost>(testComponents.VisualizationsHost, []);
      const component = getChartInstance(fixture);
      component['protectedInitialize'] = jest.fn();
      fixture.componentInstance.visualization = 'pie';
      fixture.detectChanges();

      expect(component['protectedInitialize']).toHaveBeenCalled();
    });

  });

  describe(`ngOnDestroy`, () => {

    test(`should call destroyChart`, () => {
      const fixture = createComponent<testComponents.SimpleHost>(testComponents.SimpleHost);
      fixture.detectChanges();
      const component = getChartInstance(fixture);
      component['destroyChart'] = jest.fn();
      component.ngOnDestroy();

      expect(component['destroyChart']).toHaveBeenCalled();
    });

  });

  describe(`protectedInitialize`, () => {

    test(`should throw an error if the amCharts library wasn't passed in`, () => {
      expect.assertions(1);
      try {
        const fixture = createComponent<testComponents.SimpleHost>(testComponents.SimpleHost, []);
        fixture.detectChanges();
      } catch (e) {
        expect(e.message).toEqual(expect.stringContaining('The amCharts library was not provided'));
      }
    });

    test(`should wait one tick and call createChart`, fakeAsync(() => {
      const fixture = createComponent<testComponents.SimpleHost>(testComponents.SimpleHost);
      fixture.detectChanges();
      const component = getChartInstance(fixture);
      component['createChart'] = jest.fn();
      component['protectedInitialize']();
      tick();

      expect(component['createChart']).toHaveBeenCalled();
    }));

  });


  describe(`createChart`, () => {

    test(`should dispose of the chart if it exists`, fakeAsync(() => {
      const fixture = createComponent<testComponents.SimpleHost>(testComponents.SimpleHost);
      fixture.detectChanges();
      tick();
      const component = getChartInstance(fixture);
      component.chart!.dispose = jest.fn();
      component['createChart']();

      expect(component.chart!.dispose).toHaveBeenCalled();
    }));

    test(`should log an warning if no chart could be created`, fakeAsync(() => {
      window.console.warn = jest.fn();
      const fixture = createComponent<testComponents.VisualizationsHost>(testComponents.VisualizationsHost);
      fixture.componentInstance.visualization = 'foo' as any;
      fixture.detectChanges();
      tick();

      expect(window.console.warn).toHaveBeenCalledWith(expect.stringContaining('is not a supported chart type'));
    }));

    const visualizationTests: TsChartVisualizationOptions[] = ['xy', 'pie', 'map', 'radar', 'tree', 'sankey', 'chord'];
    for (const t of visualizationTests) {
      test(`should initialize for the ${t} visualization`, fakeAsync(() => {
        window.console.warn = jest.fn();
        const fixture = createComponent<testComponents.VisualizationsHost>(testComponents.VisualizationsHost);
        fixture.componentInstance.visualization = t;
        fixture.detectChanges();
        tick();

        expect(fixture.componentInstance.component['amCharts'].core.create).toHaveBeenCalled();
        expect(window.console.warn).not.toHaveBeenCalled();
      }));
    }

  });

  describe(`visualization input`, () => {

    test(`should fall back to xy chart type if nothing is passed in`, () => {
      const fixture = createComponent<testComponents.VisualizationsHost>(testComponents.VisualizationsHost);
      fixture.detectChanges();
      const component = getChartInstance(fixture);
      fixture.componentInstance.visualization = 'pie';
      fixture.detectChanges();
      expect(component.visualization).toEqual('pie');

      fixture.componentInstance.visualization = undefined as any;
      fixture.detectChanges();

      expect(component.visualization).toEqual('xy');
    });

  });

  // TODO: Test types once we implement a tool to do so
  describe(`chart type coercion`, function() {

    test(`should validate xy chart`, function() {
      const chart = { className: 'XYChart' } as TsChart;
      expect(tsChartXYTypeCheck(chart)).toEqual(true);
    });


    test(`should validate pie chart`, function() {
      const chart = { className: 'PieChart' } as TsChart;
      expect(tsChartPieTypeCheck(chart)).toEqual(true);
    });


    test(`should validate map chart`, function() {
      const chart = { className: 'MapChart' } as TsChart;
      expect(tsChartMapTypeCheck(chart)).toEqual(true);
    });


    test(`should validate radar chart`, function() {
      const chart = { className: 'RadarChart' } as TsChart;
      expect(tsChartRadarTypeCheck(chart)).toEqual(true);
    });


    test(`should validate tree chart`, function() {
      const chart = { className: 'TreeMap' } as TsChart;
      expect(tsChartTreeTypeCheck(chart)).toEqual(true);
    });


    test(`should validate sankey chart`, function() {
      const chart = { className: 'SankeyDiagram' } as TsChart;
      expect(tsChartSankeyTypeCheck(chart)).toEqual(true);
    });


    test(`should validate chord chart`, function() {
      const chart = { className: 'ChordDiagram' } as TsChart;
      expect(tsChartChordTypeCheck(chart)).toEqual(true);
    });

  });

});




/**
 * Providers
 */

const AM_CHARTS_PROVIDER: Provider[] = [{
  provide: TsAmChartsService,
  useClass: AmChartsServiceMock,
}];


function createComponent<T>(component: Type<T>, providers: Provider[] = AM_CHARTS_PROVIDER, imports: any[] = []): ComponentFixture<T> {
  return createComponentInner<T>(
    component,
    providers,
    [
      TsChartModule,
      ...imports,
    ],
  );
}
