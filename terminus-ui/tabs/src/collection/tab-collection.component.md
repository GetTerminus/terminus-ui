<h1>Tab Collection</h1>


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Basic usage](#basic-usage)
- [Events](#events)
- [Label alignment](#label-alignment)
- [Header position](#header-position)
- [Dynamically insert a tab](#dynamically-insert-a-tab)
- [Custom label template](#custom-label-template)
- [Lazy load tab content](#lazy-load-tab-content)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Basic usage

In its most simple form this must consist of a collection with at least one tab:

```html
<ts-tab-collection>
  <ts-tab label="First">
    Content 1
  </ts-tab>

  <ts-tab label="Second">
    Content 2
  </ts-tab>
</ts-tab-collection>
```


## Events

| Event                 | Description                                      | Payload            |
|:----------------------|:-------------------------------------------------|:-------------------|
| `animationFinished`   | Fired when the tab animation is finished         | `void`             |
| `focusChange`         | Fired when the tab labels focus changes          | `TsTabChangeEvent` |
| `selectedIndexChange` | Fired when the index of the selected tab changes | `number`           |
| `selectedTabChange`   | Fired when the selected tab changes              | `TsTabChangeEvent` |

```html
<ts-tab-collection (selectedTabChange)="whenTabChanges($event)">
  ...
</ts-tab-collection>
```

The `TsTabChangeEvent` structure:

```typescript
class TsTabChangeEvent {
  constructor(
    // The tab's current index
    public index: number,
    // The tab
    public tab: TsTabComponent,
  ) {}
}
```


## Label alignment

There are four horizontal layout options for tab labels.

| Position  | Description                                  |
|-----------|----------------------------------------------|
| `start`   | Align tab labels to the left (default)       |
| `center`  | Center tab labels to content                 |
| `end`     | Align tab labels to the right                |
| `stretch` | Force tab labels to fill all available space |

```html
<ts-tab-collection headerPosition="stretch">
  ...
</ts-tab-collection>
```


## Header position

The collection of tab labels are positioned above the tab content by default. This can be inverted so the labels appear below the tab
content:

```html
<ts-tab-collection headerPosition="below">
  ...
</ts-tab-collection>
```


## Dynamically insert a tab

Tabs can be dynamically added and removed by using a loop to generate the tabs:

```html
<ts-tab-collection>

  <ts-tab *ngFor="let tab of myTabs; let index = index" [label]="tab">
    Content for {{ tab }} tab
  </ts-tab>

</ts-tab-collection>
```

Or by showing and hiding via `ngIf`:

```html
<ts-tab-collection>
  <ts-tab label="First">
    Content 1
  </ts-tab>

  <ts-tab label="Second" *ngIf="shouldIncludeTab">
    Content 2
  </ts-tab>
</ts-tab-collection>
```


## Custom label template

If label customization is needed a template can be defined to contain custom label markup by using the `tsTabLabel` directive on an
`ng-template` tag:

```html
<ts-tab-collection>
  <ts-tab>
    <ng-template tsTabLabel>
      <ts-icon>home</ts-icon>
      First
    </ng-template>

    Content 1
  </ts-tab>
</ts-tab-collection>
```


## Lazy load tab content

By default tab content is eagerly loaded. Tab content can be lazily loaded by using the `tsTabContent` directive on an `ng-template` tag:

```html
<ts-tab-collection>

  <ts-tab label="First">
    <ng-template tsTabContent>
      Content 1
    </ng-template>
  </ts-tab>

</ts-tab-collection>
```
