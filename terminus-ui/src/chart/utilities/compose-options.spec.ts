import { ElementRefMock } from '@terminus/ngx-tools/testing';

import { TsChartOptions } from './../options.interface';
import { TsChartComponent } from './../chart.component';
import { composeOptions } from './compose-options';
import { MAP_DATA } from './../options-defaults';
import { TsChartSeriesDirective } from './../series.directive';


describe(`composeOptions`, () => {
  let highchartsService: {highcharts: {[key: string]: any}};
  let componentMock: TsChartComponent;
  let userOptionsMock: TsChartOptions | undefined;
  const createOptions = (context = componentMock, userOptions = userOptionsMock): {[key: string]: any} => {
    return composeOptions(context, userOptions);
  };


  beforeEach(() => {
    const instance = {
      update: jest.fn(),
      destroy: jest.fn(),
      options: jest.fn().mockReturnValue({foo: 'bar'}),
    };

    highchartsService = {
      highcharts: {
        mapChart: jest.fn().mockReturnValue(instance),
        stockChart: jest.fn().mockReturnValue(instance),
        chart: jest.fn().mockReturnValue(instance),
      },
    };

    componentMock = new TsChartComponent(
      new ElementRefMock(),
      highchartsService,
    );
  });

  afterEach(() => {
    userOptionsMock = undefined;
  });


  test(`should include base options`, () => {
    const options = createOptions();

    expect(options.accessibility.enabled).toEqual(expect.any(Boolean));
    expect(options.exporting.buttons.contextButton).toBeTruthy();
  });


  test(`should add map defaults`, () => {
    componentMock.visualization = 'map';
    componentMock.map = 'usa';
    const options = createOptions();

    expect(options.colorAxis.type).toEqual(expect.any(String));
    expect(options.chart.map).toEqual(MAP_DATA['usa']);
  });


  test(`should add scatter defaults`, () => {
    componentMock.visualization = 'scatter';
    const options = createOptions();

    expect(options.chart.zoomType).toEqual('xy');
  });


  test(`should add exporting functions`, () => {
    componentMock.exportError.emit = jest.fn();
    const options = createOptions();
    const err = new Error('foo');

    options.exporting.error(err);
    expect(componentMock.exportError.emit).toHaveBeenCalledWith(err);
  });


  test(`should add user options`, () => {
    userOptionsMock = {
      legend: {
        enabled: false,
      },
    };
    const options = createOptions();

    expect(options.legend.enabled).toEqual(false);
  });


  test(`should add events`, () => {
    componentMock.series = new TsChartSeriesDirective();
    const options = createOptions();

    expect(Object.keys(options.chart.events).length).toBeTruthy();
  });


  test(`should add sparkline defaults`, () => {
    componentMock.sparkline = true;
    const options = createOptions();

    expect(options.exporting.enabled).toEqual(false);
    expect(options.plotOptions.series.animation).toEqual(false);
  });


  test(`should add user data`, () => {
    componentMock.data = [{
      data: ['foo', 'bar'],
    }];
    const options = createOptions();

    expect(options.series).toEqual(componentMock.data);
  });

});
