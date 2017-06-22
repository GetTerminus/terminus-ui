#!/bin/bash

#
# Release
# Note: Currently `yarn publish` hangs (known issue) 4.4.17
#
# If the branch is master and it is not a pull request - publish
# If the branch is NOT master and the tag matches the feature format - publish with feature tag
#

. ~/.bashrc

echo Branch: $BRANCH;
echo Tag: $CIRCLE_TAG;

# If branch is master and NOT a PR
if [ "$BRANCH" == "master" && "$PULL_REQUEST" == "false" ]; then
  echo "Branch is master. Running Semantic Release"

  # Run semantic release
  (npm run semantic-release) || (echo No release needed.);
fi




# If branch is not master & tag matches f0.0.0 or f0.0.0-0 format
if [ "$BRANCH" != "master" && $CIRCLE_TAG =~ ^f[0-9]+(\.[0-9]+)*(-[0-9]+)? ]; then
  echo "Branch is NOT master. Tag matches a feature release."

  export PACKAGE_VERSION=$(node -p -e "require('./package.json').version")
  export PACKAGE_NAME=$(node -p -e "require('./package.json').name")

  # Manually publish to npm with the feature tag
  echo "Manually tagging for NPM";
  npm dist-tag add $PACKAGE_NAME@$PACKAGE_VERSION $CIRCLE_TAG;
fi

