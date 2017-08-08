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
npm run semantic-release-pre

echo "BUILD"
npm run build

echo "RUN: npm publish"
npm publish dist/

echo "RUN: semantic-release post"
npm run semantic-release-post

