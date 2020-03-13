import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
// eslint-disable-next-line camelcase
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
// eslint-disable-next-line no-duplicate-imports, camelcase
import am4themes_material from '@amcharts/amcharts4/themes/animated';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TsCardModule } from '@terminus/ui/card';
import {
  TS_AMCHARTS_TOKEN,
  TsAmChartsToken,
  TsChartModule,
} from '@terminus/ui/chart';
import { TsOptionModule } from '@terminus/ui/option';
import { TsSelectModule } from '@terminus/ui/select';
import { TsSpacingModule } from '@terminus/ui/spacing';

/**
 * Start amCharts config
 */

/**
 *
 */
export const amChartsFactory = (): TsAmChartsToken => ({
  core: am4core,
  charts: am4charts,
  maps: am4maps,
  // eslint-disable-next-line camelcase
  themes: [am4themes_animated, am4themes_material],
});
/**
 * End amCharts config
 */

import { ChartRoutingModule } from './chart-routing.module';
import { ChartComponent } from './chart.component';


@NgModule({
  imports: [
    ChartRoutingModule,
    CommonModule,
    FormsModule,
    TsCardModule,
    TsChartModule,
    TsOptionModule,
    TsSelectModule,
    TsSpacingModule,
  ],
  providers: [
    // Use the factory function to overwrite the `TS_AMCHARTS_TOKEN` injectable:
    {
      provide: TS_AMCHARTS_TOKEN,
      useFactory: amChartsFactory,
    },
  ],
  declarations: [
    ChartComponent,
  ],
})

export class ChartModule {}
