import { Injectable } from '@angular/core';


/**
 * Define a service that exposes the defined spacing values
 */
@Injectable()
export class TsSpacingService {

  spacings = {
    small: ['12px', '8px', '4px'],
    /*
     *small: {
     *  'one': '12px',
     *  'two': '8px',
     *  'three': '4px',
     *},
     */
    default: ['16px'],
    /*
     *default: {
     *  'one': '16px',
     *},
     */
    large: ['24px', '32px', '40px', '48px'],
    /*
     *large: {
     *  'x1': '24px',
     *  'x2': '32px',
     *  'x3': '40px',
     *  'x4': '48px',
     *  'x5': '56px',
     *  'x6': '72px',
     *  'x7': '96px',
     *},
     */
  }

  getSpacing(size = 'default', step = 1): string {
    return this.spacings[size][step - 1];
  }

}

