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

echo 'Tag: ' $CIRCLE_TAG
echo 'Build Number: ' $CIRCLE_BUILD_NUM

echo 'Job Type' $CIRCLE_JOB
echo 'Compare URL' $CIRCLE_COMPARE_URL
echo 'Pull Request' $CIRCLE_PULL_REQUEST
echo 'Build Number' $CIRCLE_BUILD_NUM
echo 'Build URL' $CIRCLE_BUILD_URL
echo 'Branch' $CIRCLE_BRANCH
echo 'Node total' $CIRCLECI_NODE_TOTAL

echo "Copy git repo"
cp -R ./.git ./build/.git

# Run tests
npm run semantic-release || {
    echo 'No release needed.';
    exit 0;
}
