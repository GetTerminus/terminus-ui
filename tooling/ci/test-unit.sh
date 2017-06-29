#!/bin/bash

#
# Run Unit Tests
#
# Run all unit tests
# Upload coverage to CodeCov
#

. ~/.bashrc

# Run tests
npm run test:ci || {
    echo 'npm run test:ci failed!';
    exit 1;
}

# Convert coverage format
# TODO: Test without this conversion to see if CodeCov needs it. Currently it looks as though they
# are consuming both reports
#node tooling/convert-coverage-results.js

# Upload coverage report
bash <(curl -s https://codecov.io/bash)

