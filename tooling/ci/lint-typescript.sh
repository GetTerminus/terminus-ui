#!/bin/bash

#
# Lint TypeScript
#
# Lint all .ts files
#

# Source Bash
. ~/.bashrc

# Lint the project
yarn run lint:ts || {
    echo 'yarn run lint:ts failed!' ;
    exit 1;
}
