# Radio Group design decisions

1. Users cannot tab through a collection of radio buttons. According to the spec, a radio group acts
   as a single form item. See https://stackoverflow.com/a/14322755/722367
    - Users can use `<Tab>` to reach the tab group, then the arrow keys to move between radio
        options.
