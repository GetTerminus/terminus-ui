#!/bin/bash

#
# Run Unit Tests
#
# Run all unit tests
# Upload coverage to CodeCov
#

. ~/.bashrc

#echo "Copy git repo"
#cp -R ./.git ./dist/.git

echo "RUN: semantic-release pre"
npm run semantic-release-pre

echo "CD: into dist"
cd dist/

echo "RUN: pack"
npm pack

echo "RUN: get version"
version=node -p "require('./package.json').version"
echo "VERSION: ${version}"

echo "CD: out of dist"
cd ../

echo "RUN: npm publish"
npm publish

echo "RUN: semantic-release post"
npm run semantic-release-post


# Run tests
#npm run semantic-release || {
    #echo 'No release needed.';
    #exit 0;
#}

