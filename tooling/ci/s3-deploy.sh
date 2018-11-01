#!/bin/bash

#
# Deploy documentation and demos to S3
#
#

. ~/.bashrc

echo 'BRANCH: ' $CIRCLE_BRANCH

releaseBranches=("master" "8.x.x" "9.x.x" "10.x.x")

# Only release docs and demos to S3 if this is a release branch
if [[ " ${releaseBranches[@]} " =~ " ${CIRCLE_BRANCH} " ]]; then
  aws s3 sync docs s3://uilibrary-docs.terminus.ninja/${CIRCLE_BRANCH}/ --delete --dryrun
  aws s3 sync dist s3://uilibrary-demo.terminus.ninja/${CIRCLE_BRANCH}/ --delete --dryrun
else
  echo "Branch is not a release branch. Skipping documentation and demo release."
  echo "Valid release branches:  ${releaseBranches[*]}"
fi
