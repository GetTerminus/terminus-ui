import { Injectable } from '@angular/core';

import { maxDateValidator } from './validators/maxDate/maxDate';
import { minDateValidator } from './validators/minDate/minDate';
import { creditCardValidator } from './validators/creditCard/creditCard';
import { passwordValidator } from './validators/password/password';
import { emailValidator } from './validators/email/email';
import { greaterThanValidator } from './validators/greaterThan/greaterThan';
import { lessThanValidator } from './validators/lessThan/lessThan';


/**
 * Define a service that exposes custom form validators for use with reactive forms.
 *
 * See {@link TsLoginFormComponent} for an example
 */
@Injectable()
export class TsValidatorsService {
  minDate = minDateValidator;
  maxDate = maxDateValidator;
  creditCard = creditCardValidator;
  password = passwordValidator;
  email = emailValidator;
  greaterThan = greaterThanValidator;
  lessThan = lessThanValidator;
}
