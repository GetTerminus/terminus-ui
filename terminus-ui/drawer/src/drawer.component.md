<h1>Drawer</h1>

Drawer component is designed to add side content to a small section of a page.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Basic Usage](#basic-usage)
  - [Backdrop](#backdrop)
  - [Mode](#mode)
  - [Position](#position)
  - [Collapsed size and expanded size](#collapsed-size-and-expanded-size)
  - [Expand on load](#expand-on-load)
  - [Fixed header and footer](#fixed-header-and-footer)
- [Events](#events)
  - [Container events](#container-events)
  - [Drawer events](#drawer-events)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Basic Usage

Define a drawer:

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

### Backdrop

If `hasBackdrop` set to `true`, users can close the drawer if they click the backdrops.

```html
<ts-drawer-container
  hasBackdrop="true"
>
  <ts-drawer>
  
  </ts-drawer>
</ts-drawer-container>
```

`hasBackdrop` defaults to `false`.

### Mode

Mode property defines how a drawer expanded on the page. It defaults to `overlay`.

```html
<ts-drawer
  [mode]="push"
>
</ts-drawer>
```

We currently support two types of modes, `overlay` and `push`. 
`overlay` means that the drawer floats over the main content, which is covered by a backdrop.
`push` is that drawer pushes the primary content out of its way and also covering it with a backdrop.
 
 ### Position
 
 ```html
 <ts-drawer
   [position]="end"
 >
 </ts-drawer>
 ```
 
 Consumers can specify which side the drawer opens at. It defaults to `start`, which opens from the left of the page. If set to `end`, it would expand the drawer from right of the page.
 
 NOTE: An error is thrown if users have more than one drawer in a given container with the same position AND `push` mode.
 
 ### Collapsed size and expanded size
 
 Users can specify the size of a drawer when it's collapsed and expanded.
 
 ```html
 <ts-drawer
   [collpasedSize]="2rem"
   [expandedSize]="12rem"
 >
 </ts-drawer>
 ```

`collapsedSize` defaults to `3.75rem` and `expandedSize` to `12.5rem` if not specified.

### Expand on load

Users can set the drawer to expand on load

```html
<ts-drawer
  [isExpanded]="true"
>
</ts-drawer>
```

`isExpanded` set to `true` would have drawer expanded on load. It defaults to `false`.

### Fixed header and footer

Users can set drawer header and footer within a drawer, both are sticky to the view.

```html
<ts-drawer-header>
  THIS IS MY HEADER
</ts-drawer-header>
```
```html
<ts-drawer-footer>
  THIS IS MY FOOTER
</ts-drawer-footer>
```

## Events

### Container events

| Event              | Description                                    | Payload                  |
|:-------------------|:-----------------------------------------------|:-------------------------|
| `backdropClick`    | Fired when backdrop is clicked                 |  void                    |

### Drawer events

| Event             | Description                                 | Payload                 |
|:------------------|:--------------------------------------------|:------------------------|
| `expandedStart`   | Fired when the drawer expansion starts      |    void                 |
| `collapsedStart`  | Fired when the drawer collapse starts       |    void                 |
| `expandedChange`  | Fired when state change ends (animation ends)| boolean                  |

