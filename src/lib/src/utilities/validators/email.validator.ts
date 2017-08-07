import { FormControl } from '@angular/forms';

import { emailRegex } from './../regex/email.regex';

export function validateEmail(c: FormControl): any {
  return emailRegex.test(c.value) ? null : {
    validateEmail: {
      valid: false
    }
  };
}
