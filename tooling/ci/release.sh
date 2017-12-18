#!/bin/bash

#
# Release a new version of the library
#
# Run semantic-release
# Publish to NPM
#

. ~/.bashrc

# Move to dist
cd dist/

# Prep the release
yarn run semantic-release

