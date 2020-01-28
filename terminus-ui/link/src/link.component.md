<h1>Link</h1>


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Basic usage](#basic-usage)
- [External links](#external-links)
- [Tab index](#tab-index)
- [Local URL fragments](#local-url-fragments)
  - [Router changes to support local links](#router-changes-to-support-local-links)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Basic usage

Wrap your link text and define a destination:

```html
<ts-link
  [destination]="['your', 'path']"
>My link</ts-link>
```


## External links

To signify a link will leave the current app or site, set `external` to true. 
When the destination is a string and contains either `mailto` or `tel`, the external icon would not show.

```html
<ts-link
  [destination]="http://google.com"
  [external]="true"
>My link</ts-link>
```

> NOTE: When external is set to true, the link should be a standard link in string form.


## Tab index

A custom tabindex can also be set:

```html
<ts-link
  [destination]="http://google.com"
  [tabIndex]="2"
>My link</ts-link>
```


## Local URL fragments

Local fragments are supported for deep linking within a page:

```html
<ts-link
  [destination]="['your', 'path']"
  fragment="myFragment"
  [tabIndex]="2"
>My link</ts-link>
<!-- This would route to: `/your/path#myFragment -->
```

If no destination is defined, it will fallback to the local page: `['.']`:

```html
<ts-link
  fragment="myFragment"
  [tabIndex]="2"
>My link</ts-link>
<!-- If used on the route `/my/home`, this would route to: `/my/home#myFragment` -->
```

### Router changes to support local links

There are a couple needed Router configuration changes to support local links:

```typescript
import { NgModule } from '@angular/core';
import {
  ExtraOptions,
  RouterModule,
  Routes,
} from '@angular/router';

const myRoutes: Routes = [...];
const routerOptions: ExtraOptions = {
  anchorScrolling: 'enabled',
  scrollPositionRestoration: 'enabled',
};

@NgModule({
  ...
  imports: [RouterModule.forRoot(myRoutes, routerOptions)],
  ...
})
```

> Learn more about Angular's `ExtraOptions` here: https://angular.io/api/router/ExtraOptions
