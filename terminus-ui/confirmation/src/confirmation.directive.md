<h1>Confirmation</h1>

This directive can be attached to any `<ts-button>` to enable a confirmation step before triggering
the button's action.

Basic flow:

1. The user clicks the button
1. A pop-up appears asking user to cancel or confirm
1. If the user clicks 'confirm', the original `ts-button` click event is emitted
1. If the user clicks 'cancel' the pop-up is closed


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Basic usage](#basic-usage)
- [Cancelled event](#cancelled-event)
- [Text customization](#text-customization)
  - [Confirm button](#confirm-button)
  - [Cancel button](#cancel-button)
  - [Explanation text](#explanation-text)
- [Position](#position)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Basic usage

Add the directive to any `ts-button`:

```html
<ts-button
  tsConfirmation
  (clicked)="myContinueFn($event)"
>Click me!</ts-button>
```


## Cancelled event

This directive exposes a new event that can be used to determine when a user has chosen 'cancel'
from the confirmation pop-up.

```html
<ts-button
  tsConfirmation
  (cancelled)="myCancelEvent($event)"
>Click me!</ts-button>
```

## Text customization

### Confirm button

Customizes the confirmation button text in the overlay. This defaults to `Confirm`.

```html
<ts-button
  tsConfirmation
  confirmationButtonText="Custom Confirmation Button Text"
>Click Me!</ts-button>
```


### Cancel button

Customizes the text in the overlay of the cancel button; default is "Cancel".

```html
<ts-button
  tsConfirmation
  cancelButtonText="Custom Cancel Button Text"
>Click Me!</ts-button>
```


### Explanation text

Optional text to appear inside of the overlay, generally to use as a warning, for example, "Are you sure you want to do
this action?". No explanation text exists by default.

```html
<ts-button
  tsConfirmation
  explanationText="This will permanently delete this record."
>Click Me!</ts-button>
```

## Position

The position of the panel is centered below the trigger by default. This position can be changed to any of the  
`TsConfirmationOverlayPositionTypes` (`above`|`below`|`before`|`after`).

```html
<ts-button
  tsConfirmation
  overlayPosition="before"
>Click Me!</ts-button>
```
