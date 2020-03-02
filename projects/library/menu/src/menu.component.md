<h1>Menu</h1>


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Basic Usage](#basic-usage)
- [Checkbox menu](#checkbox-menu)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Basic Usage

```html
<!-- Define the menu component. This will be the trigger to open the menu -->
<ts-menu [menuItemsTemplate]="myTemplate">
  Select Item
</ts-menu>

<!-- Define a template for the dropdown panel and pass it to `[menuItemsTemplate]` above -->
<ng-template #myTemplate>
  <ts-button (clicked)="customItemSelected('yup')">
    Roger, Roger.
  </ts-button>

  <ts-link [destination]="'foo/'">
    A tasty link
  </ts-link>
</ng-template>
```

This allows all selection functionality to be handled by the consuming application rather than being
proxied through event emitters.

> NOTE: `<ts-link>` and `<ts-button>` will be styled the same within a menu.


## Checkbox menu

> This is very similar to the basic usage example, with a few small, key differences.

Create the form and array of possible options:

```typescript
// The list of column names to show in the UI
columns = [
  'Title',
  'Account',
  'Budget',
  'Enabled',
];
// We are creating a form array with 4 controls all defaulted to 'true'
myForm = this.formBuilder.group({
  showColumns: this.formBuilder.array([true, true, true, true]),
});
```

Create the menu trigger and the dropdown contents:

```html
<!-- Define the menu component. This will be the trigger to open the menu -->
<ts-menu [menuItemsTemplate]="myTemplate">
  Select Item
</ts-menu>

<!-- Define a template for the dropdown panel and pass it to `[menuItemsTemplate]` above -->
<ng-template #myTemplate>
  <form [formGroup]="myForm">
    <!-- Loop through the array of form controls -->
    <ng-container *ngFor="let control of myForm.controls['showColumns'].controls; let i = index">
      <!-- The menu normally closes after each interaction, so we need to stop propagation here to
      support multiple selections while open -->
      <ts-checkbox [formControl]="control" (click)="$event.stopPropagation()">
        <!-- Use the index from the loop to get the appropriate UI text from our array -->
        {{ columns[i] }}
      </ts-checkbox>
    </ng-container>
  </form>
</ng-template>
```

> NOTE: In this example, the form is stand-alone so the entire form is nested inside the menu
> template. If this were part of a larger form, the form element would be higher in the DOM
> hierarchy.
