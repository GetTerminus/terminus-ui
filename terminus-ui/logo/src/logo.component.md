<h1>Logo</h1>


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Basic usage](#basic-usage)
- [Type](#type)
- [Colors](#colors)
- [Sizing](#sizing)
- [Special Cases](#special-cases)
- [Available logos](#available-logos)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Basic usage

The most basic implementation is only HTML:

```html
<ts-logo></ts-logo>
```

## Type

Multiple logo types are available:

```html
<ts-logo type="full-solid"></ts-logo>
<ts-logo type="mark-gradient"></ts-logo>
```

See `TS_LOGO_TYPES` to see all allowed types.

## Colors

Solid logos are white by default, but can also be black (Terminus Dark) or gray (logo-gray).

```html
<ts-logo type="full-solid" logoColor="gray"></ts-logo>
<ts-logo type="mark-solid" logoColor="black"></ts-logo>
```

See for `TS_LOGO_COLORS` to see all allowed logo colors.

## Sizing

The four main logos are full-size so they will adapt to the width of their container.

## Special Cases

- Any logo with a gradient will not honor a logoColor.

## Available logos

|               Name | Description                                                                                                 |
|-------------------:|:------------------------------------------------------------------------------------------------------------|
| `full-account-hub` | Special logo for Account Hub, includes spacing and color, should be used according to marketing standards   |
|    `full-gradient` | Default. Gradient mark with logo gray "terminus" text                                                       |
|       `full-solid` | Mark with "terminus" text, white by default, accepts logoColor                                              |
|    `mark-gradient` | T formed by arrow on top and blocks below to form a T in negative space, positive space has gradient        |
|       `mark-solid` | T formed by arrow on top and blocks below to form a T in negative space, positive space is white by default |
