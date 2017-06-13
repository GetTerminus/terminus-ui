#!/bin/bash

#
# Run Unit Tests
#
# Run all unit tests
# Upload coverage to CodeCov
#

. ~/.bashrc

# Run tests
yarn run test:ci || {
    echo 'yarn run test:ci failed!';
    exit 1;
}

# Remap coverage to source files
node_modules/.bin/remap-istanbul -i coverage/coverage-final.json -o coverage/coverage-mapped.json || {
    echo 'Remapping coverage failed!' ;
    exit 1;
}

