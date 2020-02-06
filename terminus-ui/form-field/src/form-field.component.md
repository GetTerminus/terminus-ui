<h1>Form Field</h1>


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Basic usage](#basic-usage)
  - [control](#control)
  - [floatLabel](#floatlabel)
  - [hideRequiredMarker](#hiderequiredmarker)
  - [hint](#hint)
  - [noValidationOrHint](#novalidationorhint)
  - [validateOnChange](#validateonchange)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Basic usage

`TsFormFieldComponent` is a component used to wrap several other components that could be used within a form and apply common styles. 

```html
<ts-form-field
    [control]="myControlInstance"
    floatLabel="always"
    [hideRequiredMarker]="true"
    hint="My hint"
    id="my-id"
    theme="primary"
    [validateOnChange]="true"
 ></ts-form-field>
```

### control

Users can pass in form control to form field component

```html
<ts-form-field
    [control]="myFormControl"
></ts-form-field>
```

### floatLabel

It defines whether the label should always float or float as the user types. The value can only be set to either `always` or `auto`.

```html
<ts-form-field
    [floatLabel]="always"
></ts-form-field>
```

### hideRequiredMarker

It defines if a required marker should be hidden.

```html
<ts-form-field
    [hideRequiredMarker]="true"
></ts-form-field>
```

### hint

It defines a hint for the input.

```html
<ts-form-field
    [hint]="Please input a number"
></ts-form-field>
```

### noValidationOrHint

A flag to define whether this form needs validation or hint. If it needs validation or hint, a padding bottom is added for validation message or hint, otherwise, no padding at the bottom.

```html
<ts-form-field
    [noValidationOrHint]="true"
></ts-form-field>
```

### validateOnChange

It defines if validation messages should be shown immediately or on blur

```html
<ts-form-field
    [validateOnChange]="true"
></ts-form-field>
```
