import { Injectable } from '@angular/core';

import { creditCardValidator } from './validators/creditCard/creditCard';
import { emailValidator } from './validators/email/email';
import { equalToControlValidator } from './validators/equalToControl/equalToControl';
import { greaterThanValidator } from './validators/greaterThan/greaterThan';
import { inCollectionValidator } from './validators/inCollection/inCollection';
import { isInRangeValidator } from './validators/isInRange/isInRange';
import { lessThanValidator } from './validators/lessThan/lessThan';
import { lowercaseValidator } from './validators/lowercase/lowercase';
import { maxDateValidator } from './validators/maxDate/maxDate';
import { minDateValidator } from './validators/minDate/minDate';
import { numbersValidator } from './validators/numbers/numbers';
import { passwordValidator } from './validators/password/password';
import { uppercaseValidator } from './validators/uppercase/uppercase';
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
  inCollection = inCollectionValidator;
  isInRange = isInRangeValidator;
  lessThan = lessThanValidator;
  lowercase = lowercaseValidator;
  maxDate = maxDateValidator;
  minDate = minDateValidator;
  numbers = numbersValidator;
  password = passwordValidator;
  uppercase = uppercaseValidator;
  url = urlValidator;
}
