#!/bin/bash

#
# Release a new version of the library
#
# Run semantic-release
# Publish to NPM
#

. ~/.bashrc

# Prep the release
yarn run semantic-release

PACKAGE_VERSION=$(cat dist/package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g')

echo "PACKAGE VERSION: " $PACKAGE_VERSION

# Publish
npm publish dist

