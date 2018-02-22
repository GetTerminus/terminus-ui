<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [z-index](#z-index)
- [Available z-index values](#available-z-index-values)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## z-index

`z-index` values are based off of a list. This allows us to only define the most minimal set
of `z-index` values while at the same time guaranteeing that no two `z-index` values can conflict.

```scss
// Use the 'tooltip' z-index value
.foo {
  z-index: z(tooltip);
}

// Use the 'overlay' z-index value
.bar {
  z-index: z(overlay);
}
```

## Available z-index values

(values are computed in ascending order - highest values at the top)

- `overlay`,
- `tooltip`,
- `header`,
- `menu`,
- `menu-trigger`,

More `z-index` values will be added as needed.

Passing an invalid `z-index` `$name` will throw a Sass compilation warning.
