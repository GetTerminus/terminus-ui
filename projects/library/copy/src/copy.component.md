<h1>Copy</h1>

This component is used to contain very long strings that users may need to copy.


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Basic usage](#basic-usage)
- [Display format](#display-format)
- [Initial selection](#initial-selection)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Basic usage

Pass in text content:

```html
<ts-copy>My text to copy!</ts-copy>
```

## Display format

Three display formats are offered:

| Mode       | Description                                             |
|------------|---------------------------------------------------------|
| `standard` | The full, bordered version (default)                    |
| `minimal`  | Slightly more compact with no border (useful in tables) |
| `icon`     | Icon only, all text hidden (quick copy must be enabled) |

## Initial selection

By default, when a user focuses on this component, the text is automatically selected. This provides an easy fallback in
the instance where the user's browser does not support clipboard functionality.

It should be extremely rare, but if needed, this functionality can be disabled.

```html
<ts-copy [disableInitialSelection]="true">My text to copy!</ts-copy>
```
