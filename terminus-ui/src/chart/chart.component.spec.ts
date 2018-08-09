import {
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import {
  ElementRefMock,
} from '@terminus/ngx-tools/testing';

import { TsChartComponent } from './chart.component';
import {
  TsChartData,
  TsChartOptions,
} from './options.interface';


describe(`TsChartComponent`, () => {
  let highchartsService: {highcharts: {[key: string]: any}};
  let component: TsChartComponent;
  let instanceMock;

  beforeEach(() => {
    instanceMock = {
      update: jest.fn(),
      destroy: jest.fn(),
      options: jest.fn().mockReturnValue({foo: 'bar'}),
    };

    highchartsService = {
      highcharts: {
        mapChart: jest.fn().mockReturnValue(instanceMock),
        stockChart: jest.fn().mockReturnValue(instanceMock),
        chart: jest.fn().mockReturnValue(instanceMock),
      },
    };

    component = new TsChartComponent(
      new ElementRefMock(),
      highchartsService,
    );
  });


  describe(`data`, () => {

    test(`should return undefined if no value is passed in`, () => {
      component.data = null as any;
      expect(component.data).toEqual(undefined);
    });


    test(`should coerce to an array and set data`, () => {
      component.data = {data: ['b']} as any;
      expect(component.data).toEqual(expect.any(Array));
    });

  });


  test(`should set the map type`, () => {
    component.map = null as any;
    expect(component.map).toEqual('usa');

    component.map = 'world';
    expect(component.map).toEqual('world');
  });


  test(`should set user options`, () => {
    component.options = null as any;
    expect(component.options).toEqual(undefined);

    const options: TsChartOptions = {legend: {enabled: false}};
    component.options = options;
    expect(component.options).toEqual(expect.any(Object));
  });


  test(`should set the sparkline value`, () => {
    component.sparkline = null as any;
    expect(component.sparkline).toEqual(false);

    component.sparkline = true;
    expect(component.sparkline).toEqual(true);
  });


  test(`should set the addStockControls value`, () => {
    component.addStockControls = null as any;
    expect(component.addStockControls).toEqual(false);

    component.addStockControls = true;
    expect(component.addStockControls).toEqual(true);
  });


  test(`should set the visualization value`, () => {
    component.visualization = null as any;
    expect(component.visualization).toEqual(undefined);

    component.visualization = 'bar';
    expect(component.visualization).toEqual('bar');
  });


  describe(`ngOnChanges`, () => {

    beforeEach(() => {
      component['instance'] = instanceMock;
      component['destroyChart'] = jest.fn();
      component['init'] = jest.fn();
      component['instance'].update = jest.fn();
    });


    test(`should destroy and reinitialize the chart if the visualization changes`, () => {
      const changesMock: SimpleChanges = {
        visualization: new SimpleChange('bar', 'line', false),
      };
      component.ngOnChanges(changesMock);

      expect(component['destroyChart']).toHaveBeenCalled();
      expect(component['init']).toHaveBeenCalled();
    });


    test(`should update the chart if options change`, () => {
      const newOptions: TsChartOptions = {legend: {enabled: false}};
      const changesMock: SimpleChanges = {
        options: new SimpleChange({}, newOptions, false),
      };
      component.ngOnChanges(changesMock);

      expect(component['instance'].update).toHaveBeenCalledWith(expect.any(Object));
    });


    test(`should update the chart if data changes`, () => {
      const newData: TsChartData = [{data: ['foo']}];
      const changesMock: SimpleChanges = {
        data: new SimpleChange({}, newData, false),
      };
      component.ngOnChanges(changesMock);

      expect(component['instance'].update).toHaveBeenCalledWith(expect.any(Object));
    });


    test(`should destroy and reinitialize the chart if the stock controls value changes`, () => {
      const changesMock: SimpleChanges = {
        addStockControls: new SimpleChange(false, true, false),
      };
      component.ngOnChanges(changesMock);

      expect(component['destroyChart']).toHaveBeenCalled();
      expect(component['init']).toHaveBeenCalled();
    });

  });


  describe(`ngAfterViewInit`, () => {

    test(`should initialize the chart if highcharts exists`, () => {
      component['init'] = jest.fn();
      component.ngAfterViewInit();

      expect(component['init']).toHaveBeenCalled();
    });

  });


  describe(`ngOnDestroy`, () => {

    test(`should destroy the chart if one exists`, () => {
      component['destroyChart'] = jest.fn();
      component.ngOnDestroy();

      expect(component['destroyChart']).toHaveBeenCalled();
    });

  });


  describe(`init`, () => {

    test(`should initialize a map chart`, () => {
      component.visualization = 'map';
      component['init']();

      expect(component['highcharts'].mapChart).toHaveBeenCalled();
    });


    test(`should initialize a stock chart`, () => {
      component.visualization = 'line';
      component.addStockControls = true;
      component['init']();

      expect(component['highcharts'].stockChart).toHaveBeenCalled();
    });


    test(`should initialize a standard chart`, () => {
      component['instance'] = instanceMock;
      component.create.emit = jest.fn();
      component.visualization = 'line';
      component['init']();

      expect(component['highcharts'].chart).toHaveBeenCalled();
      expect(component.create.emit).toHaveBeenCalledWith(instanceMock);
    });

  });


  describe(`destroyChart`, () => {

    test(`should destroy the chart and delete the instance`, () => {
      component['instance'] = instanceMock;
      component['destroyChart']();

      expect(instanceMock.destroy).toHaveBeenCalled();
      expect(component['instance']).toBeFalsy();
    });

  });


  describe(`get dataSeriesLength`, () => {

    test(`should return 0 if no data exists`, () => {
      expect(component.dataSeriesLength).toEqual(0);
    });


    test(`should return the length if standard data exists`, () => {
      component.data = [{data: ['foo', 'bar', 'baz']}];

      expect(component.dataSeriesLength).toEqual(3);
    });


    test(`should return the correct count if it's a nested array`, () => {
      component.data = [
        {name: 'foo'},
        {name: 'bar'},
      ];

      expect(component.dataSeriesLength).toEqual(2);
    });


    test(`should return 0 if nested data is expected but not found`, () => {
      component.data = [
        {},
      ];
      expect(component.dataSeriesLength).toEqual(0);
    });

  });


  describe(`get chartOptions`, () => {

    test(`should return the instance options if the instance exists`, () => {
      expect(component.chartOptions).toEqual(undefined);

      component['instance'] = instanceMock;
      expect(component.chartOptions).toEqual(instanceMock.options);
    });

  });

});
