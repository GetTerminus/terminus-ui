#!/bin/bash

#
# Lint stylesheets
#
# Lint all SCSS stylesheets
#

# Source Bash
. ~/.bashrc

# Lint the project
yarn run lint:scss || {
    echo 'yarn run lint:styles failed!' ;
    exit 1;
}
