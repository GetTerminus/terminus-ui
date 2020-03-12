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
- [Badge](#badge)
- [Events](#events)
  - [Collection events](#collection-events)
  - [Chip events](#chip-events)
- [Test Helpers](#test-helpers)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Basic Usage

Create a collection of chips:

```typescript
myChips = ['one', 'two', 'three'];
```

```html
<ts-chip-collection>
  <ts-chip
    *ngFor="let chip of myChips;"
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

A theme can be defined at the chip level:

```html
<ts-chip-collection>
  <ts-chip
    *ngFor="let chip of chips"
    theme="accent"
  >{{ chip }}</ts-chip>
</ts-chip-collection>
```

### Orientation

A collection of chips can be displayed in a row (`horizontal`) or a column (`vertical`) via the `orientation` input. By
default it displays as a row.

```html
<ts-chip-collection>
  <ts-chip
    *ngFor="let chip of chips"
    orientation="vertical"
  >{{ chip }}</ts-chip>
</ts-chip-collection>
```

### Removable

By default, chips are 'removable'. Since this component does not directly manage the data, when a user attempts to
remove a chip, an event is emitted. The consumer is responsible to use that event to remove the item from the
collection. (See [Events](#events))

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

removeChip(removeEvent: TsChipEvent): void {
  const index = this.myChips.indexOf(removeEvent.chip.value);
  if (index < 0) {
    return;
  }
  this.myChips.splice(index, 1);
}
```

The ability to remove a chip can be disabled per chip or as a collection:

```html
<!-- Disable the chip directly -->
<ts-chip-collection>
  <ts-chip
    *ngFor="let chip of chips"
    [isRemovable]="false"
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

Chips can be selected and will visually show that selection. The style of the selected state reflects the current
[theme](#theme).

The ability to select chips can be disabled per chip or as a collection:

```html
<!-- Disable on the chip directly -->
<ts-chip-collection>
  <ts-chip
    *ngFor="let chip of chips"
    [isSelectable]="false"
  >{{ chip }}</ts-chip>
</ts-chip-collection>

<!-- Disable for the entire collection -->
<ts-chip-collection [isSelectable]="false">
  <ts-chip *ngFor="let chip of chips">
    {{ chip }}
  </ts-chip>
</ts-chip-collection>
```

## Badge

A chip can be used as a badge by placing the `tsChipBadge` directive on a standalone chip:

```html
<ts-chip tsChipBadge>My badge!</ts-chip>
```

This will disable the ability to remove, select or focus the chip.

## Events

Since this component does not directly manage the data, we rely on emitting events to alert the consumer for any user
interaction.

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
| `getAllChipCollectionDebugElements`       |
| `getAllChipCollectionInstances`           |
| `getChipCollectionInstance`               |
| `getChipCollectionInstanceInAutocomplete` |
| `getChipCollectionElement`                |
| `getAllChipInstances`                     |
| `getChipInstance`                         |
| `getAllChipDebugElements`                 |
| `getChipDebugElement`                     |
| `getChipCollectionDebugElement`           |
| `getChipElement`                          |


[test-helpers-src]: https://github.com/GetTerminus/terminus-ui/blob/release/projects/library/chip/testing/src/test-helpers.ts
