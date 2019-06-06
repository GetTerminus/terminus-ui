#!/bin/bash

#
# Deploy demos to S3
#
#

. ~/.bashrc

echo 'Current Branch: ' $CIRCLE_BRANCH

# Demos will only deploy when merging to one of these branches:
releaseBranches=("release" "8.x.x" "9.x.x" "10.x.x" "11.x.x" "12.x.x" "13.x.x")


# Only publish demos if this is a release branch
if [[ " ${releaseBranches[@]} " =~ " ${CIRCLE_BRANCH} " ]]; then

  # Clone the demo repo
  cd $HOME
  git clone git@github.com:GetTerminus/ui-demos-$CIRCLE_BRANCH.git
  cd ui-demos-$CIRCLE_BRANCH

  # Move new files into the cloned repo
  mv -f -v $HOME/ci-build/dist/app/* $HOME/ui-demos-$CIRCLE_BRANCH/

  # Clone the index.html file as 404.html to support deep linking
  cp $HOME/ui-demos-$CIRCLE_BRANCH/index.html $HOME/ui-demos-$CIRCLE_BRANCH/404.html

  # Update git credentials
  git config credential.helper 'cache --timeout=120'
  git config user.email "ben@benjamincharity.com"
  git config user.name "benjamincharity"

  # Commit new files
  git add .
  git commit -m "Update via CircleCI: ${CIRCLE_BRANCH}"

  # Push quietly to prevent showing the token in log
  git push -q https://${GH_TOKEN}@github.com/GetTerminus/ui-demos-${CIRCLE_BRANCH}.git master
else
  echo "Branch '${CIRCLE_BRANCH}' is not a release branch. Skipping demo release."
  echo "Valid release branches:  ${releaseBranches[*]}"
fi
