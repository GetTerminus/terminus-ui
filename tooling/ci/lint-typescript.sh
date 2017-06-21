#!/bin/bash

#
# Lint TypeScript
#
# Lint all .ts files
#

# Source Bash
. ~/.bashrc

# Lint the project
npm run lint:ts || {
    echo 'npm run lint:ts failed!' ;
    exit 1;
}

