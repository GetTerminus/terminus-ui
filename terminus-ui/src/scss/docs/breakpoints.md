<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Breakpoints](#breakpoints)
- [Available breakpoints](#available-breakpoints)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Breakpoints

Terminus uses specific breakpoints meant to be used in a mobile-first development process.

The general rule for responsive development:

1. Start at the smallest applicable width
1. Build the design
1. Slowly expand the viewport until something looks 'off' or 'broken'
1. Find the closest _previous_ breakpoint size and nest new styles within that breakpoint

```scss
.foo {
  // Initially the width is 100%
  width: 100%;

  // Then once we are larger than the `xs` layout, the width changes to 50%
  @include bp(layout-gt-xs) {
    width: 50%;
  }
}
```

## Available breakpoints

[Live Example][demo]

| Value           | When it is applied                        |
|-----------------|-------------------------------------------|
| `layout-xs`     | `max-width: 599px`                        |
| `layout-gt-xs`  | `min-width: 600px`                        |
| `layout-sm`     | `min-width: 600px and max-width: 959px`   |
| `layout-gt-sm`  | `min-width: 960px`                        |
| `layout-mat`    | `min-width: 960px and max-width: 1279px`  |
| `layout-gt-mat` | `min-width: 1280px`                       |
| `layout-lg`     | `min-width: 1280px and max-width: 1919px` |
| `layout-gt-lg`  | `min-width: 1920px`                       |
| `layout-xl`     | `min-width: 1920px`                       |


Passing an invalid `$breakpoint` will throw a Sass compilation error.


<!-- Links -->
[demo]: https://terminus-ui-demos.stackblitz.io/components/breakpoints
