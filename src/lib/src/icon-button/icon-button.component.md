## Basic usage

Pass a valid [Material icon][material-icons] name as the content of the button:

```html
<ts-icon-button (click)="myMethod()">delete_forever</ts-icon-button>
```


#### Theme (color)

Use the `theme` parameter to change the color.

```html
<!-- Will be colored with the 'primary' color -->
<ts-icon-button theme="primary">forum</ts-icon-button>

<!-- Will be colored with the 'accent' color -->
<ts-icon-button theme="accent">forum</ts-icon-button>

<!-- Will be colored with the 'warn' color -->
<ts-icon-button theme="warn">forum</ts-icon-button>
```
> By default the icon will use `color(pure, dark)`


#### Accessibility

For accessibility purposes we should set the `actionName` and `buttonType`.

1. `actionName` can be one of the `TsButtonActionTypes` and will be used for the `aria-label`.
1. `buttonType` can be one of the `TsButtonFunctionTypes` and will be used for the `type` attribute.

```html
<ts-icon-button
  actionName="Menu"
  buttonType="button"
  (click)="myMethod()"
>bookmark</ts-icon-button>
```


<!-- Links -->
[material-icons]: https://material.io/icons/
