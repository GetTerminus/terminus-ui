import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TsChartComponent } from './chart.component';
import { TsAmChartsService, TS_AMCHARTS_TOKEN } from './amcharts.service';

export * from './chart.component';
export { TsAmChartsToken } from './amcharts.service';


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
