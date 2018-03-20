/**
 * Define the structure of the date range object used by {@link TsDateRangeComponent}
 */
export interface TsDateRange {
  /**
   * The start date of the range
   */
  start: Date | null;

  /**
   * The end date of the range
   */
  end: Date | null;
}
