<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Usage](#usage)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Usage

Because an existing form control must be passed in to the validator, the form must be initialized
_before_ setting the `equalToControl` validator:

```typescript
export class MyClass {
  // Define the form
  myForm = this.formBuilder.group({
    compare1: [
      null,
    ],
    compare2: [
      null,
    ],
  });

  // Set the validators after the form has been initialized
  ngOnInit() {
    this.myForm.get('compare1').setValidators([
      this.validatorsService.equalToControl(this.myForm.get('compare2')),
    ]);
    this.myForm.get('compare2').setValidators([
      this.validatorsService.equalToControl(this.myForm.get('compare1')),
    ]);
  }
}
```

```html
<ts-input
  [formControl]="myForm.get('compare1')"
  label="Input 1"
></ts-input>
<ts-input
  [formControl]="myForm.get('compare2')"
  label="Input 2"
></ts-input>
```
