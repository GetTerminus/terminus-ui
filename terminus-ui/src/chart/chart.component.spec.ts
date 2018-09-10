// tslint:disable: no-use-before-declare component-class-suffix
import {
  Component,
  Provider,
  Type,
  ViewChild,
} from '@angular/core';
import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import { TsChartModule } from './chart.module';
import { TsChartComponent, TsChartVisualizationOptions } from './chart.component';
import { TsAmChartsService } from './amcharts.service';


describe(`ChartComponent`, () => {


  test(`should exist`, () => {
    const fixture = createComponent(SimpleHost);
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });


  describe(`ngOnInit`, () => {

    test(`should log error if the amCharts library wasn't passed in`, () => {
      window.console.error = jest.fn();
      const fixture = createComponent(SimpleHost, []);
      fixture.detectChanges();

      expect(window.console.error).toHaveBeenCalledWith(expect.stringContaining('The amCharts library was not provided'));
    });


    test(`should call to initialize the chart if amCharts exists`, () => {
      const fixture = createComponent(SimpleHost);
      fixture.detectChanges();
      fixture.componentInstance.component['init'] = jest.fn();
      fixture.componentInstance.component.ngOnInit();

      expect(fixture.componentInstance.component['init']).toHaveBeenCalledWith('xy');
    });

  });


  describe(`ngOnChanges`, () => {

    test(`should should destroy and reinit when the visualization changes`, () => {
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

    test(`should destroy the chart`, () => {
      const fixture = createComponent(SimpleHost);
      fixture.detectChanges();
      fixture.componentInstance.component.ngOnDestroy();

      expect(fixture.componentInstance.component.chart.dispose).toHaveBeenCalled();
    });

  });


  describe(`init`, () => {

    test(`should log an error if no chart could be created`, () => {
      window.console.error = jest.fn();
      const fixture = createComponent(VisualizationsHost);
      fixture.detectChanges();

      fixture.componentInstance.visualization = 'foo' as any;
      fixture.detectChanges();

      expect(window.console.error).toHaveBeenCalledWith(expect.stringContaining('is not a supported chart type'));
    });

    const visualizationTests: TsChartVisualizationOptions[] = ['xy', 'pie', 'map', 'radar', 'treemap', 'sankey', 'chord'];
    for (const t of visualizationTests) {
      test(`should initialize for the ${t} visualization`, () => {
        window.console.error = jest.fn();
        const fixture = createComponent(VisualizationsHost);
        fixture.componentInstance.visualization = t;
        fixture.detectChanges();

        expect(fixture.componentInstance.component['amCharts'].core.create).toHaveBeenCalled();
        expect(window.console.error).not.toHaveBeenCalled();
      });
    }


  });


});




/**
 * Providers
 */

class AmChartsServiceMock {
  get amCharts() {
    return {
      core: {
        create: jest.fn(() => {
          return {
            responsive: {
              enabled: false,
            },
            dispose: jest.fn(),
          };
        }),
      },
      charts: {
        XYChart: {},
        PieChart: {},
        RadarChart: {},
        TreeMap: {},
        SankeyDiagram: {},
        ChordDiagram: {},
      },
      maps: {
        MapChart: {},
      },
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
  TestBed.configureTestingModule({
    imports: [
      TsChartModule,
      ...imports,
    ],
    declarations: [component],
    providers: [
      ...providers,
    ],
  }).compileComponents();
   return TestBed.createComponent<T>(component);
}


/**
 * TEMPLATES
 */

 @Component({
  template: `<ts-chart></ts-chart>`,
})
class SimpleHost {
  @ViewChild(TsChartComponent)
  component: TsChartComponent;
}

/**
 * TEMPLATES
 */
 @Component({
  template: `<ts-chart [visualization]="visualization"></ts-chart>`,
})
class VisualizationsHost {
  visualization: TsChartVisualizationOptions | undefined;

  @ViewChild(TsChartComponent)
  component: TsChartComponent;
}
