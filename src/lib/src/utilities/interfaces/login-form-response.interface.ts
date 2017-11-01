/**
 * Define the structure of the login form responce
 */
export interface TsLoginFormResponse {
  /**
   * User's email
   */
  email: string,

  /**
   * User's password
   */
  password: string,

  /**
   * Flag determining if a cookie should be set
   */
  rememberMe: boolean,
}
