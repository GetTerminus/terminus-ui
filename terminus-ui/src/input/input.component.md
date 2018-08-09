<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Basic usage](#basic-usage)
  - [Hint](#hint)
  - [Prefix icon](#prefix-icon)
  - [Disabled](#disabled)
  - [Required](#required)
    - [Required asterisk `*`](#required-asterisk-)
  - [Clearable](#clearable)
  - [Focused](#focused)
  - [Input Type](#input-type)
  - [Input Attributes](#input-attributes)
  - [Validation timing](#validation-timing)
  - [Component reference](#component-reference)
- [Event Emitters](#event-emitters)
- [Masks](#masks)
  - [Available Masks](#available-masks)
  - [Sanitize the model value](#sanitize-the-model-value)
  - [Allow decimals in number-based masks](#allow-decimals-in-number-based-masks)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Basic usage

Attach an `NgModel` or `FormControl` to the input:

```html
<ts-input [formControl]="myForm.get('myControl')"></ts-input>
<!-- OR -->
<ts-input [(ngModel)]="myModel"></ts-input>
```

We should _almost always_ being using a `FormControl`.

> Note: If you don't need a full form group you can provide a stand-alone control: `myControl = new FormControl();`


### Hint

A 'hint' can be displayed below the input on the right-hand side. This should be used for helpful user information such as input
requirements.

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


### Disabled

Inputs can be disabled by setting the component flag OR by setting the associated `FormControl` to `disabled`.

The `isDisabled` flag works with both `ngModel` and `FormControl` inputs:

```html
<ts-input isDisabled="true"></ts-input>
```

When using Reactive Forms, controls should be disabled via the control:

```typescript
myControl: FormControl = new FormControl({value: null, disabled: true});
```


### Required

For input's not using a `FormControl`, set the `isRequired` input to `true`:

```html
<ts-input
  [formControl]="myForm.get('myControl')"
  isRequired="true"
></ts-input>
```

When using a `FormControl`, set the required validator on the control:

```typescript
myControl = new FormControl(null, Validators.required);
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

> NOTE: We should not hide this visual indicator without a very good reason!


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

This can also be used to dynamically focus an existing input:

```html
<ts-input
  [formControl]="myForm.get('myControl')"
  [isFocused]="myFocusedFlag"
></ts-input>
```

```typescript
myFocusedFlag = false;

toggleInputFocus() {
  this.myFocusedFlag = !this.myFocusedFlag;
}
```


### Input Type

The input type can be defined with the type input:

```html
<ts-input type="email"></ts-input>
```

> For all allowed types, see [`TsInputTypes`][input-types].


### Input Attributes

`autocapitalize`, `autocomplete`, `spellcheck`, `readonly`

```html
<ts-input
  autocapitalize="true"
  autocomplete="email"
  spellcheck="true"
  readOnly="false"
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


## Event Emitters

Supported event emitters:

```html
<ts-input
  (blur)="inputLostFocus($event)"
  (cleared)="inputWasBlurred($event)"
  (focus)="inputGainedFocus($event)"
></ts-input>
```


## Masks

Masks enable the input to enforce specific formatting for values; such as postal codes: `12345-1234`.


### Available Masks

| Mask         | Input value  | Masked Value     |
|--------------|--------------|------------------|
| `currency`   | `12.34`      | `$12.34`         |
| `date`       | `12/12/1982` | `12/12/1982`     |
| `number`     | `1234.56`    | `1,234.56`       |
| `percentage` | `12.4`       | `12.4%`          |
| `phone`      | `1231231234` | `(123) 123-1234` |
| `postal`     | `123456789`  | `12345-6789`     |


### Sanitize the model value

Most often you will not want the mask characters to be saved as part of the actual value. By default this component will sanitize the value
before saving it to the model. This can be disabled if needed:

```html
<ts-input mask="phone" maskSanitizeValue="false"></ts-input>
```

This setup will format the value displayed in the UI: `(123) 456-7890`)while saving the pure value to the model: `1234567890`.


### Allow decimals in number-based masks

By default, number based masks (`number`, `percentage`) allow decimals. This can be disabled:

```html
<ts-input mask="number" maskAllowDecimal="false"></ts-input>
```

This means when the user types `12.34`, the input UI and model value will both be `1234`.




<!-- LINKS -->
[autocomplete]: https://github.com/getterminus/terminus-ui/blob/master/terminus-ui/src/input/input.component.ts#l64-73
[input-types]: https://github.com/getterminus/terminus-ui/blob/master/terminus-ui/src/input/input.component.ts#l48-57
