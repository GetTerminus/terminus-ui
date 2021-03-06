<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Cursor](#cursor)
- [Available cursor values](#available-cursor-values)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Cursor

The `cursor()` function returns the correct cursor value based on the desired type.

```scss
// Use the 'pointer' cursor value
.foo {
  cursor: cursor(pointer);
}

// Use the 'help' cursor
.bar {
  cursor: cursor(help);
}
```

This is also available as a mixin:

```scss
.foo {
  @include cursor(pointer);
}
```

## Available cursor values

> These values are currently basically 1-to-1 with the actual CSS values. We expect this to change
> over time as we create usage-driven names.

| Value         | Meaning                                  |
|---------------|------------------------------------------|
| `alias`       | Indicates an alias or copy will be made  |
| `auto`        | Let the browser decide                   |
| `col-resize`  | Indicates the ability to resize          |
| `copy`        | Indicates ability to copy                |
| `default`     | The default browser cursor               |
| `help`        | Indicates help is available              |
| `move`        | Indicates the ability to move an item    |
| `not-allowed` | Indicates no available interaction       |
| `ns-resized`  | Indicates the ability to move vertically |
| `pointer`     | Indicates interaction                    |
| `text`        | Indicates text controls                  |

Passing an invalid cursor `$type` will throw a Sass compilation error.
