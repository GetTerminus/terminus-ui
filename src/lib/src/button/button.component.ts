import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
} from '@angular/core';

import { ButtonActionTypes } from './../types/button-action.types';
import { ButtonFunctionTypes } from './../types/button-function.types';
import { TsStyleThemeTypes } from './../types/style-theme.types';


/**
 * A presentational component to render a button
 *
 * @example
 * <ts-button
 *              actionName="Submit"
 *              theme="primary"
 *              buttonType="search"
 *              iconName="search"
 *              isDisabled="false"
 *              showProgress="true"
 *              (clickEvent)="myMethod($event)"
 * >Click Me!</ts-button>
 */
@Component({
  selector: 'ts-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class TsButtonComponent {
  /**
   * Define the action for the aria-label
   */
  @Input()
  public actionName: ButtonActionTypes = 'Button';

  /**
   * Define the button type
   */
  @Input()
  public buttonType: ButtonFunctionTypes = 'button';

  /**
   * Define a Material icon to include
   */
  @Input()
  public iconName: string;

  /**
   * Define if the button is disabled
   */
  @Input()
  public isDisabled: boolean = false;

  /**
   * Define if the progress indicator should show
   */
  @Input()
  public showProgress: boolean = false;

  /**
   * Define the theme
   */
  @Input()
  public theme: TsStyleThemeTypes = 'primary';

  /**
   * Pass the click event through to the parent
   */
  @Output()
  public clickEvent: EventEmitter<any> = new EventEmitter;
}
