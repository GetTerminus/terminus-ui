# Typography

All typography should be defined using the `typography()` mixin. This ensures that all font
sizes/weights/line-heights/etc are using styles explicitly defined in our design language.

```scss
// Use the default typography styles
.foo {
  // Note: When a mixin is used with no parameters, the `()` should be omitted
  @include typography;
}

// Use a specific format
.bar {
  @include typography(headline);
}

// Use a specific format & level
.baz {
  @include typography(display, 3);
}

// Use a specific format & level & typeface
.baz {
  @include typography(display, 3, monospaced);
}
```

## Available typography styles

[Live Example][demo]

### Formats and Levels

- `display`
    - `1`
    - `2`
    - `3`
    - `4`
- `headline`
- `title`
- `subhead`
- `body`
    - `1`
    - `2`
- `caption`

### Typefaces

- `primary`
- `monospaced`

```scss
@include typography // default font styles for body font
@include typography(title) // use the title format
@include typography(display, 3) // use 3rd level of the display format
@include typography(body, 1, monospaced) // use default body styles with a monospaced typeface
```

Passing an invalid typography `$format`, `$level` or `$typeface` will throw a Sass compilation error.

<!-- Links -->
[demo]: https://terminus-ui-demos.stackblitz.io/components/spacing-styles
