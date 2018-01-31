# Color

All colors should be set using the `color()` function. This will protect us from a constantly
expanding color palette.

> There should be NO hex/rgb/named/etc colors defined in the core app!

```scss
.foo {
  background-color: color(accent);
  color: color(primary);
}
```


### Available colors

Each color has a base tone by default:

```scss
color(primary)
// is the same as:
color(primary, base)
```

Most colors provide `light` and `dark` versions:

```scss
color(accent, dark)
```

- `primary`
    - `xlight`
    - `light`
    - `base`
    - `dark`
    - `xdark`
- `accent`
    - `xlight`
    - `light`
    - `base`
    - `dark`
    - `xdark`
- `warn`
    - `light`
    - `base`
    - `dark`
- `highlight`
    - `light`
    - `base`
    - `dark`
- `pure`
    - `light` (white)
    - `base` (black)
- `utility`
    - `xlight`
    - `light`
    - `base`
    - `dark`
    - `xdark`

Passing an invalid `$palette` or `$tone` will throw a Sass compilation error.
