#!/bin/bash

#
# Unit Tests
#
# Run all unit tests
#

. ~/.bashrc

# Run tests
yarn run test:ci || {
    echo 'yarn run test:ci failed!';
    exit 1;
}
