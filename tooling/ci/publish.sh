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

echo "Run semantic-release pre"
npm run semantic-release-pre

cd dist/
npm pack
cd ../

npm publish

# Run tests
#npm run semantic-release || {
    #echo 'No release needed.';
    #exit 0;
#}

echo "Run semantic-release post"
npm run semantic-release-post
