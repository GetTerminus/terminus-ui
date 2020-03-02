import {
  Inject,
  Injectable,
  InjectionToken,
} from '@angular/core';


// tslint:disable no-any
export interface TsAmChartsToken {
  core: any;
  charts: any;
  maps?: any;
  themes?: any[];
}
// tslint:enable no-any

/**
 * Create an injection token that the consumer can override with their version of amCharts
 */
export const TS_AMCHARTS_TOKEN = new InjectionToken<TsAmChartsToken>('amCharts');


/**
 * Expose amCharts via a service
 */
@Injectable({ providedIn: 'root' })
export class TsAmChartsService {

  constructor(
    @Inject(TS_AMCHARTS_TOKEN) public amCharts: TsAmChartsToken,
  ) {
    // istanbul ignore else
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
