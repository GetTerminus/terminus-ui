<h1>Popover</h1>

Popover component is designed to pop up content based on user trigger.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Basic info](#basic-info)
- [Basic Usage](#basic-usage)
  - [Position](#position)
  - [Hide on Blur](#hide-on-blur)
  - [Open on load](#open-on-load)
- [Events](#events)
- [popper.js documentations](#popperjs-documentations)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Basic info

We wrap our popover trigger/component with a third party library, named [popper.js](#popperjs-documentations).
`popper.js` is not a required import for ui library but if it's not imported and consumers try to use popover component, an error will show up.

`popper.js` can be installed via `yarn add popper.js`
Please refer to [popper.js docs](#popperjs-documentations) for detailed documentation on `popper.js`. 

## Basic Usage

Define a popover trigger and popover content:

```html
<button tsPopoverTrigger="popper1">Click me!</button>

<ts-popover #popper1>
  <h1>My Title</h1>
  <p>Other random content.</p>
</ts-popover>
```

### Position

Defines where the popover shows relative to current element.

```html
<button 
  tsPopoverTrigger="popper1"
  [position]="top"
>Click me!</button>

<ts-popover #popper1>
  <h1>My Title</h1>
  <p>Other random content.</p>
</ts-popover>
```

It defaults to `bottom`. For all available positions, please reference [popper.js docs](#popperjs-documentations).

### Hide on Blur

If `hideOnBlur` set to `true`, it allows close by clicking outside the popover. If it's `false`, popover can only be closed by clicking on trigger element.

```html
<button 
  tsPopoverTrigger="popper1"
  [hideOnBlur]="false"
>Click me!</button>

<ts-popover #popper1>
  <h1>My Title</h1>
  <p>Other random content.</p>
</ts-popover>
```

It defaults to `true`.

### Open on load

If `defaultOpened` set to `true`, popover content opens up on initial load.

```html
<button 
  tsPopoverTrigger="popper1"
  [defaultOpened]="true"
>Click me!</button>

<ts-popover #popper1>
  <h1>My Title</h1>
  <p>Other random content.</p>
</ts-popover>
```

It defaults to `false`.

## Events

| Event             | Description                                 | Payload                 |
|:------------------|:--------------------------------------------|:------------------------|
| `popoverOnShown`  | Fired when popover shows up                 |    popoverInstance                 |
| `popoverOnHidden` | Fired when popover hides                    |    popoverInstance                 |

## popper.js documentations

* [popper.js](https://github.com/popperjs/popper.js)
* [popper.js docs](https://github.com/popperjs/popper.js/blob/master/docs/_includes/popper-documentation.md)
* [popper.js supported placements](https://github.com/FezVrasta/popper.js/blob/master/packages/popper/src/methods/placements.js)
