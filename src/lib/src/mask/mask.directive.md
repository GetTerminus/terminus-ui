<h1>Mask</h1>


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Basic usage](#basic-usage)
- [Supported input types](#supported-input-types)
- [Disable decimal support](#disable-decimal-support)
- [Disable sanitation](#disable-sanitation)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Basic usage

Attach the directive to an input and pass in a mask type:

```html
<input [tsMask]="currency" />
<!--
  If the user types: `12345.55`
  The input display will be: `$12,345.55`
  The model will be `12345.55`
-->
```

Available mask types:

| Name         | Example format            |
|--------------|---------------------------|
| `phone`      | `(900) 000-0000`          |
| `currency`   | `$0,000[.00]`             |
| `number`     | `0,000[.00]`              |
| `percentage` | `0,000[.00]%`             |
| `postal`     | `00000`&#124;`00000-0000` |


## Supported input types

1. `text`
1. `tel`
1. `url`
1. `password`
1. `search`


## Disable decimal support

> This only effects the following masks: `currency|number|percentage`. By default, these masks
> support decimals.

Set the `allowDecimal` flag to false:

```html
<input [tsMask]="number" [allowDecimal]="false" />
```

> NOTE: You must use brackets `[]` for the `allowDecimal` flag.


## Disable sanitation

By default, the mask is removed from the string before it is saved to the model. To save the
formatted value, set the `sanitizeValue` flag to false:

```html
<input [tsMask]="number" sanitizeValue="false" />
```
