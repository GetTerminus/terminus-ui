import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TS_AMCHARTS_TOKEN, TsAmChartsService } from './amcharts.service';
import { TsChartComponent } from './chart.component';

export * from './chart.component';
export * from './amcharts.service';


@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    TsAmChartsService,
    {
      // This injection token will be overriden by the user.
      // It will provide the amCharts core library and chart library
      provide: TS_AMCHARTS_TOKEN,
      useValue: null,
    },
  ],
  declarations: [
    TsChartComponent,
  ],
  exports: [
    TsChartComponent,
  ],
})
export class TsChartModule {}
