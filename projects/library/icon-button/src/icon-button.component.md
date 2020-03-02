<h1>Icon Button</h1>

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Basic usage](#basic-usage)
- [Theme (color)](#theme-color)
- [Accessibility](#accessibility)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Basic usage

Pass a valid [Material icon][material-icons] name as the content of the button:

```html
<ts-icon-button (clicked)="myMethod()">delete_forever</ts-icon-button>
```


## Theme (color)

Use the `theme` parameter to change the color.

```html
<!-- Will be colored with the 'primary' color -->
<ts-icon-button theme="primary">forum</ts-icon-button>

<!-- Will be colored with the 'accent' color -->
<ts-icon-button theme="accent">forum</ts-icon-button>

<!-- Will be colored with the 'warn' color -->
<ts-icon-button theme="warn">forum</ts-icon-button>
```
> By default the icon will use `color(pure, dark)`


## Accessibility

For accessibility purposes we should set the `actionName` and `buttonType`.

1. `actionName` can be one of the `TsButtonActionTypes` and will be used for the `aria-label`.
1. `buttonType` can be one of the `TsButtonFunctionTypes` and will be used for the `type` attribute.

```html
<ts-icon-button
  actionName="Menu"
  buttonType="button"
  (clicked)="myMethod()"
>bookmark</ts-icon-button>
```


<!-- Links -->
[material-icons]: https://material.io/icons/
