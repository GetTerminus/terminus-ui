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

| Palette   | `xdark`                          | `dark`                          | `base` <sub>(default)</sub>     | `light`                         | `xlight`                         |
|-----------|:--------------------------------:|:-------------------------------:|:-------------------------------:|:-------------------------------:|:--------------------------------:|
| `pure`    | <img src="./assets/na.png">      | <img src="./assets/na.png">     | <img src="./assets/pure-l.png"> | <img src="./assets/pure-d.png"> | <img src="./assets/na.png">      |
| `utility` | <img src="./assets/util-xd.png"> | <img src="./assets/util-d.png"> | <img src="./assets/util.png">   | <img src="./assets/util-l.png"> | <img src="./assets/util-xl.png"> |
| `primary` | <img src="./assets/prim-xd.png"> | <img src="./assets/prim-d.png"> | <img src="./assets/prim.png">   | <img src="./assets/prim-l.png"> | <img src="./assets/prim-xl.png"> |
| `accent`  | <img src="./assets/acc-xd.png">  | <img src="./assets/acc-d.png">  | <img src="./assets/acc.png">    | <img src="./assets/acc-l.png">  | <img src="./assets/acc-xl.png">  |
| `warn`    | <img src="./assets/na.png">      | <img src="./assets/warn-d.png"> | <img src="./assets/warn.png">   | <img src="./assets/warn-l.png"> | <img src="./assets/na.png">      |


Passing an invalid `$palette` or `$tone` will throw a Sass compilation error.


#### All possible color function parameters

- `primary`
    - `color(primary, xlight)`
    - `color(primary, light)`
    - `color(primary)`
    - `color(primary, dark)`
    - `color(primary, xdark)`
- `accent`
    - `color(accent, xlight)`
    - `color(accent, light)`
    - `color(accent)`
    - `color(accent, dark)`
    - `color(accent, xdark)`
- `warn`
    - `color(warn, light)`
    - `color(warn)`
    - `color(warn, dark)`
- `pure`
    - `color(pure)` (white)
    - `color(pure, dark)` (black)
- `utility`
    - `color(utility, xlight)`
    - `color(utility, light)`
    - `color(utility)`
    - `color(utility, dark)`
    - `color(utility, xdark)`

