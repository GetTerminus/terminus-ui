import { Injectable } from '@angular/core';

import { creditCardValidator } from './validators/creditCard/creditCard';
import { emailValidator } from './validators/email/email';
import { equalToControlValidator } from './validators/equalToControl/equalToControl';
import { greaterThanOrEqualValidator } from './validators/greaterThanOrEqual/greaterThanOrEqual';
import { greaterThanValidator } from './validators/greaterThan/greaterThan';
import { isInRangeValidator } from './validators/isInRange/isInRange';
import { lessThanOrEqualValidator } from './validators/lessThanOrEqual/lessThanOrEqual';
import { lessThanValidator } from './validators/lessThan/lessThan';
import { lowercaseValidator } from './validators/lowercase/lowercase';
import { numbersValidator } from './validators/numbers/numbers';
import { maxDateValidator } from './validators/maxDate/maxDate';
import { minDateValidator } from './validators/minDate/minDate';
import { passwordValidator } from './validators/password/password';
import { urlValidator } from './validators/url/url';
import { uppercaseValidator } from './validators/uppercase/uppercase';


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
  isInRange = isInRangeValidator;
  lessThan = lessThanValidator;
  lessThanOrEqual = lessThanOrEqualValidator;
  lowercase = lowercaseValidator;
  maxDate = maxDateValidator;
  minDate = minDateValidator;
  numbers = numbersValidator;
  password = passwordValidator;
  uppercase = uppercaseValidator;
  url = urlValidator;
}
