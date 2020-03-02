<h1>Icons</h1>


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Basic usage](#basic-usage)
- [Theming](#theming)
- [Background](#background)
- [Style with CSS](#style-with-css)
- [Usage inline with text](#usage-inline-with-text)
- [Custom Icons](#custom-icons)
- [Special Cases](#special-cases)
  - [Available](#available)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Basic usage

Include any valid Material icon name inside the component:

```html
<ts-icon>home</ts-icon>
```

If the icon name consists of multiple words, use underscores between the words:

```html
<ts-icon>open_in_new</ts-icon>
```

> See all valid icon possibilities: https://material.io/icons


## Theming

Icons support the same themes as the rest of the components:

```html
<ts-icon theme="warn"></ts-icon>
```

Search for `TsStyleThemeTypes` to see all allowed types.


## Background

Icons can be shown white with a colored background (color is determined by theme) by setting `background` to true.

```html
<ts-icon [background]="true"></ts-icon>
```


## Style with CSS

To style with CSS, simply target the `fill` inside the `ts-icon` class:

```scss
.myClass {
  .ts-icon {
    fill: color(accent);
  }
}
```


## Usage inline with text

To size and space the icons correctly for use within a block of text:

```html
<ts-icon [inline]="true"></ts-icon>
```

## Custom Icons

Custom icons are accessed via a `ts-icon` `@Input`:


```html
<!-- Access standard icon -->
<ts-icon>home</ts-icon>

<!-- Access custom icon -->
<ts-icon svgIcon="csv"></ts-icon>
```

## Special Cases

Any icon with a -color suffix will not accept themes. Currently they accept a background, but the display might be
problematic and background should be used with extreme caution. A non "-color" version should be used instead.


### Available

|               Name | Description                                             | Example Usage                    |
|-------------------:|:--------------------------------------------------------|:---------------------------------|
|              `csv` | A file with the text 'CSV'                              | Upload a CSV                     |
|           `engage` | A right-pointing arrow stacked on a left-pointing arrow | Navigation for Engage product    |
|        `lightbulb` | A lightbulb                                             | Pro-tip box                      |
|             `logo` | Terminus logo, default is black, but accepts theme      | Logo, negative logo              |
|       `logo_color` | Terminus logo in correct colors, does not accept theme  | Logo like it is supposed to look |
| `table_large_plus` | A table icon with a plus sign                           | Editing table columns            |




