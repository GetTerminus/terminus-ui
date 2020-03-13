import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4maps from '@amcharts/amcharts4/maps';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { inputHasChanged } from '@terminus/ngx-tools/utilities';
import { TsUILibraryError } from '@terminus/ui/utilities';

import {
  TsAmChartsService,
  TsAmChartsToken,
} from './amcharts.service';


/**
 * Define the supported chart visualizations
 */
export type TsChartVisualizationOptions
  = 'xy'
  | 'pie'
  | 'map'
  | 'radar'
  | 'tree'
  | 'sankey'
  | 'chord'
;


/**
 * Define possible chart types
 */
export type TsChart
  = am4charts.XYChart
  | am4charts.PieChart
  | am4maps.MapChart
  | am4charts.RadarChart
  | am4charts.TreeMap
  | am4charts.SankeyDiagram
  | am4charts.ChordDiagram
;


/**
 * This is the chart UI Component
 *
 * FIXME: Once amCharts v4 is TypeScript script compliant, we should set the `tsconfig.skipLibCheck` to true.
 * https://github.com/GetTerminus/terminus-ui/issues/1327
 *
 * @example
 * <ts-chart
 *              visualization="xy"
 *              (chartInitialized)="myFunc($event)"
 * ></ts-chart>
 *
 * <example-url>https://getterminus.github.io/ui-demos-release/components/chart</example-url>
 */
@Component({
  selector: 'ts-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  host: { class: 'ts-chart' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'tsChart',
})
export class TsChartComponent implements OnInit, OnChanges, OnDestroy {
  /**
   * Store the initialized chart
   */
  public chart: TsChart | undefined;

  /**
   * Save a reference to the underlying amCharts library
   */
  private readonly amCharts: TsAmChartsToken;

  /**
   * Get access to the chart container
   */
  @ViewChild('chartDiv', { static: true })
  private chartDiv!: ElementRef;

  /**
   * Define the chart visualization format (bar, line, etc)
   *
   * @param value - The visualization type. {@link TsChartVisualizationOptions}
   */
  @Input()
  public set visualization(value: TsChartVisualizationOptions) {
    this._visualization = value ? value : 'xy';
  }
  public get visualization(): TsChartVisualizationOptions {
    return this._visualization;
  }
  private _visualization: TsChartVisualizationOptions = 'xy';

  /**
   * Emit an event containing the chart each time it is initialized
   */
  @Output()
  public readonly chartInitialized = new EventEmitter<TsChart>();


  constructor(
    private zone: NgZone,
    private amChartsService: TsAmChartsService,
  ) {
    this.amCharts = this.amChartsService.amCharts;
  }


  /**
   * Initialize the chart if amCharts exists
   */
  public ngOnInit(): void {
    this.protectedInitialize();
  }


  /**
   * Re-initialize the chart if the visualization type has changed
   *
   * @param changes
   */
  public ngOnChanges(changes: SimpleChanges): void {
    // istanbul ignore else
    if (inputHasChanged(changes, 'visualization')) {
      this.protectedInitialize();
    }
  }


  /**
   * Destroy the chart when the component is destroyed
   */
  public ngOnDestroy(): void {
    this.destroyChart();
  }


  /**
   * A function to verify the initialization requirements before creating the chart
   */
  private protectedInitialize(): void {
    if (!this.amCharts) {
      throw new TsUILibraryError(`
        TsChartComponent: The amCharts library was not provided via injection token!
        Please see: https://github.com/GetTerminus/terminus-ui/blob/release/projects/library/chart/src/chart.component.md%23inject-the-needed-libraries
      `);
    }

    // NOTE: We must delay for the first tick so the outer component has a width set.
    Promise.resolve().then(() => {
      this.createChart(this.visualization);
    });
  }

  /**
   * Destroy the chart
   */
  private destroyChart(): void {
    this.zone.runOutsideAngular(() => {
      // istanbul ignore else
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }


  /**
   * Initialize a chart
   *
   * @param type
   */
  private createChart(type: TsChartVisualizationOptions): void {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }

      const chart: TsChart
        = type === 'xy'     ? this.amCharts.core.create(this.chartDiv.nativeElement, this.amCharts.charts.XYChart)
        : type === 'pie'    ? this.amCharts.core.create(this.chartDiv.nativeElement, this.amCharts.charts.PieChart)
        : type === 'map'    ? this.amCharts.core.create(this.chartDiv.nativeElement, this.amCharts.maps.MapChart)
        : type === 'radar'  ? this.amCharts.core.create(this.chartDiv.nativeElement, this.amCharts.charts.RadarChart)
        : type === 'tree'   ? this.amCharts.core.create(this.chartDiv.nativeElement, this.amCharts.charts.TreeMap)
        : type === 'sankey' ? this.amCharts.core.create(this.chartDiv.nativeElement, this.amCharts.charts.SankeyDiagram)
        : type === 'chord'  ? this.amCharts.core.create(this.chartDiv.nativeElement, this.amCharts.charts.ChordDiagram)
        : undefined
      ;

      if (chart) {
        chart.responsive.enabled = true;
        this.chart = chart;
        this.chartInitialized.emit(chart);
      } else {
        // eslint-disable-next-line no-console
        console.warn(`TsChartComponent: ${type} is not a supported chart type. See TsChartVisualizationOptions.`);
      }
    });
  }

}
