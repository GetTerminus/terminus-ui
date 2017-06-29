import { ControlValueAccessor } from '@angular/forms';

/**
 * Implements the Control Value Accessor pattern from Angular.
 * Reference: http://blog.rangle.io/angular-2-ngmodel-and-custom-form-components/
 */
export abstract class ValueAccessorBase<T> implements ControlValueAccessor {
  /**
   * Private value store
   */
  private innerValue: T;

  /**
   * Store the changed items
   */
  private changed = new Array<(value: T) => void>();

  /**
   * Store the touched items
   */
  private touched = new Array<() => void>();


  /**
   * Return the inner value
   *
   * @returns innerValue
   */
  get value(): T {
    return this.innerValue;
  }


  /**
   * A setter for the value
   *
   * @param value The value to set
   */
  set value(value: T) {
    if (this.innerValue !== value) {
      this.innerValue = value;
      this.changed.forEach(f => f(value));
    }
  }


  /**
   * Return the inner value
   *
   * @param value The value to write
   */
  writeValue(value: T): void {
    this.innerValue = value;
  }


  /**
   * Update the changed array
   *
   * @param fn The validation method
   */
  registerOnChange(fn: (value: T) => void): void {
    this.changed.push(fn);
  }


  /**
   * Update the touched array
   *
   * @param fn The validation method
   */
  registerOnTouched(fn: () => void): void {
    this.touched.push(fn);
  }


  /**
   * Run through each item of the touched array
   */
  touch(): void {
    this.touched.forEach(f => f());
  }
}
