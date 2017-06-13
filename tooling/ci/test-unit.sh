#!/bin/bash

#
# Run Unit Tests
#
# Run all unit tests
# Upload coverage to CodeCov
#

. ~/.bashrc

# Run tests
#yarn run test:ci || {
    #echo 'yarn run test:ci failed!';
    #exit 1;
#}

echo 'Testing currently disabled';

# Upload coverage report
# TODO: Hook up coverage service
#bash <(curl -s https://codecov.io/bash)
