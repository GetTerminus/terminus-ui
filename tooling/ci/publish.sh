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

PACKAGE_VERSION=$(cat dist/package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g')

echo $PACKAGE_VERSION

echo "BUILD"
yarn run build

# Currently, yarn publish requires user interaction:
# https://github.com/yarnpkg/yarn/issues/610#issuecomment-298116487
echo "RUN: npm publish"
npm publish

echo "RUN: semantic-release post"
yarn run semantic-release-post || {
  echo 'Error creating release notes';
}

