<h1>Link</h1>


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Basic usage](#basic-usage)
- [External links](#external-links)
- [Tab index](#tab-index)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Basic usage

Wrap your link text and define a destination:

```html
<ts-link
  [destination]="['your/', 'path/']"
>My link</ts-link>
```


## External links

To signify a link will leave the current app or site, set `external` to true:

```html
<ts-link
  [destination]="http://google.com"
  external="true"
>My link</ts-link>
```

> NOTE: When external is set to true, the link should be a standard link in string form.


## Tab index

A custom tabindex can also be set:

```html
<ts-link
  [destination]="http://google.com"
  tabIndex="2"
>My link</ts-link>
```

