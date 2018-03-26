<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Basic usage](#basic-usage)
  - [Hint](#hint)
  - [Prefix icon](#prefix-icon)
  - [Required](#required)
    - [Required asterisk `*`](#required-asterisk-)
  - [Clearable](#clearable)
  - [Focused](#focused)
  - [HTML5 input helpers](#html5-input-helpers)
  - [Validation timing](#validation-timing)
  - [Component reference](#component-reference)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Basic usage

Attach an `NgModel` or `FormControl` to the input:

```html
<ts-input [formControl]="myForm.get('myControl')"></ts-input>
<!-- OR -->
<ts-input [(ngModel)]="myModel"></ts-input>
```

We will _almost always_ being using a `FormControl` with a reactive form.


### Hint

A 'hint' can be displayed below the input on the right-hand side:

```html
<ts-input
  [formControl]="myForm.get('myControl')"
  hint="Must contain only numbers and letters."
></ts-input>
```


### Prefix icon

To include an icon as a prefix to the input, pass a valid icon name to `prefixIcon`:

```html
<ts-input
  [formControl]="myForm.get('myControl')"
  prefixIcon="home"
></ts-input>
```

> See all valid icon possibilities: https://material.io/icons



### Required

To set the input as required, set the `isRequired` input to `true`:

```html
<ts-input
  [formControl]="myForm.get('myControl')"
  isRequired="true"
></ts-input>
```

#### Required asterisk `*`

If the input should be required, but the required asterisk `*` is not needed, disable it with the
`hideRequiredMarker` input:

```html
<ts-input
  [formControl]="myForm.get('myControl')"
  isRequired="true"
  hideRequiredMarker="true"
></ts-input>
```


### Clearable

If the input should be easily reset, include the `isClearable` flag to enable a 'clear input'
button: (button will appear as small `x` icon at the far right of the input)

```html
<ts-input
  [formControl]="myForm.get('myControl')"
  isClearable="true"
></ts-input>
```

When the input is cleared, the `cleared` event emitter will be fired with the value `true`.


### Focused

Auto-focus the input when the view loads:

```html
<ts-input
  [formControl]="myForm.get('myControl')"
  isFocused="true"
></ts-input>
```

> NOTE: If multiple inputs within the same view set `isFocused` to true, the _**last one rendered
> will receive the final focus**_.


### HTML5 input helpers

`autocomplete`, `autocorrect`, `autocapitalize`, `spellcheck`

```html
<ts-input
  [formControl]="myForm.get('myControl')"
  autocapitalize="true"
  autocorrect="true"
  autocomplete="email"
  spellcheck="true"
></ts-input>
```

> For all allowed `autocomplete` types, see [`TsInputAutocompleteTypes`][autocomplete].


### Validation timing

Validate on change rather than blur:

```html
<ts-input
  [formControl]="myForm.get('myControl')"
  validateOnChange="true"
></ts-input>
```


### Component reference

To get a reference to the component class, assign the exported name to a local variable:

```html
<ts-input
  [formControl]="myForm.get('myControl')"
  #myVar="tsInput"
></ts-input>
```

```typescript
@ViewChild(TsInputComponent)
myVar: TsInputComponent;

console.log('Component Class: ', this.myVar);
```


<!-- LINKS -->

[autocomplete]: input.component.ts#L48-L57
