import {
  FormControl,
  NgControl,
} from '@angular/forms';
import { Observable } from 'rxjs';


/**
 * An interface to enforce the needs of a control when working inside of a {@link TsFormFieldComponent}
 */
export abstract class TsFormFieldControl<T> {
  /**
   * The stored value of the control
   */
  public value: T | null | undefined;

  /**
   * Stream that emits whenever the state of the control changes such that the
   * parent {@link TsFormFieldComponent} needs to run change detection.
   */
  public readonly stateChanges!: Observable<void>;

  /**
   * Stream that emits whenever the label of the control changes such that the
   * parent {@link TsFormFieldComponent} needs to update its outline gap.
   */
  public readonly labelChanges!: Observable<void>;

  /**
   * The element ID for this control
   */
  public readonly id!: string;

  /**
   * The NgControl for this control
   */
  public readonly ngControl!: NgControl | null;

  /**
   * Whether the control is focused
   */
  public readonly focused!: boolean;

  /**
   * Whether the control is empty
   */
  public readonly empty!: boolean;

  /**
   * Whether the `TsFormFieldComponent` label should try to float
   */
  public readonly shouldLabelFloat!: boolean;

  /**
   * Whether the control is required
   */
  public readonly isRequired!: boolean;

  /**
   * Whether the control is disabled
   */
  public readonly isDisabled!: boolean;

  /**
   * Whether the input is currently in an autofilled state. If property is not present on the control it is assumed to be false.
   */
  public readonly autofilled?: boolean;

  /**
   * An optional form control
   */
  public readonly formControl?: FormControl;

  /**
   * Handles a click on the control's container
   */
  public abstract onContainerClick(event: MouseEvent): void;
}
