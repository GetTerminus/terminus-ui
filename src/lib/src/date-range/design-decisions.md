# Date Range Design Decisions

1. If a selected start date invalidates a previously set end date, the end date should be 'unset'.
  - A user could easily miss the change if the UI updates the end date while the user is focused on
      the start date. Clearing the end date should invalidate their date range which will allow the
      form to direct the user's attention to the empty input.
