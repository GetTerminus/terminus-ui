import {
  AfterViewInit,
  Component,
  Input,
} from '@angular/core';
import {
  TsChartComponent,
  TsChartVisualizationOptions,
} from '@terminus/ui/chart';
import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4maps from '@amcharts/amcharts4/maps';
import * as am4core from '@amcharts/amcharts4/core';
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow';

const XY_DATA: {[key: string]: any}[] = [];
let visits = 10;
for (let i = 1; i < 366; i++) {
  visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
  XY_DATA.push({ date: new Date(2018, 0, i), name: 'name' + i, value: visits });
}
const MAP_DATA: {[key: string]: any}[] = [{
  latitude: 48.856614,
  longitude: 2.352222,
  title: 'Paris',
}, {
  latitude: 40.712775,
  longitude: -74.005973,
  title: 'New York',
}, {
  latitude: 49.282729,
  longitude: -123.120738,
  title: 'Vancouver',
}];




@Component({
  selector: 'demo-chart',
  templateUrl: './chart.component.html',
})
export class ChartComponent implements AfterViewInit {
  public visualizationOptions: TsChartVisualizationOptions[] = [
    'xy',
    'pie',
    'map',
    'radar',
    'treemap',
    'sankey',
    'chord',
  ];
  visualization: TsChartVisualizationOptions = this.visualizationOptions[0];


  ngAfterViewInit() {
  }

  chartCreated(chart) {
    this.setChartData(chart, this.visualization);
  }


