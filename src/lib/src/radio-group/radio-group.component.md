#### Event driven

Pass in an array of items and listen for change events:

```html
<ts-radio-group
  [options]="items$ | async"
  (change)="selected($event)"
></ts-radio-group>
```

```typescript
items$ = of([
  {
    value: 'foo',
    displayValue: 'Foo',
  },
  {
    value: 'bar',
    displayValue: 'Bar',
    disabled: true,
  },
  {
    value: 'baz',
    displayValue: 'Baz',
    required: true,
    checked: true,
  },
]);
```


#### Reactive form driven

Pass in an array of items and pass in the form control:

```html
<form [formGroup]="myForm" novalidate>
  <ts-radio-group
    [options]="items$ | async"
    [formControl]="myForm.get('myRadioGroup')"
  ></ts-radio-group>

  <button (click)="submit(myForm.value)">Submit</button>
</form>
```

Since we can set the default value in the form control, we do not need to add the `checked` property
to any or our items.

```typescript
items$ = of([
  {
    value: 'foo',
    displayValue: 'Foo',
  },
  {
    value: 'bar',
    displayValue: 'Bar',
    disabled: true,
  },
  {
    value: 'baz',
    displayValue: 'Baz',
    required: true,
  },
]);
myForm = this.formBuilder.group({
  myRadioGroup: [
    'bar',
    [
      Validators.required,
    ],
  ],
});
```

> NOTE: If you mark an item as `checked` you do not need to set the value in the form control. The
> `TsRadioGroupComponent` will find the checked item and update the form control.
