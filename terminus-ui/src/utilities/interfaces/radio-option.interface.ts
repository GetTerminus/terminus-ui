/**
 * Define the allowed keys and types for an item passed to the {@link TsRadioComponent}
 */
export interface TsRadioOption {
  /**
   * The value to use as the model value
   */
  value: string;

  /**
   * Define the value to display in the UI
   */
  displayValue: string;

  /**
   * Define if the item is selected by default
   */
  checked?: boolean;

  /**
   * Define if the item is disabled
   */
  disabled?: boolean;

  /**
   * Define if the item is required
   */
  required?: boolean;
}
