import {
  Directive,
  ElementRef,
  Input,
  isDevMode,
} from '@angular/core';

import { TS_SPACING } from './spacing.constant';
import { TsVerticalSpacingTypes } from './../utilities/types';


/**
 * This is the vertical spacing UI directive. Accepts {@link TsVerticalSpacingTypes}
 *
 * @example
 * <div tsVerticalSpacing>
 *   My content!
 * </div>
 *
 * <div tsVerticalSpacing="large--1">
 *   My content!
 * </div>
 *
 * <div tsVerticalSpacing="none">
 *   My content!
 * </div>
 *
 * <example-url>https://goo.gl/ieUPaG</example-url>
 */
@Directive({
  selector: '[tsVerticalSpacing]',
})
export class TsVerticalSpacingDirective {
  /**
   * Set a spacing class based on the passed in value
   *
   * @param value - The spacing value passed in.
   */
  @Input()
  public set tsVerticalSpacing(value: TsVerticalSpacingTypes) {
    // Set a default value if nothing was passed in
    if (!value) {
      value = 'default--0';
    }

    // Split the string to get the type and size
    const [type, size] = value.split('--');
    const valueIsNone = value === 'none';

    // Verify type and size are valid options
    const typeIsInvalid = !!(!TS_SPACING[type] || TS_SPACING[type].length < 0);
    const sizeIsInvalid =
      !!(typeIsInvalid || !TS_SPACING[type][size] || TS_SPACING[type][size].length < 0);

    // Only throw an error if type or size is invalid and the value is not 'none'
    if ((typeIsInvalid || sizeIsInvalid) && !valueIsNone && isDevMode()) {
      const errorMessage =
        `${value} is not a valid spacing definition for TsVerticalSpacingDirective.`;
      const errorHelp = `See all valid TsVerticalSpacingTypes: http://bnj.bz/3e1E2l0k0C11`;
      throw Error(`${errorMessage} ${errorHelp}`);
    }

    const margin = valueIsNone ? '0' : TS_SPACING[type][size];

    // Set the margin on the element
    this.elementRef.nativeElement.style.marginBottom = margin;
  }


  /**
   * Inject services
   */
  constructor(
    private elementRef: ElementRef,
  ) {}

}
