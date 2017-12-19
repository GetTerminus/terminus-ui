#!/bin/bash

#
# Release a new version of the library
#
# Run semantic-release
# Publish to NPM
#

. ~/.bashrc

npm install -g semantic-release-cli

# Prep the release
cd dist && semantic-release

