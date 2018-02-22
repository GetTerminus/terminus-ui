<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [tabindex](#tabindex)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## tabindex

Because of an odd focus bug when clicking on an input component, we must define the `tabindex`
twice. Notice the difference: `tabindex` vs `tabIndex`. The all-lowercase version is the actual HTML
attribute while `tabIndex` is an `@Input` for the custom component.

```html
<ts-input
  tabindex="-1"
  tabIndex="4"
></ts-input>
```

This causes the custom containing element to have a negative `tabindex` so that it cannot receive
focus. Then the `@Input` value is passed on to the actual input element as the true `tabindex`.
