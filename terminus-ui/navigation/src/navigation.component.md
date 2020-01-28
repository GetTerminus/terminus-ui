<h1>Navigation</h1>


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Basic usage](#basic-usage)
- [Navigation item](#navigation-item)
  - [Actions](#actions)
  - [Links](#links)
- [Nav items array](#nav-items-array)
- [Welcome message](#welcome-message)
- [User](#user)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Basic usage

Create a navigation menu. A navigation menu is a collection of [Nav Items](#nav-items) grouped together, with a space for [User](#user)  
 and [Welcome Message](#welcome-message).

```html
<ts-navigation
  [items]="navigationItems$"
  (itemSelected)="myMethod($event)"
></ts-navigation>
```


## Navigation item

An object describing a "link" within the navigation. It gets a name, an action or destination, and a boolean `alwaysHidden`. Optionally,  
 it can receive boolean values for `isForAdmin` and `isDisabled`.

```typescript
const NEW_NAV_ITEM: TsNavigationItem = {
  name: '0 Foo',
  action: {
    type: 'my:action',
  },
  alwaysHidden: false,
};
```
\- or -
```typescript
const NEW_NAV_ITEM: TsNavigationItem = {
  name: '1 Bar',
  destination: ['/components/menu'],
  alwaysHidden: false,
};
```

### Actions

An action is an object with a `type`. It gets emitted upon click.

### Links

A link is a string or string[], with a `destination` and optional boolean `isExternal`. Without isExternal, a link is considered a router link, and with isExternal, it's treated as an href.

## Nav items array

An array of navigation items that is passed to `ts-navigation` as `items`.

```typescript
const NAV_ITEMS_MOCK: TsNavigationItem[] = [
  {
    name: '1 Components',
    destination: '/components',
    alwaysHidden: false,
  },
  {
    name: '2 Nav',
    action: 'my:navigationAction',
    alwaysHidden: false,
  },
  {
    name: '3 Buttons',
    destination: ['/components/button'],
    alwaysHidden: true,
  },
];
```


## Welcome message

A message presented with the user name in the navigation. Default message is `Welcome`. Custom messages will truncate
after exceeding `welcomeMsgLength` which is also customizable, and defaults to 25 characters. Any truncated message will appears with
ellipses and have a tooltip with the full message.

```html
<ts-navigation
  welcomeMessage="Welcome back,"
  welcomeMsgLength="15"
></ts-navigation>
```


## User

The user's name which, if defined, displays with the welcome message, in a location separate from the items. User names will truncate after  
 exceeding `userNameLength` which is also customizable, and defaults to 20 characters. A truncated user name will appear with ellipses and  
 have a tooltip with the full name.

```html
<ts-navigation
  [user]="currentUser$ | async"
  userNameLength="10"
></ts-navigation>
```

