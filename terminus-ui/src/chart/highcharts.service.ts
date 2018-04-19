import {
  Inject,
  Injectable,
  InjectionToken,
} from '@angular/core';


/**
 * Create an injection token that the consumer can override with their version of Highcharts
 */
export const HIGHCHARTS = new InjectionToken<any>('Highcharts');


/**
 * Expose Highcharts as a service
 */
@Injectable()
export class HighchartsService {

  constructor(
    @Inject(HIGHCHARTS) public highcharts: any,
  ) {}

}
