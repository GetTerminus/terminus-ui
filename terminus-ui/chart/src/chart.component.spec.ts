// tslint:disable: no-use-before-declare component-class-suffix
import {
  Component,
  Provider,
  Type,
  ViewChild,
} from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { createComponent as createComponentInner } from '@terminus/ngx-tools/testing';

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
  TsChartComponent,
  TsChartVisualizationOptions,
} from './chart.component';
import { TsChartModule } from './chart.module';


describe(`ChartComponent`, function() {

  test(`should exist`, () => {
    const fixture = createComponent(SimpleHost);
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });


  describe(`ngOnInit`, () => {

    test(`should log a warning if the amCharts library wasn't passed in`, () => {
      window.console.warn = jest.fn();
      const fixture = createComponent(SimpleHost, []);
      fixture.detectChanges();

      expect(window.console.warn).toHaveBeenCalledWith(expect.stringContaining('The amCharts library was not provided'));
    });


    test(`should call to initialize the chart if amCharts exists`, fakeAsync(() => {
      const fixture = createComponent(SimpleHost);
      fixture.detectChanges();
      fixture.componentInstance.component.init = jest.fn();
      fixture.componentInstance.component.ngOnInit();
      tick();

      expect(fixture.componentInstance.component.init).toHaveBeenCalledWith('xy');
    }));

  });


  describe(`ngOnChanges`, () => {

    test(`should should destroy and reinitialize when the visualization changes`, () => {
      const fixture = createComponent(VisualizationsHost);
      fixture.detectChanges();
      fixture.componentInstance.component['destroyChart'] = jest.fn();
      fixture.componentInstance.component['init'] = jest.fn();

      fixture.componentInstance.visualization = 'pie';
      fixture.detectChanges();

      expect(fixture.componentInstance.component['destroyChart']).toHaveBeenCalled();
      expect(fixture.componentInstance.component['init']).toHaveBeenCalledWith('pie');
    });

  });


  describe(`ngOnDestroy`, () => {

    test(`should destroy the chart`, fakeAsync(() => {
      const fixture = createComponent(SimpleHost);
      fixture.detectChanges();
      tick();
      fixture.componentInstance.component.ngOnDestroy();

      expect(fixture.componentInstance.component.chart!.dispose).toHaveBeenCalled();
    }));

  });


  describe(`init`, () => {

    test(`should log an warning if no chart could be created`, () => {
      window.console.warn = jest.fn();
      const fixture = createComponent(VisualizationsHost);
      fixture.detectChanges();

      fixture.componentInstance.visualization = 'foo' as any;
      fixture.detectChanges();

      expect(window.console.warn).toHaveBeenCalledWith(expect.stringContaining('is not a supported chart type'));
    });

    const visualizationTests: TsChartVisualizationOptions[] = ['xy', 'pie', 'map', 'radar', 'tree', 'sankey', 'chord'];
    for (const t of visualizationTests) {
      test(`should initialize for the ${t} visualization`, () => {
        window.console.warn = jest.fn();
        const fixture = createComponent(VisualizationsHost);
        fixture.componentInstance.visualization = t;
        fixture.detectChanges();

        expect(fixture.componentInstance.component['amCharts'].core.create).toHaveBeenCalled();
        expect(window.console.warn).not.toHaveBeenCalled();
      });
    }


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

class AmChartsServiceMock {
  public get amCharts() {
    return {
      core: {
        create: jest.fn(() => ({
          responsive: { enabled: false },
          dispose: jest.fn(),
        })),
      },
      charts: {
        XYChart: {},
        PieChart: {},
        RadarChart: {},
        TreeMap: {},
        SankeyDiagram: {},
        ChordDiagram: {},
      },
      maps: { MapChart: {} },
    };
  }
}

const AM_CHARTS_PROVIDER: Provider[] = [{
  provide: TsAmChartsService,
  useClass: AmChartsServiceMock,
}];


/**
 * Helpers
 */

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


/**
 * TEMPLATES
 */

 @Component({ template: `<ts-chart></ts-chart>` })
class SimpleHost {
  @ViewChild(TsChartComponent, { static: true })
  public component: TsChartComponent;
 }

 @Component({ template: `<ts-chart [visualization]="visualization"></ts-chart>` })
class VisualizationsHost {
  public visualization: TsChartVisualizationOptions | undefined;

  @ViewChild(TsChartComponent, { static: true })
  public component: TsChartComponent;
 }

 @Component({
   template: `
     <ts-chart
       visualization="xy"
       (chartInitialized)="chartCreated($event)"
     ></ts-chart>
   `,
 })
class TypeChecking {
  public chart!: TsChart;

  @ViewChild(TsChartComponent, { static: true })
  public component!: TsChartComponent;

  public chartCreated(chart: TsChart): void {
    this.chart = chart;
  }
 }
