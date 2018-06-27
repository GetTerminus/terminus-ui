<h1>Icons</h1>


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Basic usage](#basic-usage)
- [Theming](#theming)
- [Style with CSS](#style-with-css)
- [Usage inline with text](#usage-inline-with-text)

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
<ts-icon inline="true"></ts-icon>
```

