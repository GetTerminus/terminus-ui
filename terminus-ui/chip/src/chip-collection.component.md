<h1>Chip Collection</h1>

A collection of individual, keyboard accessible, chips. Useful for displaying choice collections.

NOTE: This component does not support a `FormControl`; it is a simple collection display.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Basic Usage](#basic-usage)
  - [Using the DOM as value](#using-the-dom-as-value)
  - [Theme](#theme)
  - [Orientation](#orientation)
  - [Removable](#removable)
  - [Selectable](#selectable)
- [Events](#events)
  - [Collection events](#collection-events)
  - [Chip events](#chip-events)
- [Test Helpers](#test-helpers)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Basic Usage

Loop through a collection to generate chips:

```html
<ts-chip-collection>
  <ts-chip
    *ngFor="let chip of chips;"
    [value]="chip"
  >{{ chip }}</ts-chip>
</ts-chip-collection>
```

### Using the DOM as value

For string based collections, the value input can be disregarded as the value will be pulled directly from the DOM.

```html
<ts-chip-collection>
  <ts-chip *ngFor="let chip of ['foo', 'bar', 'baz']">
    {{ chip }}
  </ts-chip>
</ts-chip-collection>
```

### Theme

A theme can be set a the chip level:

```html
<ts-chip-collection>
  <ts-chip
    *ngFor="let chip of chips"
    theme="accent"
  >{{ chip }}</ts-chip>
</ts-chip-collection>
```

### Orientation

A collection can be displayed in a row (`horizontal`) or a column (`vertical`) via the `orientation` input. By default it displays as a row.

```html
<ts-chip-collection>
  <ts-chip
    *ngFor="let chip of chips"
    orientation="vertical"
  >{{ chip }}</ts-chip>
</ts-chip-collection>
```

### Removable

By default, chips are 'removable'. Since this component does not directly manage the data, when a user tries to remove a chip, an event is
emitted. The consumer is responsible to using that event to remove the item from the collection. (See [Events](#events))

```html
<ts-chip-collection>
  <ts-chip
    *ngFor="let chip of myChips"
    (remove)="removeChip($event)"
  >{{ chip }}</ts-chip>
</ts-chip-collection>
```

```typescript
myChips = ['apple', 'banana'];

removeChip(event: TsChipEvent): void {
  if (!event.chip.value) {
    return;
  }
  const index = this.myChips.indexOf(event.chip.value);
  if (index < 0) {
    return;
  }
  this.myChips.splice(index, 1);
}
```

The ability to remove a chip can be disabled per chip or as a collection:

```html
<!-- Disable on the chip directly -->
<ts-chip-collection>
  <ts-chip
    *ngFor="let chip of chips"
    [isRemovable]="chip.removable"
  >{{ chip }}</ts-chip>
</ts-chip-collection>

<!-- Disable for the entire collection -->
<ts-chip-collection [isRemovable]="false">
  <ts-chip *ngFor="let chip of chips">
    {{ chip }}
  </ts-chip>
</ts-chip-collection>
```

### Selectable

Chips can be selected and visually show that selection. The style of the selected state reflects the current [theme](#theme).

The ability to select chips can be disabled at the collection or chip level.

```html
<!-- Disable on the chip directly -->
<ts-chip-collection>
  <ts-chip
    *ngFor="let chip of chips"
    [isSelectable]="chip.canSelect"
  >{{ chip }}</ts-chip>
</ts-chip-collection>

<!-- Disable for the entire collection -->
<ts-chip-collection [isSelectable]="false">
  <ts-chip *ngFor="let chip of chips">
    {{ chip }}
  </ts-chip>
</ts-chip-collection>
```

## Events

Since this component does not directly manage the data, we rely on emitting events to alert the consumer as to what needs to happen.

### Collection events

| Event              | Description                                    | Payload                  |
|:-------------------|:-----------------------------------------------|:-------------------------|
| `collectionChange` | Fired when any chips are added or removed      | `TsChipCollectionChange` |
| `removed`          | Fired when a chip is removed                   | `TsChipEvent`            |
| `tabUpdateFocus`   | Fired when the user tabs out of the collection | `void`                   |

### Chip events

| Event             | Description                                 | Payload                 |
|:------------------|:--------------------------------------------|:------------------------|
| `clicked`         | Fired when the chip is clicked              | `TsChipClickEvent`      |
| `destroyed`       | Fired when the chip is destroyed            | `TsChipEvent`           |
| `blurred`         | Fired when focus leaves the chip            | `void`                  |
| `remove`          | Fired when the chip should be removed       | `TsChipEvent`           |
| `selectionChange` | Fired when the chip selection state changes | `TsChipSelectionChange` |


## Test Helpers

Some helpers are exposed to assist with testing. These are imported from `@terminus/ui/chip/testing`;

[[source]][test-helpers-src]

| Function                                  |
|-------------------------------------------|
| `getAllChipDebugElements`                 |
| `getAllChipCollectionDebugElements`       |
| `getAllChipInstances`                     |
| `getChipInstance`                         |
| `getAllChipCollectionInstances`           |
| `getChipCollectionInstanceInAutocomplete` |
| `getChipDebugElement`                     |
| `getChipCollectionDebugElement`           |
| `getChipCollectionInstance`               |
| `getChipElement`                          |
| `getChipCollectionElement`                |


[test-helpers-src]: https://github.com/GetTerminus/terminus-ui/blob/release/terminus-ui/chip/testing/src/test-helpers.ts
