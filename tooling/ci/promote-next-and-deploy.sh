#!/bin/bash

# Promote the current @next library version to @latest, update & deploy demos
#
# NOTE: This script expects the `terminus-ui` repo and the `ui-demos-release` repo to be siblings directories.
# NOTE: This is meant to be used locally from the repo root - not on CI.
#
# USAGE:
# @example
#   # Pass your GitHub token as `GH_TOKEN` with the call:
#   $ GH_TOKEN=[YOUR_TOKEN] tooling/ci/promote-next-and-deploy.sh
#
# Steps:
# a) Promote the latest @next NPM tag to @latest
# b) Install new dependencies
# c) Compile the library
# d) Rename primary typings file
# e) Compile the demos
# f) Inject new version number
# g) Deploy updated demos
#

. ~/.bashrc

# NOTE: Requiring a space before 'next' ensures we don't match the 'next' version of another branch (eg v10-next)
NEXT_VERSION_STRING="$(yarn tag list @terminus/ui | grep -i " next")}"
# Strip everything except the actual version numbers
VERSION_NUMBER="$(echo "$NEXT_VERSION_STRING" | egrep -o ' [[:digit:]]+\.[[:digit:]]+\.[[:digit:]]+' | tr -d '[:space:]')"
VERSION_NUMBER_LENGTH=${#VERSION_NUMBER}
PLACEHOLDER="0.0.0-PLACEHOLDER"

# Exit if we weren't able to find a valid version
if [[ $VERSION_NUMBER_LENGTH < 2 ]]; then
  echo "ERROR: No valid version number was found."
  echo "Version found: '$VERSION_NUMBER'."
  echo "Version number length: $VERSION_NUMBER_LENGTH."
  exit 1;
fi

echo "Promoting version: '$VERSION_NUMBER'"
npm dist-tag add @terminus/ui@"$VERSION_NUMBER" latest || {
    echo "Error promoting version: $VERSION_NUMBER";
    exit 1;
}

echo "Updating @terminus/ui to the latest release."
yarn upgrade @terminus/ui || {
    echo "Error upgrading the library";
    exit 1;
}

echo "Compiling library."
yarn run build || {
    echo "Error compiling the library";
    exit 1;
}

echo "Renaming typings file."
tooling/ci/rename-typings-index.sh || {
    echo "Error renaming the primary typings file";
    exit 1;
}

echo "Compiling demos."
tooling/ci/build-demos-aot.sh || {
    echo "Error compiling the demos";
    exit 1;
}

echo "Injecting new library version ($VERSION_NUMBER) in demos."

# Replace the placeholder text with the library version in all demo app files
grep -rl $PLACEHOLDER 'dist/app' | xargs sed -i'' -e 's|'$PLACEHOLDER'|'"$VERSION_NUMBER"'|g'
# Delete edit reference files left over from the sed replacement
# NOTE: The force flag is required so that the build isn't cancelled if these files don't exist
rm -f dist/app/*-e

# Enter the demos repo
cd ../ui-demos-release || exit

echo "Pulling the latest demos code."
git pull git@github.com:GetTerminus/ui-demos-release.git

# Remove old demo files
echo "Deleting old demo files."
find . -regextype posix-extended -regex '.*\.(html|css|js)' -type f -delete

# Move new files into the demos repo
mv -f -v ../terminus-ui/dist/app/* .

# Clone the index.html file as 404.html to support SPA deep links
cp index.html 404.html

# Commit new files
echo "Commiting changes."
git add . && git commit -m "Promoting latest version to @latest"

# Push quietly to prevent showing the token in log
echo "Pushing changes:"
git push -q https://"${GH_TOKEN}"@github.com/GetTerminus/ui-demos-release.git master

# Move back to the UI directory
cd ../terminus-ui || exit
