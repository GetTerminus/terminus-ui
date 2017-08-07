#!/bin/bash

#
# Run Unit Tests
#
# Run all unit tests
# Upload coverage to CodeCov
#

. ~/.bashrc

echo "Circle Tag: ${CIRCLE_TAG}"
echo "Tag: ${TAG}"
echo "Branch: ${CIRCLE_BRANCH}"
echo "Token: ${NPM_TOKEN}"

# Run tests
npm run semantic-release || {
    echo 'No release needed.';
    exit 0;
}
