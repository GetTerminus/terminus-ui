/**
 * Interface for a directive that holds sorting state consumed by `TsSortHeaderComponent`
 */
export interface TsSelectItem {
  /**
   * The text shown in the UI
   */
  name: string;

  /**
   * The object key to be used as the value for the select option
   */
  valueKey?: string;
}
