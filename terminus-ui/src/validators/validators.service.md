<h1>Validators</h1>


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Basic usage](#basic-usage)
- [Available validators](#available-validators)
- [Mocking](#mocking)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->



## Basic usage

```typescript
import {
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { TsValidatorsService } from '@terminus/ui';


@Component({
  ...
})
export class MyComponent {
  // Create a form
  myForm: FormGroup = this.formBuilder.group({
    email: [
      null,
      [
        // Basic validator
        this.validatorsService.email(),
      ],
    ],
    greaterThan: [
      null,
      [
        // Validator with a required argument
        this.validatorsService.greaterThan(10),
      ],
    ],
  });

  constructor(
    private formBuilder: FormBuilder,
    private validatorsService: TsValidatorsService,
  ) {}

}
```


## Available validators

| Validator            | Purpose                                                       |
|----------------------|---------------------------------------------------------------|
| `creditCard`         | A credit card number must be valid                            |
| `email`              | An email address must be valid                                |
| `equalToControl`     | A control's value must be equal to another control's value    |
| `greaterThan`        | A number must be greater than another value                   |
| `inCollection`       | A control's value must be within a collection of values       |
| `isInRange`          | A control's value must between two numbers                    |
| `lessThan`           | A number must be less than another value                      |
| `lowercase`          | A value must contain a minimum amount of lowercase characters |
| `maxDate`            | A date must be before a maximum date                          |
| `minDate`            | A date must be after a minimum date                           |
| `numbers`            | A minimum amount of numbers must be found                     |
| `password`           | A password must meet certain requirements                     |
| `uppercase`          | A value must contain a minimum amount of uppercase characters |
| `url`                | A URL must be valid                                           |


## Mocking

A mocked version of the service is available for testing as `TsValidatorsServiceMock`.

The mocks consist of Jest mock functions. Based on the class value `isValid` the validator mock will
return an error message or `null`.
