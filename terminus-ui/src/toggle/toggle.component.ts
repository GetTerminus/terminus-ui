import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

import { TsReactiveFormBaseComponent } from './../utilities/reactive-form-base.component';
import { TsStyleThemeTypes } from './../utilities/types/style-theme.types';


/**
 * Expose the MatSlideToggleChange event as TsSlideToggleChange. Used by {@link TsToggleComponent}
 */
export class TsSlideToggleChange extends MatSlideToggleChange {}


/**
 * Custom control value accessor for our component
 * This allows our custom components to access the underlying form validation via our base class
 */
/* tslint:disable:no-use-before-declare */
export const CUSTOM_TOGGLE_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TsToggleComponent),
  multi: true,
};
/* tslint-enable: no-use-before-declare */


/**
 * The is a toggle component
 *
 * #### QA CSS CLASSES
 * - `qa-toggle`: The toggle element
 *
 * @example
 * <ts-toggle
 *              [formControl]="yourHelperToGetFormControl('thingIsDisabled')"
 *              arialLabel="Disable my thing"
 *              isDisabled="true"
 *              isRequired="true"
 *              labelPosition="before"
 *              name="My toggle"
 *              theme="accent"
 *              (change)="myMethod($event)"
 * >My Toggle!</ts-toggle>
 *
 * <example-url>https://goo.gl/ieUPaG</example-url>
 */
@Component({
  selector: 'ts-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  host: {
    class: 'ts-toggle',
  },
  providers: [CUSTOM_TOGGLE_CONTROL_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TsToggleComponent extends TsReactiveFormBaseComponent {
  /**
   * Define the aria label
   */
  @Input()
  public ariaLabel: string | undefined;

  /**
   * Define if the toggle should be disabled
   */
  @Input()
  public isDisabled: boolean = false;

  /**
   * Define if the toggle is required
   */
  @Input()
  public isRequired: boolean = true;

  /**
   * Define the position of the label
   */
  @Input()
  public labelPosition: 'before' | 'after' = 'after';

  /**
   * Define the input name for the toggle
   */
  @Input()
  public name: string = 'toggle';

  /**
   * Define the theme
   */
  @Input()
  public theme: TsStyleThemeTypes = 'primary';

  /**
   * Emit an event each time the toggle value changes
   */
  @Output()
  public change: EventEmitter<TsSlideToggleChange> = new EventEmitter();
}
