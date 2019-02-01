<h1>Navigation</h1>


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Basic Usage](#basic-usage)
- [Navigation Item](#navigation-item)
  - [Nav Items](#nav-items)
- [Welcome Message](#welcome-message)
- [User](#user)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->



## Basic Usage

Create a navigation menu

```html
<ts-navigation
  [items]="navigationItems$"
  (itemSelected)="myMethod($event)"
  >
</ts-navigation>
```


## Navigation Item

An object describing a "link" within the navigation. It gets a name, action or destination, and a boolean alwaysHidden.

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

### Nav Items

An array of navigation items that is passed to `ts-navigation`.



## Welcome Message
A message presented with the user name in the navigation. Default message is `Welcome`. Custom messages will truncate after exceeding `welcomeMsgLength` which is also customizable, and defaults to 25 characters. Any truncated message will appears with ellipses and have a tooltip with the full message.

```html
<ts-navigation
  [items]="navigationItems$"
  (itemSelected)="myMethod($event)"
  welcomeMessage="Welcome back,"
  welcomeMsgLength="15"
  >
</ts-navigation>
```


## User
The user's name which, if defined, displays with the welcome message, in a location separate from the items. User names will truncate after exceeding `userNameLength` which is also customizable, and defaults to 20 characters. A truncated user name will appear with ellipses and have a tooltip with the full name.

```html
<ts-navigation
  [items]="navigationItems$ | async"
  (itemSelected)="myMethod($event)"
  [user]="currentUser$ | async"
  userNameLength="10"
  >
</ts-navigation>
```

