import {
  Directive,
  ContentChild,
  EventEmitter,
  Output,
} from '@angular/core';

import { TsChartEvent } from './chart.event';
import { TsChartPointDirective } from './point.directive';


// NOTE: We are attaching only functionality (no DOM) but we still want the consumer to be able to
// add a component selector to the DOM rather than adding another dummy DOM element to attach event
// listeners to.
// tslint:disable: directive-selector
@Directive({
  selector: 'ts-series',
})
export class TsChartSeriesDirective {
  /**
   * Create a reference to the child {@link TsChartPointDirective} if one exists.
   */
  @ContentChild(TsChartPointDirective)
  point!: TsChartPointDirective;

  /**
   * Fires after the series has finished its initial animation, or in case animation is disabled,
   * immediately as the series is displayed.
   */
  @Output()
  public afterAnimate: EventEmitter<TsChartEvent> = new EventEmitter();

  /**
   * Fires when the checkbox next to the series' name in the legend is clicked.
   */
  @Output()
  public checkboxClick: EventEmitter<TsChartEvent> = new EventEmitter();

  /**
   * Fires when the series is clicked.
   */
  @Output()
  public click: EventEmitter<TsChartEvent> = new EventEmitter();

  /**
   * Fires when the series is hidden after chart generation time, either by clicking the legend item
   * or by calling .hide().
   */
  @Output()
  public hide: EventEmitter<TsChartEvent> = new EventEmitter();

  /**
   * Fires when the legend item belonging to the series is clicked.
   */
  @Output()
  public legendItemClick: EventEmitter<TsChartEvent> = new EventEmitter();

  /**
   * Fires when the mouse leaves the graph.
   */
  @Output()
  public mouseOut: EventEmitter<TsChartEvent> = new EventEmitter();

  /**
   * Fires when the mouse enters the graph.
   */
  @Output()
  public mouseOver: EventEmitter<TsChartEvent> = new EventEmitter();

  /**
   * Fires when the series is shown after chart generation time, either by clicking the legend item or by calling .show().
   */
  @Output()
  public show: EventEmitter<TsChartEvent> = new EventEmitter();
}
