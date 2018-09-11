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
  isDevMode,
} from '@angular/core';
import { inputHasChanged } from '@terminus/ngx-tools';

import { TsAmChartsService, TsAmChartsToken } from './amcharts.service';


/**
 * Define the supported chart visualizations
 */
export type TsChartVisualizationOptions
  = 'pie'
  | 'xy'
  | 'map'
  | 'radar'
  | 'treemap'
  | 'sankey'
  | 'chord'
;


/**
 * This is the chart UI Component
 *
 * FIXME: Once amCharts v4 is TypeScript scrict complient, we should set the `tsconfig.skipLibCheck` to true.
 *
 * #### QA CSS CLASSES
 * - `qa-chart`: Placed on the primary container
 *
 * @example
 * <ts-chart
 *              visualization="xy"
 *              (chartInitialized)="myFunc($event)"
 * ></ts-chart>
 *
 * <example-url>https://goo.gl/ieUPaG</example-url>
 */
@Component({
  selector: 'ts-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  host: {
    class: 'ts-chart',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'tsChart',
})
export class TsChartComponent implements OnInit, OnChanges, OnDestroy {
  /**
   * Store the initialized chart
   */
  public chart: any;

  /**
   * Save a reference to the underlying amCharts library
   */
  private amCharts: TsAmChartsToken;

  /**
   * Get access to the chart container
   */
  @ViewChild('chartDiv')
  private chartDiv!: ElementRef;

  /**
   * Define the chart visualization format (bar, line, etc)
   *
   * @param value - The visualization type. {@link TsChartVisualizationOptions}
   */
  @Input()
  public set visualization(value: TsChartVisualizationOptions) {
    if (!value) {
      return;
    }

    this._visualization = value;
  }
  public get visualization(): TsChartVisualizationOptions {
    return this._visualization;
  }
  private _visualization: TsChartVisualizationOptions = 'xy';

  /**
   * Emit an event containing the chart each time it is initialized
   */
  @Output()
  public chartInitialized: EventEmitter<any> = new EventEmitter();


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
    // Don't initialize a chart if the Highcharts library wasn't passed in.
    if (this.amCharts) {
      this.init(this.visualization);
      // istanbul ignore else
    } else {
      // istanbul ignore else
      if (isDevMode()) {
        console.error(
          'TsChartComponent: The amCharts library was not provided via injection token!',
        );
      }
    }
  }


  /**
   * Re-initialize the chart if the visualization type has changed
   */
  public ngOnChanges(changes: SimpleChanges): void {
    // istanbul ignore else
    if (inputHasChanged(changes, 'visualization')) {
      this.destroyChart();
      this.init(this.visualization);
    }
  }


  /**
   * Destroy the chart when the component is destroyed
   */
  public ngOnDestroy(): void {
    this.destroyChart();
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
   */
  private init(type: TsChartVisualizationOptions): void {
    this.zone.runOutsideAngular(() => {
      // Create the appropriate chart using a chained ternary
      const chart: any =
        type === 'xy'
        ? this.amCharts.core.create(this.chartDiv.nativeElement, this.amCharts.charts.XYChart)
        : type === 'pie'
        ? this.amCharts.core.create(this.chartDiv.nativeElement, this.amCharts.charts.PieChart)
        : type === 'map'
        ? this.amCharts.core.create(this.chartDiv.nativeElement, this.amCharts.maps.MapChart)
        : type === 'radar'
        ? this.amCharts.core.create(this.chartDiv.nativeElement, this.amCharts.charts.RadarChart)
        : type === 'treemap'
        ? this.amCharts.core.create(this.chartDiv.nativeElement, this.amCharts.charts.TreeMap)
        : type === 'sankey'
        ? this.amCharts.core.create(this.chartDiv.nativeElement, this.amCharts.charts.SankeyDiagram)
        : type === 'chord'
        ? this.amCharts.core.create(this.chartDiv.nativeElement, this.amCharts.charts.ChordDiagram)
        : undefined
      ;

      if (chart) {
        chart.responsive.enabled = true;
        this.chart = chart;
        this.chartInitialized.emit(chart);
      } else {
        console.error(`TsChartComponent: ${this.visualization} is not a supported chart type. See TsChartVisualizationOptions.`);
      }
    });
  }

}
