#### Event driven

Pass in an array of items and listen for change events:

```html
<ts-radio-group
  [options]="items | async"
  (change)="selected($event)"
></ts-radio-group>
```

```typescript
items = of([
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
    [options]="items | async"
    [formControl]="myForm.get('myRadioGroup')"
  ></ts-radio-group>

  <button (click)="submit(myForm.value)">Submit</button>
</form>
```

```typescript
items = of([
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
myForm = this.formBuilder.group({
  myRadioGroup: [
    null,
    [
      Validators.required,
    ],
  ],
});
```
