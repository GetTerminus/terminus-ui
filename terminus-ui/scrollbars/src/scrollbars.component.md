<h1>Scrollbars</h1>


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Basic usage](#basic-usage)
  - [Disable](#disable)
  - [Update](#update)
- [Manual Position Control](#manual-position-control)
  - [Scroll to fixed location](#scroll-to-fixed-location)
  - [Scroll to x/y location](#scroll-to-xy-location)
  - [Scroll to element](#scroll-to-element)
- [Events](#events)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Basic usage

You _must_ set a fixed height and/or width to enable scrollbars (otherwise the browser will just continue making the container larger to fit
the content).

```html
<ts-scrollbars style="height: 300px; width: 400px;">
  ...
</ts-scrollbars>
```


### Disable

The scrollbars can be disabled dynamically if needed:

```html
<ts-scrollbars [isDisabled]="true">
  ...
</ts-scrollbars>
```


### Update

If the scrollbars content is dynamically updated, you will need to update the scrollbars instance:

```html
<!-- Get a reference to the component class -->
<ts-scrollbars #scrollbars="tsScrollbars">
  ...
</ts-scrollbars>
```

```typescript
...

@ViewChild(TsScrollbarsComponent, {static: false})
public scrollbars!: TsScrollbarsComponent;


myUpdate() {
  // Update the content
  this.updateScrollContent();

  // Update the scrollbars
  this.scrollbars.update();
}
```

## Manual Position Control

Scrolling methods can be called directly once a reference to the component is attained:

```html
<!-- Get a reference to the component class -->
<ts-scrollbars #scrollbars="tsScrollbars">
  ...
</ts-scrollbars>
```

```typescript
...
// A reference to the component instance:
@ViewChild(TsScrollbarsComponent, {static: false})
public scrollbars!: TsScrollbarsComponent;
...
```

The following scroll examples will assume that a reference has already been created.

### Scroll to fixed location

```typescript
@ViewChild(TsScrollbarsComponent, {static: false})
public scrollbars!: TsScrollbarsComponent;

scrollToTop() {
  // Scroll the container to the very top
  this.scrollbars.scrollToTop();
}
```

Available fixed location methods:

| Method             |
|--------------------|
| `scrollToBottom()` |
| `scrollToLeft()`   |
| `scrollToRight()`  |
| `scrollToTop()`    |


### Scroll to x/y location

Scroll the container to a specific x/y location:

```typescript
@ViewChild(TsScrollbarsComponent, {static: false})
public scrollbars!: TsScrollbarsComponent;

scrollToCoordinates() {
  //                       x    y    speed
  this.scrollbars.scrollTo(100, 250, 200);
}
```


### Scroll to element

The component can scroll a nested element to the top of the scroll container:

```typescript
@ViewChild(TsScrollbarsComponent, {static: false})
public scrollbars!: TsScrollbarsComponent;

scrollToElement() {
  // This supports any string that can be passed to `querySelector()`
  this.scrollbars.scrollToElement('.my-class');
}
```


## Events

```html
<ts-scrollbars (scrollDown)="myFunc($event)">
  ...
</ts-scrollbars>
```

| Available events |
|------------------|
| `scrollDown`     |
| `scrollLeft`     |
| `scrollRight`    |
| `scrollUp`       |
| `scrollX`        |
| `scrollY`        |
| `xReachEnd`      |
| `xReachStart`    |
| `yReachEnd`      |
| `yReachStart`    |
