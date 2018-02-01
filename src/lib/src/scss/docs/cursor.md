# Cursors

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

| Value         | Meaning                                 |
|---------------|-----------------------------------------|
| `auto`        | Let the browser decide                  |
| `text`        | Indicates text controls                 |
| `pointer`     | Indicates interaction                   |
| `not-allowed` | Indicates no available interaction      |
| `copy`        | Indicates ability to copy               |
| `alias`       | Indicates an alias or copy will be made |
| `help`        | Indicates help is available             |

Passing an invalid cursor `$type` will throw a Sass compilation warning.
