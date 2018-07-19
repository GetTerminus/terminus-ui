import {
  Inject,
  Injectable,
  InjectionToken,
} from '@angular/core';


export interface TsAmChartsToken {
  core: any;
  charts: any;
  maps?: any;
  themes?: any[];
}

/**
 * Create an injection token that the consumer can override with their version of Highcharts
 */
export const TS_AMCHARTS_TOKEN: InjectionToken<TsAmChartsToken> = new InjectionToken('amCharts');


/**
 * Expose amCharts via a service
 */
@Injectable()
export class TsAmChartsService {

  constructor(
    @Inject(TS_AMCHARTS_TOKEN) public amCharts: TsAmChartsToken,
  ) {
    if (amCharts && amCharts.themes && amCharts.themes.length > 0) {
      for (const theme of amCharts.themes) {
        // istanbul ignore else
        if (theme) {
          amCharts.core.useTheme(theme);
        }
      }
    }
  }

}
