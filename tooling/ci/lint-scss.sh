#!/bin/bash

#
# Lint stylesheets
#
# Lint all SCSS stylesheets
#

# Source Bash
. ~/.bashrc

# Lint the project
npm run lint:scss || {
    echo 'npm run lint:styles failed!' ;
    exit 1;
}
