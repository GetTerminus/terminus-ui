import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  TsChartComponent,
  TsChartData,
  TsChartEvent,
  TsChartOptions,
  TsChartObject,
} from '@terminus/ui';

import {
  AREA_DATA,
  COLUMN_DATA,
  DRILLDOWN_DATA,
  DRILLDOWN_INNER_DATA,
  EUROPE_DATA,
  PIE_DATA,
  SCATTER_DATA,
  SPARKLINE_DATA_1,
  SPARKLINE_DATA_2,
  SPARKLINE_DATA_3,
  STOCK_DATA,
  USA_DATA,
  WORLD_CONTINENTS_DATA,
  WORLD_DATA,
} from './data/index';


@Component({
  selector: 'demo-chart',
  templateUrl: './chart.component.html',
})
export class ChartComponent implements OnInit, AfterViewInit {
  old: any;
  visualizationOptions: {name: string; value: string}[] = [
    {
      name: 'Area',
      value: 'area',
    },
    {
      name: 'Bar',
      value: 'bar',
    },
    {
      name: 'Column',
      value: 'column',
    },
    {
      name: 'Line',
      value: 'line',
    },
    {
      name: 'Drilldown Demo',
      value: 'drilldown',
    },
    {
      name: 'Events Demo',
      value: 'events',
    },
    {
      name: 'Map - USA',
      value: 'mapUsa',
    },
    {
      name: 'Map - North America',
      value: 'mapNorthAmerica',
    },
    {
      name: 'Map - World Continents',
      value: 'mapWorldContinents',
    },
    {
      name: 'Map - World',
      value: 'mapWorld',
    },
    {
      name: 'Map - Europe',
      value: 'mapEurope',
    },
    {
      name: 'Pie',
      value: 'pie',
    },
    {
      name: 'Scatter',
      value: 'scatter',
    },
    {
      name: 'Sparklines',
      value: 'sparklines',
    },
    {
      name: 'Stock - Line',
      value: 'stock',
    },
  ];
  example = this.visualizationOptions[0].value;



  /**
   * Area
   */
  areaOptions: TsChartOptions = {
    title: {
      text: 'US and USSR nuclear stockpiles',
    },
    yAxis: {
      title: {
        text: 'Nuclear weapon states',
      },
    },
    tooltip: {
      pointFormatter: function() {
        return `${(this as any).series.name} had stockpiled <b>${(this as any).y.toLocaleString()}</b> warheads in ${(this as any).x}`;
      },
    },
    plotOptions: {
      area: {
        pointStart: 1940,
      },
    },
  };
  areaData: TsChartData = AREA_DATA;


  /**
   * Column
   */
  columnOptions: TsChartOptions = {
    title: {
      text: 'Fruit Consumption',
    },
    xAxis: {
      categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas'],
    },
    yAxis: {
      title: {
        text: 'Total fruit consumption',
      },
    },
    tooltip: {
      pointFormatter: function() {
        return `${(this as any).series.name}: ${(this as any).y}<br/>Total: ${(this as any).stackTotal}</b>`;
      },
    },
  };
  columnOptionsStacked: TsChartOptions = {
    title: {
      text: 'Fruit Consumption',
    },
    xAxis: {
      categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas'],
    },
    yAxis: {
      title: {
        text: 'Total fruit consumption',
      },
    },
    tooltip: {
      pointFormatter: function() {
        return `${(this as any).series.name}: ${(this as any).y}<br/>Total: ${(this as any).stackTotal}</b>`;
      },
    },
    // Both bar and column demos are using these options
    plotOptions: {
      bar: {
        stacking: 'percent',
      },
      column: {
        stacking: 'percent',
      },
    },
  };
  columnData: TsChartData = COLUMN_DATA;


  /**
   * Drilldown
   */
  drilldownOptions: TsChartOptions = {
    title: {
      text: 'Browser market shares. January, 2018',
    },
    subtitle: {
      text: 'Click the columns to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>',
    },
    xAxis: {
      type: 'category',
    },
    yAxis: {
      title: {
        text: 'Total percent market share',
      },
    },
    legend: {
      enabled: false,
    },
    drilldown: {
      series: DRILLDOWN_INNER_DATA,
    },
  };
  drilldownData: TsChartData = DRILLDOWN_DATA;


