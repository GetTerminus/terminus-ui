#!/bin/bash

#
# Run Unit Tests
#
# Run all unit tests
# Upload coverage to CodeCov
#

. ~/.bashrc

echo "Copy git repo"
cp -R ./.git ./dist/.git

cd dist/
npm pack
cd ../

# Run tests
npm run semantic-release || {
    echo 'No release needed.';
    exit 0;
}
