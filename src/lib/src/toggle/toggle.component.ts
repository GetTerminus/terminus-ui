import {
  Component,
  Input,
  Output,
  EventEmitter,
  Optional,
  Inject,
  ViewChild,
} from '@angular/core';
import {
  NgModel,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  NG_ASYNC_VALIDATORS,
  FormControl
} from '@angular/forms';
import { MdSlideToggleChange } from '@angular/material';

import { ElementBase } from './../utilities/element-base';

/**
 * The is a toggle component
 *
 * @example
 * <ts-toggle
 *              [(ngModel)]="myModel"
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
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TsToggleComponent,
      multi: true,
    },
  ],
})
export class TsToggleComponent extends ElementBase<string> {
  /**
   * Provide access to the model
   */
  @ViewChild(NgModel) model: NgModel;

  /**
   * Define the aria label
   */
  @Input() ariaLabel: string;

  /**
   * Define if the toggle should be disabled
   */
  @Input() isDisabled: boolean = false;

  /**
   * Define if the toggle is required
   */
  @Input() isRequired: boolean = true;

  /**
   * Define the position of the label
   */
  @Input() labelPosition: 'before' | 'after' = 'after';

  /**
   * Define the input name for the toggle
   */
  @Input() name: string = 'toggle';

  /**
   * Define the theme
   */
  @Input() theme: 'primary' | 'accent' | 'warn' = 'primary';

  /**
   * Emit an event each time the toggle value changes
   */
  @Output() change = new EventEmitter<MdSlideToggleChange>();


  /**
   * @hidden
   */
  constructor(
    @Optional() @Inject(NG_VALIDATORS) validators: Array<any>,
    @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<any>,
  ) {
    super(validators, asyncValidators);
  }


}