  /**
   * Pie
   */
  pieOptions: TsChartOptions = {
    plotOptions: {
      pie: {
        dataLabels: {
          formatter: function() {
            const percentage: number = Math.round(((this as any).percentage + 0.00001) * 100) / 100;
            return `<b>${(this as any).point.name}</b>: ${percentage}%`;
          },
        },
      },
    },
    title: {
      text: 'My title',
    },
    tooltip: {
      pointFormatter: function() {
        const percentage: number = Math.round(((this as any).percentage + 0.00001) * 100) / 100;
        return `${(this as any).series.name}: <b>${percentage}%</b>`;
      },
      split: false,
    },
  };
  pieData: TsChartData = PIE_DATA;


  /**
   * MAP - USA
   */
  mapUsaOptions: TsChartOptions = {
    title: {
      text: 'USA - Population',
    },
  };
  mapUsaData: TsChartData = [
    {
      name: 'Random data',
      joinBy: ['postal-code', 'code'],
      data: USA_DATA,
      dataLabels: {
        formatter: function() {
          return this.point.code;
        },
      },
    },
  ];


  /**
   * MAP - NA
   */
  mapNorthAmericaOptions: TsChartOptions = {
    title: {
      text: 'USA - North America',
    },
    subtitle: {
      text: 'Population 2016',
    },
    mapNavigation: {
      enabled: true,
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      formatter: function() {
        return `${this.key}: ${(this.point.z * 1000).toLocaleString()}`;
      },
    },
  };
  mapNorthAmericaData: TsChartData = [
    {
      name: 'Countries',
      enableMouseTracking: false,
    },
    {
      type: 'mapbubble',
      joinBy: ['iso-a3', 'code3'],
      data: WORLD_DATA,
      dataLabels: {
        enabled: false,
      },
    },
  ];


  /**
   * MAP - World
   */
  mapWorldOptions: TsChartOptions = {
    title: {
      text: 'World',
    },
    subtitle: {
      text: 'Population 2016',
    },
    mapNavigation: {
      enabled: true,
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      formatter: function() {
        return `${this.key}: ${(this.point.z * 1000).toLocaleString()}`;
      },
    },
  };
  mapWorldData: TsChartData = [
    {
      name: 'Countries',
      enableMouseTracking: false,
    },
    {
      type: 'mapbubble',
      joinBy: ['iso-a3', 'code3'],
      data: WORLD_DATA,
      dataLabels: {
        enabled: false,
      },
    },
  ];


  /**
   * MAP - World Contintents
   */
  mapWorldContinentsOptions: TsChartOptions = {
    title: {
      text: 'World',
    },
    subtitle: {
      text: 'Continents',
    },
  };
  mapWorldContinentsData: TsChartData = [
    {
      name: 'Random data',
      dataLabels: {
        formatter: function() {
          return `${(this as any).point.name}<sup>(${(this as any).point.value})</sup>`;
        },
      },
      data: WORLD_CONTINENTS_DATA,
    },
  ];


  /**
   * MAP - Europe
   */
  mapEuropeOptions: TsChartOptions = {
    title: {
      text: 'Europe',
    },
    subtitle: {
      text: 'Continents',
    },
    map: {
      joinBy: ['iso-a2', 'code'],
    },
    legend: {
      enabled: false,
    },
  };
  mapEuropeData: TsChartData = EUROPE_DATA;


  /**
   * Scatter
   */
  scatterOptions: TsChartOptions = {
    tooltip: {
      pointFormatter: function() {
        return `<b>${this.series.name}</b><br>${this.x} cm, ${this.y} kg`;
      },
    },
    xAxis: {
      title: {
        text: 'Height (cm)',
      },
    },
    yAxis: {
      title: {
        text: 'Weight (kg)',
      },
    },
  };
  scatterData: TsChartData = SCATTER_DATA;


