<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Table design decisions](#table-design-decisions)
  - [Column Sorting](#column-sorting)
  - [Row Selection](#row-selection)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Table design decisions


### Column Sorting

Currently we only allow sorting by a single column. UX had no reasonable use-case for multi-column
sorting. Their preference was to minimize the functionality of the table - we do not want to
recreate a spreadsheet.


### Row Selection

Row selection (single or multiple) is not implemented. UX needs a better use-case for this need
before we take the time to build it in.

This can be added by the consumer fairly easily.
