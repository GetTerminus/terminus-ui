import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewEncapsulation,
  OnInit,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';

import { TsStyleThemeTypes } from './../utilities/types';
import { TsReactiveFormBaseComponent } from './../utilities/reactive-form-base.component';
import { TsRadioOption } from './../utilities/interfaces/radio-option.interface';


/**
 * Expose the MatRadioChange event as TsRadioChange
 */
export class TsRadioChange extends MatRadioChange {}


/**
 * Custom control value accessor for our component
 * This allows our custom components to access the underlying form validation via the base class
 */
/* tslint:disable:no-use-before-declare */
export const CUSTOM_RADIO_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TsRadioGroupComponent),
  multi: true,
};
/* tslint-enable: no-use-before-declare */


/**
 * This is the radio UI Component
 *
 * #### QA CSS CLASSES
 * - `qa-radio-group`: The primary container
 * - `qa-radio-control`: An individual radio control
 * - `qa-radio-validation-messages`: The validation messages container
 *
 * @example
 * <ts-radio-group
 *              options="myItemsArray | $async"
 *              theme="primary"
 *              [formControl]="myForm.get('myRadioGroup')"
 *              (change)="doSomething($event)"
 * ></ts-radio-group>
 *
 * <example-url>https://goo.gl/ieUPaG</example-url>
 */
@Component({
  selector: 'ts-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss'],
  host: {
    class: 'ts-radio-group',
  },
  exportAs: 'tsRadioGroup',
  providers: [CUSTOM_RADIO_CONTROL_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TsRadioGroupComponent extends TsReactiveFormBaseComponent implements OnInit {
  /**
   * Accept an array of radio options in the {@link TsRadioOption} format
   */
  @Input()
  public options: TsRadioOption[];

  /**
   * Define the theme. {@link TsStyleThemeTypes}
   */
  @Input()
  public theme: TsStyleThemeTypes = 'primary';

  /**
   * Emit event when a selection occurs
   */
  @Output()
  public change: EventEmitter<TsRadioChange> = new EventEmitter();


  constructor(
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    super();
  }


  /**
   * Seed the initial value with the first checked option found
   */
  public ngOnInit(): void {
    const initialSelection = this.defaultSelection(this.options);

    if (initialSelection) {
      this.value = initialSelection;

      // istanbul ignore else
      if (this.formControl) {
        this.formControl.setValue(initialSelection);
      }

      // Tell Angular that we have updated the component internally
      this.changeDetectorRef.markForCheck();
    }
  }


  /**
   * Return an option that should be checked by default
   *
   * If multiple items are marked as 'checked' by default, the first on found will win.
   *
   * @param options - The array of options
   * @return The selected value
   */
  private defaultSelection(options: TsRadioOption[]): string | null {
    const found = options.filter((v: TsRadioOption) => {
      return v.checked;
    });

    return (found && found[0] && found[0].value) ? found[0].value : null;
  }
}
