/* eslint-disable @typescript-eslint/no-magic-numbers */

/**
 * NOTE: The base value and the mathematics behind these spacings must exactly reflect the spacings
 * defined in lib/src/scss/helpers/_spacing.scss
 */
const base = 16;

/**
 * JavaScript representation of the values in _spacing.scss
 */
export const TS_SPACING: {[key: string]: string[]} = {
  none: [
    '0',
  ],
  small: [
    `${Math.floor(base - 4)}px`,
    `${Math.floor(base / 2)}px`,
    `${Math.floor(base / 4)}px`,
  ],
  default: [
    `${base}px`,
  ],
  large: [
    `${Math.floor(base / 2 *  3)}px`,
    `${Math.floor(base / 2 *  4)}px`,
    `${Math.floor(base / 2 *  5)}px`,
    `${Math.floor(base / 2 *  6)}px`,
    `${Math.floor(base / 2 *  7)}px`,
    `${Math.floor(base / 2 *  9)}px`,
    `${Math.floor(base / 2 * 12)}px`,
  ],
};
