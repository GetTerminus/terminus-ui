import { Component } from '@angular/core';
import {
  TestBed,
  ComponentFixture,
  TestModuleMetadata,
} from '@angular/core/testing';
import { configureTestBedWithoutReset } from '@terminus/ngx-tools/testing';



import {
  HIGHCHARTS,
  HighchartsService,
} from './highcharts.service';


@Component({
  template: ``,
})
class TestHostComponent {
  highcharts: {[key: string]: any};

  constructor(
    private highchartsService: HighchartsService,
  ) {
    this.highcharts = this.highchartsService.highcharts;
  }
}


function highchartsFactoryMock() {
  return {
    foo: 'bar',
  };
}


describe(`HighchartsService`, () => {
  // Standard tests
  let fixture: ComponentFixture<TestHostComponent>;
  let testComponent: TestHostComponent;
  const moduleDefinition: TestModuleMetadata = {
    declarations: [
      TestHostComponent,
    ],
    providers: [
      HighchartsService,
      {
        provide: HIGHCHARTS,
        useFactory: highchartsFactoryMock,
      },
    ],
  };

  configureTestBedWithoutReset(moduleDefinition);

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testComponent = fixture.componentInstance;
  });


  test(`should inject highcharts`, () => {
    expect(testComponent.highcharts).toEqual({foo: 'bar'});
  });

});
