#!/bin/bash

#
# Run Unit Tests
#
# Run all unit tests
# Upload coverage to CodeCov
#

. ~/.bashrc

# Prep the CodeClimate reporter that a report is about to happen
./cc-test-reporter before-build

# Run tests
yarn run test:ci || {
    echo 'yarn run test:ci failed!';
    exit 1;
}

# Convert coverage format
node tooling/convert-coverage-results.js

# Tell the reporter that the reports are finished
./cc-test-reporter after-build --exit-code $?

