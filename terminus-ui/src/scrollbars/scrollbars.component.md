<h1>Scrollbars</h1>


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Basic usage](#basic-usage)
  - [Disable](#disable)
  - [Update](#update)
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

  @ViewChild(TsScrollbarsComponent)
  public scrollbars!: TsScrollbarsComponent;


  myUpdate() {
    // Update the content
    this.updateScrollContent();

    // Update the scrollbars
    this.scrollbars.update();
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
