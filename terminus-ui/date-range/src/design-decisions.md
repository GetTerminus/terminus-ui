<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Date Range Design Decisions](#date-range-design-decisions)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Date Range Design Decisions

1. While the component dynamically sets/unsets the startMax and endMin based on any existing date
   range, we cannot enforce validation internally. When setting validators on a FormControl _all_
   validators are removed/replaced. This means that we would be removing any validators set by the
   consumer. Because of this, while we expose the needed validator, we leave the implementation up
   to the consumer.
