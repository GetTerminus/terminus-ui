<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Shadows](#shadows)
- [Available levels](#available-levels)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Shadows

Shadow values are managed via a global list as they are too complex for static variables or manual
definition.

```scss
.foo {
  // Pass the element in to generate the correct shadows
  @include elevation-element(card);
}
```


## Available levels

- `dialog`
- `picker`
- `nav-drawer`
- `right-drawer`
- `bottom-sheet`
- `fab`
- `sub-menu-3`
- `sub-menu-2`
- `sub-menu-1`
- `menu`
- `bottom-nav-bar`
- `card`
- `raised-button`
- `snackbar`
- `app-bar`
- `refresh-indicator`
- `quick-entry`
- `search-bar`
- `switch`

If your specific element is not listed, select an element that should appear at the same elevation
as your element. If you are unsure, ask!
