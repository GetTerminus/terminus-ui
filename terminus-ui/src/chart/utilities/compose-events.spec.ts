import {
  createMouseEvent,
  ElementRefMock,
} from '@terminus/ngx-tools/testing';

import { TsChartEvent } from './../chart.event';
import { composeEvents } from './compose-events';
import { TsChartComponent } from './../chart.component';
import { TsChartSeriesDirective } from './../series.directive';
import { TsChartPointDirective } from './../point.directive';


describe(`composeEvents`, () => {
  let highchartsService: {highcharts: {[key: string]: any}};
  let componentMock: TsChartComponent;
  let seriesMock: TsChartSeriesDirective;
  let pointMock: TsChartPointDirective;

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

    seriesMock = new TsChartSeriesDirective();
    pointMock = new TsChartPointDirective();
  });


  test(`should return an object with events wired to the component emitters`, () => {
    componentMock.addSeries.emit = jest.fn();
    const options = composeEvents(componentMock);
    expect(options.chart.events.addSeries).toEqual(expect.any(Function));

    options.chart.events.addSeries(componentMock, createMouseEvent('click'));
    expect(componentMock.addSeries.emit).toHaveBeenCalledWith(expect.any(TsChartEvent));
  });


  describe(`series`, () => {

    beforeEach(() => {
      seriesMock.click.emit = jest.fn();
      pointMock.click.emit = jest.fn();
    });

    test(`should attach seriesevents if the series directive was passed in`, () => {
      const options = composeEvents(componentMock, seriesMock);
      expect(options.plotOptions.series.events.click).toEqual(expect.any(Function));

      options.plotOptions.series.events.click(componentMock, createMouseEvent('click'));
      expect(seriesMock.click.emit).toHaveBeenCalledWith(expect.any(TsChartEvent));
    });


    test(`should attach point events if series contains a reference`, () => {
      const options = composeEvents(componentMock, seriesMock, pointMock);
      expect(options.plotOptions.series.point.events.click).toEqual(expect.any(Function));

      options.plotOptions.series.point.events.click(componentMock, createMouseEvent('click'));
      expect(pointMock.click.emit).toHaveBeenCalledWith(expect.any(TsChartEvent));
    });

  });

});
