#!/bin/bash

#
# Upload coverage reports to Codacy
#

. ~/.bashrc


# Upload coverage report
cat ./coverage/lcov.info | npx codacy-coverage --language typescript --token $CODACY_ACCOUNT_TOKEN --username Terminus --projectName terminus-ui || {
    echo 'Codacy upload failed!';
    exit 1;
}
