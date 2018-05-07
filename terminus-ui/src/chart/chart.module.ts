import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  HighchartsService,
  HIGHCHARTS,
} from './highcharts.service';
import { TsChartComponent } from './chart.component';
import { TsChartSeriesDirective } from './series.directive';
import { TsChartPointDirective } from './point.directive';

export * from './chart.component';
export * from './options.interface';
export * from './highcharts.service';
export * from './chart.event';
export * from './series.directive';
export * from './point.directive';
export * from './utilities/compose-events';


@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    HighchartsService,
    {
      // This injection token will be overriden by the user.
      // It will provide the user-assembled Highcharts library.
      provide: HIGHCHARTS,
      useValue: null,
    },
  ],
  declarations: [
    TsChartComponent,
    TsChartSeriesDirective,
    TsChartPointDirective,
  ],
  exports: [
    TsChartComponent,
    TsChartSeriesDirective,
    TsChartPointDirective,
  ],
})
export class TsChartModule {}
