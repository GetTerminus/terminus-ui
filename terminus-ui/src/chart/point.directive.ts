import {
  Directive,
  Output,
  EventEmitter,
} from '@angular/core';

import { TsChartEvent } from './chart.event';


// NOTE: We are attaching only functionality (no DOM) but we still want the consumer to be able to
// add a component selector to the DOM rather than adding another dummy DOM element to attach event
// listeners to.
// tslint:disable: directive-selector
@Directive({
  selector: 'ts-point',
})
export class TsChartPointDirective {
  /**
   * Fires when a point is clicked.
   */
  @Output()
  public click: EventEmitter<TsChartEvent> = new EventEmitter();

  /**
   * Fires when the mouse leaves the area close to the point.
   */
  @Output()
  public mouseOut: EventEmitter<TsChartEvent> = new EventEmitter();

  /**
   * Fires when the mouse enters the area close to the point.
   */
  @Output()
  public mouseOver: EventEmitter<TsChartEvent> = new EventEmitter();

  /**
   * Fires when the point is removed using the .remove() method.
   */
  @Output()
  public remove: EventEmitter<TsChartEvent> = new EventEmitter();

  /**
   * Fires when the point is selected either programmatically or following a click on the point.
   */
  @Output()
  public select: EventEmitter<TsChartEvent> = new EventEmitter();

  /**
   * Fires when the point is unselected either programmatically or following a click on the point.
   */
  @Output()
  public unselect: EventEmitter<TsChartEvent> = new EventEmitter();

  /**
   * Fires when the point is updated programmatically through the .update() method.
   */
  @Output()
  public update: EventEmitter<TsChartEvent> = new EventEmitter();
}
