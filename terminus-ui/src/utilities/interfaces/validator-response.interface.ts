/**
 * Define the structure of the validation response object
 */
export interface ValidationResponse {
  /**
   * The expected object structure
   */
  [key: string]: {
    /**
     * The expected validation result
     */
    valid: boolean;
  };
}
