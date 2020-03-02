import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TsChartComponent } from '@terminus/ui/chart';


/**
 * Get the DebugElement for {@link TsChartComponent}
 *
 * @param fixture - The component fixture
 * @return The DebugElement
 */
export function getChartDebugElement(fixture: ComponentFixture<any>): DebugElement {
  return fixture.debugElement.query(By.directive(TsChartComponent));
}

/**
 * Get the component instance for a {@link TsChartComponent}
 *
 * @param fixture - The component fixture
 * @return The instance
 */
export function getChartInstance(fixture: ComponentFixture<any>): TsChartComponent {
  const debugElement = getChartDebugElement(fixture);
  return debugElement.componentInstance;
}

/**
 * Expose an amcharts service mock for consumers to use.
 */

export class AmChartsServiceMock {
  public get amCharts() {
    return {
      core: {
        color: jest.fn(),
        options: {},
        create: jest.fn(() => ({
          series: {
            clear: jest.fn(),
            push: jest.fn(() => ({
              dataFields: {},
              tooltip: { background: {} },
            })),
          },
          responsive: { enabled: false },
          colors: { list: [] },
          xAxes: {
            push: jest.fn(() => ({
              dataFields: {},
              renderer: {
                grid: { template: {} },
                labels: { template: {} },
              },
            })),
          },
          yAxes: {
            push: jest.fn(() => ({
              title: {},
              numberFormatter: {},
              tooltip: {},
            })),
          },
          dispose: jest.fn(),
        })),
      },
      charts: {
        CategoryAxis: jest.fn(),
        ValueAxis: jest.fn(),
        XYCursor: jest.fn(() => ({})),
        Legend: jest.fn(() => ({})),
        LineSeries: jest.fn(() => ({})),
        ColumnSeries: jest.fn(() => ({})),
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
