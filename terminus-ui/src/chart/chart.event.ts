import { TsChartObject } from './options.interface';


/**
 * A class wrapper for the event emitted by a chart|series|point
 *
 * @param event - The event object
 * @param context - The 'this' context of {@link TsChartObject}
 */
export class TsChartEvent {
  originalEvent: Event;
  context: TsChartObject;

  constructor(
    event: Event,
    context: TsChartObject,
  ) {
    this.originalEvent = event;
    this.context = context;
  }
}
