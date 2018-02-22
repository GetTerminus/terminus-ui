<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Radio Group design decisions](#radio-group-design-decisions)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Radio Group design decisions

1. Users cannot tab through a collection of radio buttons. According to the spec, a radio group acts
   as a single form item. See https://stackoverflow.com/a/14322755/722367
    - Users can use `<Tab>` to reach the tab group, then the arrow keys to move between radio
        options.
