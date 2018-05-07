import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  isDevMode,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import {
  coerceArray,
  coerceBooleanProperty,
} from '@terminus/ngx-tools/coercion';
import { inputHasChanged } from '@terminus/ngx-tools';

import { HighchartsService } from './highcharts.service';
import {
  TsChartData,
  TsChartMapTypes,
  TsChartObject,
  TsChartOptions,
  TsChartVisualizationOptions,
} from './options.interface';
import { TsChartEvent } from './chart.event';
import { TsChartSeriesDirective } from './series.directive';
import { composeOptions } from './utilities/compose-options';


@Component({
  selector: 'ts-chart',
  styleUrls: ['./chart.component.scss'],
  template: ``,
  host: {
    class: 'ts-chart qa-chart',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'tsChart',
})
export class TsChartComponent implements AfterViewInit, OnChanges, OnDestroy {
  /**
   * Store a reference to the Highcharts lib
   */
  private highcharts: {[key: string]: any};

  /**
   * Store a reference to the created chart instance. {@link TsChartObject}
   */
  private instance: TsChartObject;

  /**
   * Create a reference to the child {@link TsChartSeriesDirective} if one exists
   */
  @ContentChild(TsChartSeriesDirective)
  public series!: TsChartSeriesDirective;

  /**
   * Define the data to visualize
   *
   * @param value - The chart data. {@link TsChartData}
   */
  @Input()
  public set data(value: TsChartData) {
    if (!value) {
      return;
    }

    this._data = coerceArray(value);
  }
  public get data(): TsChartData {
    return this._data;
  }
  private _data!: TsChartData;

  /**
   * Define a filename for exported charts
   */
  @Input()
  public exportFilename: string | undefined;

  /**
   * Set the map type. Only used if visualization === 'map'. Defaults to 'usa'.
   *
   * @param value - The desired map. {@link TsChartMapTypes}
   */
  @Input()
  public set map(value: TsChartMapTypes) {
    if (!value) {
      return;
    }

    this._map = value;
  }
  public get map(): TsChartMapTypes {
    return this._map;
  }
  private _map: TsChartMapTypes = 'usa';

  /**
   * Define the chart options {@link TsChartOptions}
   *
   * @param value - The object of user-defined chart options
   */
  @Input()
  public set options(value: TsChartOptions) {
    if (!value) {
      return;
    }

    this._options = value;
  }
  public get options(): TsChartOptions {
    return this._options;
  }
  private _options!: TsChartOptions;

  /**
   * Define if the chart is a sparkline (tiny) chart
   *
   * @param value - Boolean representing if the chart is a sparkline
   */
  @Input()
  public set sparkline(value: boolean) {
    this._sparkline = coerceBooleanProperty(value);
  }
  public get sparkline(): boolean {
    return this._sparkline;
  }
  private _sparkline: boolean;

  /**
   * Define if the stock controls (timeline, filters) should be added
   *
   * @param value - Boolean representing if the controls should be added
   */
  @Input()
  public set addStockControls(value: boolean) {
    this._addStockControls = coerceBooleanProperty(value);
  }
  public get addStockControls(): boolean {
    return this._addStockControls;
  }
  private _addStockControls: boolean = false;

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
  private _visualization!: TsChartVisualizationOptions;

  /**
   * Fires when a series is added to the chart after load time, using the addSeries method.
   */
  @Output()
  public addSeries: EventEmitter<TsChartEvent> = new EventEmitter();

  /**
   * Fires after a chart is printed through the context menu item or the Chart.print method.
   */
  @Output()
  public afterPrint: EventEmitter<TsChartEvent> = new EventEmitter();

  /**
   * Fires before a chart is printed through the context menu item or the Chart.print method.
   */
  @Output()
  public beforePrint: EventEmitter<TsChartEvent> = new EventEmitter();

  /**
   * Fires when clicking on the plot background.
   */
  @Output()
  public click: EventEmitter<TsChartEvent> = new EventEmitter();

  /**
   * Fires when a chart is initialized.
   */
  @Output()
  public create: EventEmitter<TsChartObject> = new EventEmitter();

  /**
   * Fires when a drilldown point is clicked, before the new series is added.
   */
  @Output()
  public drilldown: EventEmitter<TsChartEvent> = new EventEmitter();

  /**
   * Fires when drilling up from a drilldown series.
   */
  @Output()
  public drillup: EventEmitter<TsChartEvent> = new EventEmitter();

  /**
   * Event emitted when offline-exporting module fails to export a chart on the client side, and
   * fallbackToExportServer is disabled.
   */
  @Output()
  public exportError: EventEmitter<Error> = new EventEmitter();

  /**
   * Fires when the chart is finished loading.
   */
  @Output()
  public load: EventEmitter<TsChartEvent> = new EventEmitter();

  /**
   * Fires when the chart is redrawn, either after a call to chart.redraw() or after an axis, series
   * or point is modified with the redraw option set to true.
   */
  @Output()
  public redraw: EventEmitter<TsChartEvent> = new EventEmitter();

  /**
   * Fires after initial load of the chart (directly after the load event), and after each redraw
   * (directly after the redraw event).
   */
  @Output()
  public render: EventEmitter<TsChartEvent> = new EventEmitter();

  /**
   * Fires when an area of the chart has been selected.
   */
  @Output()
  public selection: EventEmitter<TsChartEvent> = new EventEmitter<TsChartEvent>();


  constructor(
    private el: ElementRef,
    private highchartsService: HighchartsService,
  ) {
    this.highcharts = this.highchartsService.highcharts;
  }


  /**
   * Update or recreate the chart when @Inputs change
   *
   * @param changes - An object containing the @Input changes
   */
  public ngOnChanges(changes: SimpleChanges): void {
    // istanbul ignore else
    if (this.instance) {
      if (inputHasChanged(changes, 'visualization') && !changes.visualization.isFirstChange()) {
        this.destroyChart();
        this.init();
      }

      if (inputHasChanged(changes, 'options')) {
        this.instance.update(composeOptions(this, changes.options.currentValue));
      }

      if (inputHasChanged(changes, 'data')) {
        this.instance.update(composeOptions(this, changes.data.currentValue));
      }

      // If there is a change to the stock controls display, we need to regenerate the chart with a
      // new initializer call
      if (inputHasChanged(changes, 'addStockControls') && !changes.addStockControls.isFirstChange()) {
        this.destroyChart();
        this.init();
      }
    }
  }


  /**
   * Initialize the chart
   */
  public ngAfterViewInit(): void {
    // Don't initialize a chart if the Highcharts library wasn't passed in.
    // istanbul ignore else
    if (this.highcharts) {
      this.init();
    } else if (isDevMode()) {
      console.error(
        'TsChartComponent: The Highcharts library was not provided via injection token!',
      );
    }
  }


  /**
   * Destroy the chart during the destroy lifecycle
   */
  public ngOnDestroy(): void {
    this.destroyChart();
  }


  /**
   * Initialize a chart
   */
  private init(): void {
    // Build out options for the visualization
    const options = composeOptions(this, this.options);

    // Create the chart instance
    if (this.visualization === 'map') {
      this.instance = this.highcharts.mapChart(this.el.nativeElement, options);
    } else if (this.addStockControls) {
      this.instance = this.highcharts.stockChart(this.el.nativeElement, options);
    } else {
      // NOTE: If we want all charts to support stock filtering, switch this to the `stockChart`
      // initializer and remove the previous ifelse
      this.instance = this.highcharts.chart(this.el.nativeElement, options);
    }

    // Emit the chart
    this.create.emit(this.instance);
  }


  /**
   * Destroy the chart instance
   */
  private destroyChart(): void {
    // istanbul ignore else
    if (this.instance) {
      this.instance.destroy();
      delete this.instance;
    }
  }


  /**
   * Return the length of the data series
   *
   * @return The length of the data
   */
  public get dataSeriesLength(): number {
    if (!this.data) {
      return 0;
    }
    let length: number;
    const hasSingleDataset: boolean = this.data.length === 1;
    const hasInnerDataArray: boolean = coerceBooleanProperty(this.data[0] && this.data[0].data);

    if (hasSingleDataset && hasInnerDataArray) {
      length = this.data[0].data.length;
    } else {
      length = this.data.length;
    }

    return length;
  }

  /**
   * Expose the current chart options
   *
   * @return The current instance options
   */
  public get chartOptions(): {[key: string]: any} | undefined {
    if (this.instance) {
      return this.instance.options;
    } else {
      return;
    }
  }

}
