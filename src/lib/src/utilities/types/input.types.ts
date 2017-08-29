/**
 * Define the allowed {@link TsInputComponent} input types
 */
export type TsInputTypes =
  'text'
  | 'password'
  | 'email'
  | 'hidden'
  | 'number'
  | 'search'
  | 'tel'
  | 'url'
;


/**
 * Define the allowed autocomplete variations for {@link TsInputComponent}
 * NOTE: This is not all valid types; only the ones this library supports.
 */
export type TsInputAutocompleteTypes =
  'off'
  | 'on'
  | 'name'
  | 'email'
  | 'username'
  | 'new-password'
  | 'current-password'
  | 'tel'
;
