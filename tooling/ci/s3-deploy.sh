#!/bin/bash

#
# Deploy documentation and demos to S3
#
#

. ~/.bashrc

echo 'Current Branch: ' $CIRCLE_BRANCH

# Docs and demos will only deploy when merging to one of these branches
releaseBranches=("master" "8.x.x" "9.x.x" "10.x.x" "11.x.x")


# Only release docs and demos to S3 if this is a release branch
if [[ " ${releaseBranches[@]} " =~ " ${CIRCLE_BRANCH} " ]]; then
  aws s3 sync docs s3://uilibrary-docs.terminus.ninja/${CIRCLE_BRANCH}/ --delete

  # Before deploying the demo, we need to update the base URL
  sed -i '' -e "s:\"/\":\"/${CIRCLE_BRANCH}/\":g" dist/app/index.html
  aws s3 sync dist/app s3://uilibrary-demo.terminus.ninja/${CIRCLE_BRANCH}/ --delete
else
  echo "Branch is not a release branch. Skipping documentation and demo release."
  echo "Valid release branches:  ${releaseBranches[*]}"
fi
