<h1>Popover</h1>

Popover component is designed to pop up content based on user trigger.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Basic info](#basic-info)
- [Basic usage](#basic-usage)
  - [Position](#position)
  - [Hide on blur](#hide-on-blur)
  - [Open on load](#open-on-load)
- [Events](#events)
- [popper.js documentations](#popperjs-documentations)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Basic info

We wrap our popover trigger/component with a third party library, named [popper.js](#popperjs-documentations).
`popper.js` must be installed and imported before using this component.

`popper.js` can be installed via `yarn add popper.js`

Refer to [popper.js docs](#popperjs-documentations) for detailed documentation on `popper.js`. 

## Basic usage

Define a popover trigger and popover content:

```html
<button tsPopoverTrigger="popper1">Click me!</button>

<ts-popover #popper1>
  <h1>My Title</h1>
  <p>Any HTML can be placed here!</p>
</ts-popover>
```

### Position

Defines where the popover is positioned, relative to current element:

```html
<button 
  tsPopoverTrigger="popper1"
  [position]="top"
>Click me!</button>

<ts-popover #popper1>
  My popover
</ts-popover>
```

The default is `bottom`. For all available positions, please see the [popper.js docs](#popperjs-documentations).

### Hide on blur

By default, the popover will be closed by clicking outside the popover. If this functionality is not desired, it can be
disabled:

```html
<button 
  tsPopoverTrigger="popper1"
  [hideOnBlur]="false"
>Click me!</button>

<ts-popover #popper1>
  My popover
</ts-popover>
```

It defaults to `true`.

### Open on load

The popover can be defined to open on load:

```html
<button 
  tsPopoverTrigger="popper1"
  [defaultOpened]="true"
>Click me!</button>

<ts-popover #popper1>
  My popover
</ts-popover>
```

It defaults to `false`.

## Events

| Event             | Description                 | Payload         |
|:------------------|:----------------------------|:----------------|
| `popoverOnShown`  | Fired when popover shows up | popoverInstance |
| `popoverOnHidden` | Fired when popover hides    | popoverInstance |

## popper.js documentations

* [popper.js](https://github.com/popperjs/popper.js)
* [popper.js docs](https://github.com/popperjs/popper.js/blob/master/docs/_includes/popper-documentation.md)
* [popper.js supported placements](https://github.com/FezVrasta/popper.js/blob/master/packages/popper/src/methods/placements.js)
