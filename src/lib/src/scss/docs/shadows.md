# Shadows

Shadow values are managed via a global list as they are too complex for static variables or manual
definition.

```scss
.foo {
  // Pass the element in to generate the correct shadows
  @include elevation(card);
}
```


### Available levels

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

