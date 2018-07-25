import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/*
 *import * as am4core from '@amcharts/amcharts4/core';
 *import am4themes_animated from '@amcharts/amcharts4/themes/animated';
 */

import { TsChart2Component } from './chart2.component';
import { TsAmChartsService, TS_AMCHARTS_TOKEN } from './amcharts.service';

export * from './chart2.component';
export * from './amcharts.service';


// Set amCharts theme
/*
 *am4core.useTheme(am4themes_animated);
 */

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
    TsChart2Component,
  ],
  exports: [
    TsChart2Component,
  ],
})
export class TsChart2Module {}
