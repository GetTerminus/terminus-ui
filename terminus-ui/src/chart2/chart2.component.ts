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

import { TsAmChartsService, TsAmChartsToken } from './amcharts.service';
import { inputHasChanged } from '@terminus/ngx-tools';


/**
 * Define the supported chart visualizations
 */
export type TsChart2VisualizationOptions
  = 'pie'
  | 'xy'
  | 'map'
  | 'radar'
  | 'treemap'
  | 'sankey'
  | 'chord'
;


/**
 * This is the chart2 UI Component
 *
 * FIXME: Once amCharts v4 is TypeScript scrict complient, we should set the `tsconfig.skipLibCheck` to true.
 *
 * #### QA CSS CLASSES
 * - `qa-chart2`: Placed on the primary container
 *
 * @example
 * <ts-chart2
 *              visualization="xy"
 *              (chartInitialized)="myFunc($event)"
 * ></ts-chart2>
 *
 * <example-url>https://goo.gl/ieUPaG</example-url>
 */
@Component({
  selector: 'ts-chart2',
  templateUrl: './chart2.component.html',
  styleUrls: ['./chart2.component.scss'],
  host: {
    class: 'ts-chart2',
  },
  exportAs: 'tsChart2',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TsChart2Component implements OnInit, OnChanges, OnDestroy {
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
   * @param value - The visualization type. {@link TsChart2VisualizationOptions}
   */
  @Input()
  public set visualization(value: TsChart2VisualizationOptions) {
    if (!value) {
      return;
    }

    this._visualization = value;
  }
  public get visualization(): TsChart2VisualizationOptions {
    return this._visualization;
  }
  private _visualization: TsChart2VisualizationOptions = 'xy';

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
    } else if (isDevMode()) {
      console.error(
        'TsChart2Component: The amCharts library was not provided via injection token!',
      );
    }
  }


  /**
   * Reinitialize the chart if the visualization type has changed
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
  private init(type: TsChart2VisualizationOptions): void {
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
        console.error(`TsChart2Component: ${this.visualization} is not a supported chart type. See TsChart2VisualizationOptions.`);
      }
    });
  }

}
