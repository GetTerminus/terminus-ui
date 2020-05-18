import { Directive } from '@angular/core';


/**
 * A directive used to pass a custom validation messages component through to {@link TsFormFieldComponent}
 */
@Directive({ selector: '[tsCustomValidationMessage]' })
export class TsCustomValidationDirective {}