  /**
   * Sparkline
   */
  sparklineOptions: TsChartOptions = {
    tooltip: {
      pointFormatter: function() {
        return `${(this as any).series.name}: <b>${(this as any).y.toLocaleString()}</b><br>`;
      },
    },
    plotOptions: {
      area: {
        pointStart: 1940,
      },
    },
  };
  sparklineData1: TsChartData = SPARKLINE_DATA_1;
  sparklineData2: TsChartData = SPARKLINE_DATA_2;
  sparklineData3: TsChartData = SPARKLINE_DATA_3;


  /**
   * STOCK
   */
  stockOptions: TsChartOptions = {
    title: {
      text: 'AAPL Stock Price',
    },
  };
  stockData: TsChartData = [
    {
      name: 'AAPL',
      type: 'line',
      data: STOCK_DATA,
    },
  ];


  // Provide access to a chart
  @ViewChild(TsChartComponent)
  public myChart!: TsChartComponent;


  ngOnInit() {
  }

  ngAfterViewInit() {
    // Access the chart's options after initialization:
    /*
     *console.log('this.myChart.chartOptions: ', this.myChart.chartOptions);
     */
  }

  uiFormatFn = (v: any): string => v.name;
  uiModelFn = (v: any): string => v.value;




  /**
   * CHART EVENTS
   */
  onAfterPrint(e: TsChartEvent) {
    console.log('DEMO: Chart afterPrint: ', e);
  }
  onBeforePrint(e: TsChartEvent) {
    console.log('DEMO: Chart beforePrint: ', e);
  }
  onClick(e: TsChartEvent) {
    console.log('DEMO: Chart: click: ', e);
  }
  onCreate(e: TsChartObject) {
    console.log('DEMO: Chart: create: ', e);
  }
  onDrilldown(e: TsChartObject) {
    console.log('DEMO: Chart: drilldown: ', e);
  }
  onDrillup(e: TsChartObject) {
    console.log('DEMO: Chart: drillup: ', e);
  }
  onExportError(e: Error) {
    console.log('DEMO: Chart: Export error ', e);
  }
  onLoad(e: TsChartEvent) {
    console.log('DEMO: Chart: load: ', e);
  }
  onRedraw(e: TsChartEvent) {
    console.log('DEMO: Chart: redraw: ', e);
  }
  onRender(e: TsChartEvent) {
    console.log('DEMO: Chart: render: ', e);
  }
  onSelection(e: TsChartEvent) {
    console.log('DEMO: Chart: selection: ', e);
  }

  /**
   * SERIES EVENTS
   */
  onSeriesAfterAnimate(e: TsChartEvent) {
    console.log('DEMO: Series: afterAnimate ', e);
  }
  onSeriesCheckboxClick(e: TsChartEvent) {
    console.log('DEMO: Series: click ', e);
  }
  onSeriesClick(e: TsChartEvent) {
    console.log('DEMO: Series: click ', e);
  }
  onSeriesHide(e: TsChartEvent) {
    console.log('DEMO: Series: hide ', e);
  }
  onSeriesLegendItemClick(e: TsChartEvent) {
    console.log('DEMO: Series: legend item click ', e);
  }
  onSeriesMouseOut(e: TsChartEvent) {
    console.log('DEMO: Series: mouseOut: ', e);
  }
  onSeriesMouseOver(e: TsChartEvent) {
    console.log('DEMO: Series: mouseOver: ', e);
  }
  onSeriesShow(e: TsChartEvent) {
    console.log('DEMO: Series: show ', e);
  }

  /**
   * POINT EVENTS
   */
  onPointClick(e: TsChartEvent) {
    console.log('DEMO: Point: click: ', e);
  }
  onPointMouseOut(e: TsChartEvent) {
    console.log('DEMO: Point: mouseOut: ', e);
  }
  onPointMouseOver(e: TsChartEvent) {
    console.log('DEMO: Point: mouseOver: ', e);
  }
  onPointRemove(e: TsChartEvent) {
    console.log('DEMO: Point: remove: ', e);
  }
  onPointSelect(e: TsChartEvent) {
    console.log('DEMO: Point: select: ', e);
  }
  onPointUnselect(e: TsChartEvent) {
    console.log('DEMO: Point: unselect: ', e);
  }
  onPointUpdate(e: TsChartEvent) {
    console.log('DEMO: Point: update: ', e);
  }

}
