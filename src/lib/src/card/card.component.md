## Basic usage

Wrap the card component around your content:

```html
<ts-card>
  Here is my content!
</ts-card>
```

#### Interactivity

To make the card feel interactive, pass `true` to the `supportsInteraction` input.

```html
<ts-card supportsInteraction="true">
  Now my card responds to hover and click!
</ts-card>
```

#### Centered content

To center the content, pass `true` to the `centeredContent` input.

```html
<ts-card centeredContent="true">
  Now my content is centered!
</ts-card>
```

#### Aspect ratio

Pass your desired aspect ratio in the format `3:4` to the `aspectRatio` input.

```html
<ts-card aspectRatio="16:9">
  Here is a card with a fixed aspect ratio!
</ts-card>
```

#### Utility menu

To include a utility menu, pass a template which includes the menu trigger and the menu contents.

```html
<!-- This template name should point to the ng-template -->
<ts-card [utilityMenuTemplate]="myTemplate">
  Here is a card with a utility menu!
</ts-card>

<ng-template #myTemplate>
  <!-- Include the trigger to open/close the menu -->
  <!-- Reference the ng-template for the menu content in `menuItemsTemplate` -->
  <ts-menu
    triggerType="utility"
    menuPositionX="before"
    [menuItemsTemplate]="utilityButtons"
  ></ts-menu>


  <!-- This template includes all items that should appear in the menu -->
  <ng-template #utilityButtons>
    <ts-link [destination]="['foo/', 'bar/']">
      My link
    </ts-link>
  </ng-template>
</ng-template>
```
