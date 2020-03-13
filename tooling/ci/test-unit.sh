#!/bin/bash

#
# Run Unit Tests
#
# Run all unit tests
# Upload coverage to CodeCov
#

. ~/.bashrc

# Run tests
yarn run library:test:ci || {
    echo 'yarn run library:test:ci failed!';
    exit 1;
}

# Upload coverage report
bash <(curl -s https://codecov.io/bash)

