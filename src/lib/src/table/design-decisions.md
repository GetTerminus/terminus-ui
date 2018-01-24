# Table design decisions


### Column Sorting

Currently we only allow sorting by a single column. UX had no reasonable use-case for multi-column
sorting. Their preference was to minimize the functionality of the table - we do not want to
recreate a spreadsheet.


### Row Selection

Row selection (single or multiple) is not implemented. UX needs a better use-case for this need
before we take the time to build it in.
