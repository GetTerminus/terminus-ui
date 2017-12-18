#!/bin/bash

#
# Release a new version of the library
#
# Run semantic-release
# Publish to NPM
#

. ~/.bashrc

cd dist

# Prep the release
./../node_modules/.bin/semantic-release