  // Currently using `any` here as I'm not sure how to let the consumer know what type is returned
  setChartData(chart: any, type: TsChartVisualizationOptions) {
    /**
     * XY
     */
    if (type === 'xy') {
      chart.data = XY_DATA;

      const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;

      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.minWidth = 35;

      const series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = 'date';
      series.dataFields.valueY = 'value';

      series.tooltipText = '{valueY.value}';
      chart.cursor = new am4charts.XYCursor();

      const scrollbarX = new am4charts.XYChartScrollbar();
      scrollbarX.series.push(series);
      chart.scrollbarX = scrollbarX;
    }

    /**
     * MAP
     */
    if (type === 'map') {
      const polygonSeries = new am4maps.MapPolygonSeries();
      polygonSeries.useGeodata = true;
      /*
       *polygonSeries.exclude = ['AQ'];
       */
      polygonSeries.include = [
        'PT', 'ES', 'FR', 'DE', 'BE', 'NL', 'IT', 'AT', 'GB', 'IE', 'CH', 'LU', 'GF', 'SR', 'GY', 'VE', 'CO', 'EC', 'PE', 'BO', 'CL', 'AR',
        'PY', 'UY', 'US', 'MX', 'CA', 'BR', 'PA', 'DR', 'HT', 'JM', 'CU', 'PA', 'CR', 'NI', 'HN', 'GT', 'MX',
      ];
      polygonSeries.data = MAP_DATA;

      // Configure series
      const polygonTemplate = polygonSeries.mapPolygons.template;
      polygonTemplate.tooltipText = '{name}';
      polygonTemplate.fill = am4core.color('#74B266');
      polygonTemplate.propertyFields.fill = 'fill';

      chart.series.push(polygonSeries);
      chart.geodata = am4geodata_worldLow;

      // Create hover state and set alternative fill color
      const hs = polygonTemplate.states.create('hover');
      hs.properties.fill = am4core.color('#367B25');

      // Create image series
      const imageSeries = chart.series.push(new am4maps.MapImageSeries());

      // Create a circle image in image series template so it gets replicated to all new images
      const imageSeriesTemplate = imageSeries.mapImages.template;
      const circle = imageSeriesTemplate.createChild(am4core.Circle);
      circle.radius = 4;
      circle.fill = am4core.color('#B27799');
      circle.stroke = am4core.color('#FFFFFF');
      circle.strokeWidth = 2;
      circle.nonScaling = true;
      circle.tooltipText = '{title}';

      // Set property fields
      imageSeriesTemplate.propertyFields.latitude = 'latitude';
      imageSeriesTemplate.propertyFields.longitude = 'longitude';

      // Add data for the three cities
      imageSeries.data = [{
        latitude: 48.856614,
        longitude: 2.352222,
        title: 'Paris',
      }, {
        latitude: 40.712775,
        longitude: -74.005973,
        title: 'New York',
      }, {
        latitude: 49.282729,
        longitude: -123.120738,
        title: 'Vancouver',
      }];
    }

    /**
     * PIE
     */
    if (type === 'pie') {
      chart.data = [
        {
          country: 'Lithuania',
          litres: 501.9,
        }, {
          country: 'Czech Republic',
          litres: 301.9,
        }, {
          country: 'Ireland',
          litres: 201.1,
        }, {
          country: 'Germany',
          litres: 165.8,
        }, {
          country: 'Australia',
          litres: 139.9,
        }, {
          country: 'Austria',
          litres: 128.3,
        }, {
          country: 'UK',
          litres: 99,
        }, {
          country: 'Belgium',
          litres: 60,
        }, {
          country: 'The Netherlands',
          litres: 50,
        },
      ];

      // Add and configure Series
      const pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = 'litres';
      pieSeries.dataFields.category = 'country';

      // Let's cut a hole in our Pie chart the size of 40% the radius
      chart.innerRadius = am4core.percent(40);

      // Disable ticks and labels
      pieSeries.labels.template.disabled = true;
      pieSeries.ticks.template.disabled = true;

      // Disable tooltips
      pieSeries.slices.template.tooltipText = '';

      // Add a legend
      chart.legend = new am4charts.Legend();
    }

    /**
     * RADAR
     */
    if (type === 'radar') {
      chart.data = [
        {
          category: 'One',
          value1: 8,
          value2: 2,
          value3: 4,
          value4: 3,
        },
        {
          category: 'Two',
          value1: 11,
          value2: 4,
          value3: 2,
          value4: 4,
        },
        {
          category: 'Three',
          value1: 7,
          value2: 6,
          value3: 6,
          value4: 2,
        },
        {
          category: 'Four',
          value1: 13,
          value2: 8,
          value3: 3,
          value4: 2,
        },
        {
          category: 'Five',
          value1: 12,
          value2: 10,
          value3: 5,
          value4: 1,
        },
        {
          category: 'Six',
          value1: 15,
          value2: 12,
          value3: 4,
          value4: 4,
        },
        {
          category: 'Seven',
          value1: 9,
          value2: 14,
          value3: 6,
          value4: 2,
        },
        {
          category: 'Eight',
          value1: 6,
          value2: 16,
          value3: 5,
          value4: 1,
        },
      ];

      chart.padding(20, 20, 20, 20);

      const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = 'category';
      categoryAxis.renderer.labels.template.location = 0.5;
      categoryAxis.renderer.tooltipLocation = 0.5;

      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.labels.template.horizontalCenter = 'left';
      valueAxis.min = 0;

      const series1 = chart.series.push(new am4charts.RadarColumnSeries());
      series1.columns.template.width = am4core.percent(80);
      series1.name = 'Series 1';
      series1.dataFields.categoryX = 'category';
      series1.dataFields.valueY = 'value2';
      series1.stacked = true;

      const series2 = chart.series.push(new am4charts.RadarColumnSeries());
      series2.columns.template.width = am4core.percent(80);
      series2.columns.template.tooltipText = '{name}: {valueY.value}';
      series2.name = 'Series 2';
      series2.dataFields.categoryX = 'category';
      series2.dataFields.valueY = 'value2';
      series2.stacked = true;

      const series3 = chart.series.push(new am4charts.RadarColumnSeries());
      series3.columns.template.width = am4core.percent(80);
      series3.columns.template.tooltipText = '{name}: {valueY.value}';
      series3.name = 'Series 3';
      series3.dataFields.categoryX = 'category';
      series3.dataFields.valueY = 'value3';
      series3.stacked = true;

      const series4 = chart.series.push(new am4charts.RadarColumnSeries());
      series4.columns.template.width = am4core.percent(80);
      series4.columns.template.tooltipText = '{name}: {valueY.value}';
      series4.name = 'Series 4';
      series4.dataFields.categoryX = 'category';
      series4.dataFields.valueY = 'value4';
      series4.stacked = true;

      chart.seriesContainer.zIndex = -1;

      chart.scrollbarX = new am4core.Scrollbar();
      chart.scrollbarY = new am4core.Scrollbar();

      chart.cursor = new am4charts.RadarCursor();
      chart.cursor.xAxis = categoryAxis;
      chart.cursor.fullWidthXLine = true;
      chart.cursor.lineX.strokeOpacity = 0;
      chart.cursor.lineX.fillOpacity = 0.1;
      chart.cursor.lineX.fill = am4core.color('#000000');
    }

    /**
     * TREEMAP
     */
    if (type === 'treemap') {
      chart.data = [{
        name: 'First',
        children: [
          { name: 'A1', value: 100 },
          { name: 'A2', value: 60 },
          { name: 'A3', value: 30 },
        ],
      }, {
        name: 'Second',
        children: [
          { name: 'B1', value: 135 },
          { name: 'B2', value: 98 },
          { name: 'B3', value: 56 },
        ],
      }, {
        name: 'Third',
        children: [
          { name: 'C1', value: 335 },
          { name: 'C2', value: 148 },
          { name: 'C3', value: 126 },
          { name: 'C4', value: 26 },
        ],
      }, {
        name: 'Fourth',
        children: [
          { name: 'D1', value: 415 },
          { name: 'D2', value: 148 },
          { name: 'D3', value: 89 },
          { name: 'D4', value: 64 },
          { name: 'D5', value: 16 },
        ],
      }, {
        name: 'Fifth',
        children: [
          { name: 'E1', value: 687 },
          { name: 'E2', value: 148 },
        ],
      }];


      /* Set color step */
      chart.colors.step = 2;

      /* Define data fields */
      chart.dataFields.value = 'value';
      chart.dataFields.name = 'name';
      chart.dataFields.children = 'children';

      /* Create top-level series */
      const level1 = chart.seriesTemplates.create('0');
      const level1Column = level1.columns.template;
      level1Column.fillOpacity = 0;
      level1Column.strokeOpacity = 0;

      /* Create second-level series */
      const level2 = chart.seriesTemplates.create('1');
      const level2Column = level2.columns.template;
      level2Column.column.cornerRadius(10, 10, 10, 10);
      level2Column.fillOpacity = 0.8;
      level2Column.stroke = am4core.color('#fff');
      level2Column.strokeWidth = 5;
      level2Column.strokeOpacity = 1;

      const level2Bullet = level2.bullets.push(new am4charts.LabelBullet());
      level2Bullet.locationY = 0.5;
      level2Bullet.locationX = 0.5;
      level2Bullet.label.text = '{name}';
      level2Bullet.label.fill = am4core.color('#fff');

      /* Add a navigation bar */
      chart.navigationBar = new am4charts.NavigationBar();
      chart.homeText = 'TOP';
    }

    /**
     * SANKEY
     */
    if (type === 'sankey') {
      // Set data
      chart.data = [
        { from: 'A', to: 'D', value: 10, nodeColor: '#06D6A0' },
        { from: 'B', to: 'D', value: 8, nodeColor: '#CDCDCD' },
        { from: 'B', to: 'E', value: 4, nodeColor: '#CDCDCD' },
        { from: 'C', to: 'E', value: 3, nodeColor: '#CDCDCD' },
        { from: 'D', to: 'G', value: 5, nodeColor: '#06D6A0' },
        { from: 'D', to: 'I', value: 2, nodeColor: '#06D6A0' },
        { from: 'D', to: 'H', value: 3, nodeColor: '#06D6A0' },
        { from: 'E', to: 'H', value: 6, nodeColor: '#CDCDCD' },
        { from: 'G', to: 'J', value: 5, nodeColor: '#CDCDCD' },
        { from: 'I', to: 'J', value: 1, nodeColor: '#CDCDCD' },
        { from: 'H', to: 'J', value: 9, nodeColor: '#06D6A0' },
        { from: 'J', nodeColor: '#06D6A0' },
      ];

      // Configure data fields
      chart.dataFields.fromName = 'from';
      chart.dataFields.toName = 'to';
      chart.dataFields.value = 'value';
      chart.dataFields.color = 'nodeColor';

      // Configure nodes
      const nodeTemplate = chart.nodes.template;
      nodeTemplate.width = 30;
      nodeTemplate.nameLabel.locationX = 0.2;
      nodeTemplate.nameLabel.label.fill = am4core.color('#fff');
      nodeTemplate.nameLabel.label.fontWeight = 'bold';
    }

    /**
     * CHORD
     */
    if (type === 'chord') {
      chart.data = [
        { from: 'A', to: 'D', value: 10, nodeColor: '#CDCDCD' },
        { from: 'B', to: 'D', value: 8, nodeColor: '#06D6A0', linkColor: '#06D6A0', linkOpacity: 1 },
        { from: 'B', to: 'E', value: 4, nodeColor: '#06D6A0', linkColor: '#06D6A0', linkOpacity: 1 },
        { from: 'B', to: 'C', value: 2, nodeColor: '#06D6A0', linkColor: '#06D6A0', linkOpacity: 1 },
        { from: 'C', to: 'E', value: 14, nodeColor: '#CDCDCD' },
        { from: 'E', to: 'D', value: 8, nodeColor: '#CDCDCD' },
        { from: 'C', to: 'A', value: 4, nodeColor: '#CDCDCD' },
        { from: 'G', to: 'A', value: 7, nodeColor: '#CDCDCD' },
        { from: 'D', to: 'B', value: 1, nodeColor: '#CDCDCD', linkColor: '#06D6A0', linkOpacity: 1 },
      ];

      chart.dataFields.fromName = 'from';
      chart.dataFields.toName = 'to';
      chart.dataFields.value = 'value';
      chart.dataFields.color = 'nodeColor';

      // Configure ribbon appearance
      const slice = chart.nodes.template.slice;

      // Configure links
      const link = chart.links.template;
      link.fillOpacity = 0.1;
      link.colorMode = 'solid';
      link.propertyFields.fill = 'linkColor';
      link.propertyFields.fillOpacity = 'linkOpacity';
    }

  }
}
