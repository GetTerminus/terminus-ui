<h1>Autocomplete</h1>

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Basic usage with a FormControl](#basic-usage-with-a-formcontrol)
- [Allow multiple selections](#allow-multiple-selections)
- [Seed selected values](#seed-selected-values)
- [Show the progress indicator](#show-the-progress-indicator)
- [Customize how the selected value is displayed](#customize-how-the-selected-value-is-displayed)
- [Event driven](#event-driven)
- [Show a 'no results' validation error](#show-a-no-results-validation-error)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Basic usage with a FormControl

a) Pass an array of available options in. These are the options displayed to the user in the
   dropdown.
b) Create a local reference to the autocomplete component.

```html
<!-- The TsAutocompleteComponent is exported as `tsAutocomplete` -->
<ts-autocomplete
  [options]="users$ | async"
  [showProgress]="inProgress"
  #auto="tsAutocomplete"
></ts-autocomplete>
```

c) Subscribe to the `query` events coming from the autocomplete. This is a stream of query strings
entered by the user. This stream is debounced and de-duped by default.

```typescript
interface OptionType {
  id: string;
  login: string;
  [key: string]: any;
}

// Create a reference to the autocomplete and pass in a typing for the options
@ViewChild('auto')
public auto: TsAutocompleteComponent<OptionType>;

this.users$ = this.auto
  .query
  .pipe(
    startWith(null),
    switchMap((term) => {
      // Only hit the API if a query was sent in
      if (term) {
        // Start the progress indicator
        this.inProgress = true;
        // Hit the API with the query
        return this.http.get(`${GITHUB_API_ENDPOINT}/search/users?q=${term}`)
          .pipe(
            map((response: Response) => {
              // Stop the progress indicator
              this.inProgress = false;
              return response['items'];
            }),
          )
      } else {
        // If no query was passed in, reset the search results and stop the progress indicator
        this.inProgress = false;
        return of([]);
      }
    }),
  )
;
```

> Change the debounce delay by setting `debounceDelay`.


## Allow multiple selections

To allow multiple selections, pass in a comparator function. This function should match the type {@link TsAutocompleteComparatorFn} which has the basic signature of `(v: any) => string`.

```html
<ts-autocomplete
  [options]="users$ | async"
  multiple="(v) = v.id"
></ts-autocomplete>
```

This comparator function will be used by the autocomplete to determine if a selection is a
duplicate. It is also used as the `trackBy` function when looping through options.


## Seed selected values

To seed initial values, pass the array of selections to `initialSelections`:

```html
<ts-autocomplete
  [options]="users$ | async"
  initialSelections="[{}, {}..]"
  multiple="(v) = v.id"
></ts-autocomplete>
```


## Show the progress indicator

Show a progress indicator by toggling the `showProgress` value:

```html
<ts-autocomplete
  [showProgress]="isInProgress"
></ts-autocomplete>
```

```typescript
this.isInProgress = true;
```


## Customize how the selected value is displayed

The UI display of selected options can be changed by passing in a custom `displayWith` function.
This function should match {@link TsAutocompleteFormatterFn} which has the signature of `(v) =>
string`;

```html
<!-- Display the user's login name within the selection chip -->
<ts-autocomplete
  displayWith="(v) => v.login"
></ts-autocomplete>
```


## Event driven

If a `FormControl` isn't needed, you can subscribe to events directly:

```html
<ts-autocomplete
  (optionSelected)="added($event)"
  (optionRemoved)="removed($event)"
  (selection)="change($event)"
></ts-autocomplete>
```

```typescript
added(chip) {
  console.log('Selection made!', chip);
}

removed(chip) {
  console.log('Selection removed!', chip);
}

change(selections) {
  console.log('Selection was changed!', selections);
}
```


## Show a 'no results' validation error

If no results are found, set a validation error on the `FormControl`:

```html
<ts-autocomplete
  [options]="users$ | async"
  #auto="tsAutocomplete"
></ts-autocomplete>
```

```typescript
this.users$ = this.auto
  .query
  .pipe(
    startWith(null),
    switchMap((term) => {
      if (term) {
        // Hit the API with the query
        return this.http.get(`${GITHUB_API_ENDPOINT}/search/users?q=${term}`)
          .pipe(
            map((response: Response) => {
              const items = response['items'];

              // If no results are found, notify the user via a validation message
              if (items.length < 1) {
                const invalidResponse: ValidationErrors = {
                  noResults: {
                    valid: false,
                  },
                };

                // Set the validation error
                this.myForm.get('selections').setErrors(invalidResponse);
                // Mark the control as touched so the validations are triggered
                this.myForm.get('selections').markAsTouched();
              }
              return items;
            }),
          )
      } else {
        return of([]);
      }
    }),
  )
;
```
