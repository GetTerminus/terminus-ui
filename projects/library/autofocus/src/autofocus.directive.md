<h1>Autofocus</h1>

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Basic usage](#basic-usage)
- [Binding](#binding)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Basic usage

The `tsAutofocus` directive can be used on any element that has a `.focus()` method. This includes
inputs, select menus, textarea, buttons, links, iframes and any element with a defined `tabindex`
above -1.

Add the directive to a focusable element:

```html
<input type="text" autofocus />
```

## Binding

Passing in any value _except_ `false`, `'false'`, `null`, or `undefined` will enable the directive.

```html
<!-- enabled -->
<input type="text" [autofocus]="myProperty" />
<input type="text" [autofocus]="true" />
<input type="text" autofocus="" />

<!-- disabled -->
<input type="text" [autofocus]="false" />
<input type="text" [autofocus]="null" />
```
