import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { MdSlideToggleChange } from '@angular/material';

import { TsReactiveFormBaseComponent } from './../utilities/reactive-form-base.component';
import { TsStyleThemeTypes } from './../types/style-theme.types';

/**
 * Custom control value accessor for our component
 */
// FIXME: Is there any way to abstract the items needed to make an input work with a FormGroup into
// a base class that others can extend? (Not sure how to pass in a named component like below)
export const CUSTOM_TOGGLE_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TsToggleComponent),
  multi: true
};


/**
 * The is a toggle component
 *
 * @example
 * <ts-toggle
 *              formControlName="thingIsDisabled"
 *              [formControl]="yourHelperToGetFormControl('thingIsDisabled')"
 *              arialLabel="Disable my thing"
 *              isDisabled="true"
 *              isRequired="true"
 *              labelPosition="before"
 *              name="My toggle"
 *              theme="accent"
 *              (change)="myMethod($event)"
 * ></ts-toggle>
 */
@Component({
  selector: 'ts-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  providers: [CUSTOM_TOGGLE_CONTROL_VALUE_ACCESSOR],
})
export class TsToggleComponent extends TsReactiveFormBaseComponent {
  /**
   * Define the aria label
   */
  @Input()
  public ariaLabel: string;

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
  public change: EventEmitter<MdSlideToggleChange> = new EventEmitter();
}
