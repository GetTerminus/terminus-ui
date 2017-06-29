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

# Upload coverage report
bash <(curl -s https://codecov.io/bash)

