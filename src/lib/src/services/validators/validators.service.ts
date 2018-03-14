import { Injectable } from '@angular/core';

import { creditCardValidator } from './validators/creditCard/creditCard';
import { emailValidator } from './validators/email/email';
import { equalToControlValidator } from './validators/equalToControl/equalToControl';
import { greaterThanValidator } from './validators/greaterThan/greaterThan';
import { greaterThanOrEqualValidator } from './validators/greaterThanOrEqual/greaterThanOrEqual';
import { lessThanValidator } from './validators/lessThan/lessThan';
import { maxDateValidator } from './validators/maxDate/maxDate';
import { minDateValidator } from './validators/minDate/minDate';
import { passwordValidator } from './validators/password/password';
import { urlValidator } from './validators/url/url';


/**
 * Define a service that exposes custom form validators for use with reactive forms.
 */
@Injectable()
export class TsValidatorsService {
  creditCard = creditCardValidator;
  email = emailValidator;
  equalToControl = equalToControlValidator;
  greaterThan = greaterThanValidator;
  greaterThanOrEqual = greaterThanOrEqualValidator;
  lessThan = lessThanValidator;
  maxDate = maxDateValidator;
  minDate = minDateValidator;
  password = passwordValidator;
  url = urlValidator;
}
