#!/bin/bash

#
# Run all commands to trigger a release
#
# Run semantic release pre (this sets the correct package.json version)
# Build (this moves the updated package.json to dist)
# Publish
# Run semantic release post (generates release notes)
#

. ~/.bashrc

echo "RUN: semantic-release pre"
yarn run semantic-release-pre || {
  echo 'No release needed.';
  exit 0;
}

echo "BUILD"
yarn run build

echo "RUN: npm publish"
yarn publish dist/

echo "RUN: semantic-release post"
yarn run semantic-release-post || {
  echo 'Error creating release notes';
}

