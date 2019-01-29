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
- [Confirmation Button Text](#confirmation-button-text)
- [Cancel Button Text](#cancel-button-text)
- [Explanation Text](#explanation-text)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Basic usage

Add the directive to any `ts-button`:

```html
<ts-button
  ts-confirmation
  (clickEvent)="myContinueFn($event)"
>
  Click me!
</ts-button>
```


## Cancelled event

This directive exposes a new event that can be used to determine when a user has chosen 'cancel'
from the confirmation pop-up.

```html
<ts-button
  ts-confirmation
  (clickEvent)="myContinueFn($event)"
  (cancelled)="myCancelEvent($event)"
>
  Click me!
</ts-button>
```


## Confirmation Button Text

Customizes the text in the modal of the confirmation button; default is "Confirm".

```html
<ts-button
    tsConfirmation
    (clickEvent)="submit()"
    (cancelled)="cancel($event)"
    confirmationButtonText="Custom Confirmation Button Text"
  >
    Click Me!
  </ts-button>
```


## Cancel Button Text

Customizes the text in the modal of the cancel button; default is "Cancel".

```html
<ts-button
    tsConfirmation
    (clickEvent)="submit()"
    (cancelled)="cancel($event)"
    cancelButtonText="Custom Cancel Button Text"
  >
    Click Me!
  </ts-button>
```


## Explanation Text

Optional text to appear inside of the modal, generally to use as a warning, for example, "Are you sure you want to delete this tactic, a delete can not be undone". Default is null.

```html
<ts-button
    tsConfirmation
    (clickEvent)="submit()"
    (cancelled)="cancel($event)"
    explanationText="Optional text within modal."
  >
    Click Me!
  </ts-button>
```
