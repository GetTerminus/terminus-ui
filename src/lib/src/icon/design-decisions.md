<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Icon Design Decisions](#icon-design-decisions)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Icon Design Decisions

1. We are not exposing `MatIconRegistry` to the underlying user. If icons need to be added to our
   set, it should be done at the library level.
