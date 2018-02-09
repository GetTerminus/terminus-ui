## Basic usage

Wrap your label text inside the component:

```html
<ts-checkbox>
  My checkbox label
</ts-checkbox>
```


#### Reactive Forms

To use the checkbox with a reactive form, pass the `formControl` to the checkbox:

```html
<ts-checkbox [formControl]="myForm.get('myControl')">
  I will be checked if `myControl.value` is true.
</ts-checkbox>
```


#### `ngModel`

To use the checkbox with Angular's `ngModel`, just attach the directive to the checkbox:

```html
<ts-checkbox [(ngModel)]="myValue">
  I will be checked if `myValue` is true.
</ts-checkbox>
```


#### `isChecked`

To seed the initial checked state use the `isChecked` property:

```html
<ts-checkbox isChecked="true">
  I will be checked by default!
</ts-checkbox>
```

> NOTE: This should rarely be used (if ever). We should be relying on a Reactive Form or ngModel.

