import {
  Directive,
  ElementRef,
  Renderer,
  Input,
} from '@angular/core';

import { TsVerticalSpacingTypes } from './../utilities/types';


/**
 * An array of all accepted sizes.
 *
 * NOTE: This should reflect {@link TsVerticalSpacingTypes} exactly
 */
const ALLOWED_TYPES = [
  'small--2',
  'small--1',
  'small--0',
  'none',
  'large--0',
  'large--1',
  'large--2',
  'large--3',
  'large--4',
  'large--5',
  'large--6',
];


/**
 * This is the vertical spacing UI directive. Accepts {@link TsVerticalSpacingTypes}
 *
 * @example
 * <div
 *              tsVerticalSpacing
 * >
 *   My content!
 * </div>
 *
 * <div
 *              tsVerticalSpacing="large--1"
 * >
 *   My content!
 * </div>
 *
 * <div
 *              tsVerticalSpacing="none"
 * >
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
    if (value && ALLOWED_TYPES.indexOf(value) < 0) {
      const errorMessage =
        `${value} is not a valid spacing definition for TsVerticalSpacingDirective.`;
      const errorHelp = `See all TsVerticalSpacingTypes: http://bnj.bz/3e1E2l0k0C11`;
      throw new Error(`${errorMessage} ${errorHelp}`);
    }

    const isSpacingDefinition = value && value.length > 0;
    // Fall back to default class if no value is passed in
    const className = isSpacingDefinition ? `u-vertical-spacing__${value}` : `u-vertical-spacing`;

    this.renderer.setElementClass(this.elementRef.nativeElement, className, true)
  }


  /**
   * Inject services
   */
  constructor(
    private renderer: Renderer,
    private elementRef: ElementRef,
  ) {}

}
