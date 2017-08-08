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

echo "BUILD"
npm run build

echo "RUN: get PRIMARY package version"
PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g')
echo "PRIMARY VERSION: ${PACKAGE_VERSION}"

#echo "CD: into dist"
#cd dist/

#echo "RUN: pack"
#npm pack

#echo "List files"
#ls -a

echo "RUN: get DIST package version"
PACKAGE_VERSION=$(cat dist/package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g')
echo "DIST VERSION: ${PACKAGE_VERSION}"

#echo "CD: out of dist"
#cd ../

echo "RUN: npm publish"
npm publish dist/

echo "RUN: semantic-release post"
npm run semantic-release-post


# Run tests
#npm run semantic-release || {
    #echo 'No release needed.';
    #exit 0;
#}

