<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Spacing](#spacing)
- [Available spacing options](#available-spacing-options)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Spacing

All spacing should be defined using the `spacing()` helper method. This ensures that each spacing
is a valid spacing within our design language.

```scss
// Use the default spacing:
.foo {
  margin-bottom: spacing();
}

// Use a specific spacing:
.bar {
  margin-bottom: spacing(small, 2);
}
```

## Available spacing options

[Live Example][demo]

- Small: 12, 8, 4
- Base: 16
- Large: 24, 32, 40, 48, 56, 72, 96

You can access each option using zero-based indexes:

```scss
spacing() // 16px
// (for the first space in a collection we can omit the second parameter)
spacing(small) // 12px
spacing(small, 2) // 4px
spacing(large) // 24px
spacing(large, 4) // 56px
```

Passing an invalid spacing will throw a Sass compilation error.


<!-- Links -->
[demo]: http://uilibrary-demo.terminus.ninja/release/components/spacing-styles
