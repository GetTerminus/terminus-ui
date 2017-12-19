#!/bin/bash

#
# Release a new version of the library
#
# Run semantic-release
# Publish to NPM
#

. ~/.bashrc

npm install -g semantic-release

# Prep the release
cd dist && npm run semantic-release

