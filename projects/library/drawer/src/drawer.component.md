<h1>Drawer</h1>

The drawer component is designed to add side content to a section of content.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Basic usage](#basic-usage)
- [Backdrop](#backdrop)
- [Mode](#mode)
- [Position](#position)
- [Collapsed and expanded sizes](#collapsed-and-expanded-sizes)
- [Expand on load](#expand-on-load)
- [Hide shadow when collapsed](#hide-shadow-when-collapsed)
- [Fixed header and footer](#fixed-header-and-footer)
- [Events](#events)
  - [Container events](#container-events)
  - [Drawer events](#drawer-events)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Basic usage

Define a container, a drawer, and the page content:

```html
<ts-drawer-container>
  <ts-drawer
    mode="push"
    posistion="start"
  >
    <div>
      Inside drawer
    </div>
  </ts-drawer>
  <ts-drawer-content>
    <div>
        Main content
    </div>
  </ts-drawer-content>
</ts-drawer-container>
```

## Backdrop

If `hasBackdrop` is set to `true`, users can close the drawer by clicking outside (default is `false`):

```html
<ts-drawer-container hasBackdrop="true">
  <ts-drawer>...</ts-drawer>
</ts-drawer-container>
```

## Mode

The mode defines how the page content reacts to the drawer. A drawer can open over the page content (`overlay`) or push
(`push`) the content to make room for the drawer (default is `overlay`):

```html
<ts-drawer [mode]="push">
</ts-drawer>
```
 
## Position

Consumers can specify which side of the container the drawer opens from. The default is `start` which opens from the
left side of the page. If set to `end`, it would expand the drawer from right of the page.

```html
<ts-drawer [position]="end">
</ts-drawer>
```

NOTE: An error will be thrown if more than one drawer in a given container has the same position AND `push` mode set.

## Collapsed and expanded sizes

The size of a drawer when it's collapsed and expanded can be customized:

```html
<ts-drawer
  [collapsedSize]="2rem"
  [expandedSize]="12rem"
></ts-drawer>
```

NOTE: `collapsedSize` defaults to `3.75rem` and `expandedSize` to `12.5rem`.

## Expand on load

The drawer can be forced to expand on load:

```html
<ts-drawer [isExpanded]="true">
</ts-drawer>
```

## Hide shadow when collapsed

When a drawer is expanded, there is box shadow around the drawer. When a drawer is collapsed, if input `hideShadowWhenCollapsed` set to false and `collapseSize` greater than 0, there is box shadow shown; otherwise, no box shadow.

```html
<ts-drawer
  [hideShadowWhenCollapsed]="true"
></ts-drawer>
```

## Fixed header and footer

The drawer supports both a header and footer:

```html
<ts-drawer-header>
  My header content...
</ts-drawer-header>
```
```html
<ts-drawer-footer>
  My footer content...
</ts-drawer-footer>
```

## Events

### Container events

| Event           | Description                    | Payload |
|:----------------|:-------------------------------|:--------|
| `backdropClick` | Fired when backdrop is clicked | void    |

### Drawer events

| Event            | Description                                   | Payload |
|:-----------------|:----------------------------------------------|:--------|
| `expandedStart`  | Fired when the drawer expansion starts        | void    |
| `collapsedStart` | Fired when the drawer collapse starts         | void    |
| `expandedChange` | Fired when state change ends (animation ends) | boolean |

