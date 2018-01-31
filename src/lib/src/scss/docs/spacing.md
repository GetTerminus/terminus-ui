# Spacing

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

Passing in an invalid spacing will throw a Sass compile error.
