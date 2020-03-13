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
# h) Reset git status
#

. ~/.bashrc

# Exit when any command fails
set -e

VERSION_YARN=$(yarn --version)
VERSION_NPM=$(npm --version)
# NOTE: Requiring a space before 'next' ensures we don't match the 'next' version of another branch (eg v10-next)
NEXT_VERSION_STRING="$(yarn tag list @terminus/ui | grep -i " next")}"
# Strip everything except the actual version numbers
VERSION_NUMBER="$(printf "%s\n" "$NEXT_VERSION_STRING" | grep -E -o ' [[:digit:]]+\.[[:digit:]]+\.[[:digit:]]+' | tr -d '[:space:]')"
VERSION_NUMBER_LENGTH=${#VERSION_NUMBER}
PLACEHOLDER="0.0.0-PLACEHOLDER"
SYSTEM_NAME=$(./tooling/ci/report-system-name.sh)


#
# INTRO
#
npx chalk --template "{cyan System: {bold $SYSTEM_NAME}}";
npx chalk cyan "Yarn version: $VERSION_YARN"
npx chalk cyan "Node version: $VERSION_NPM"

#
# Exit if we are not able to find a valid version
#
if [[ $VERSION_NUMBER_LENGTH -lt 2 ]]; then
  npx chalk red "ERROR: No valid version number was found."
  npx chalk --template "{yellow Version found: {bold $VERSION_NUMBER}.}"
  npx chalk --template "{yellow Version number length: {bold $VERSION_NUMBER_LENGTH}.}"
  exit 1;
fi

#
# Promote library version
#
npx chalk blue bold "Promoting version: $VERSION_NUMBER.."
npm dist-tag add @terminus/ui@"$VERSION_NUMBER" latest || {
    npx chalk red "Error promoting version: $VERSION_NUMBER"
    npx chalk -t "{yellow See all versions here: {blue.bold.underline https://www.npmjs.com/package/@terminus/ui?activeTab=versions}}"
    exit 1;
}

#
# Update local library dependency to the latest version
#
npx chalk blue bold "Updating @terminus/ui to the latest release.."
yarn upgrade @terminus/ui

#
# Compile the library
#
npx chalk blue bold "Compiling library.."
yarn run library:build:prod

#
# Remove Yarn link and reinstall dependencies
#
npx chalk blue bold "Installing dependencies to remove yarn link.."
yarn unlink && yarn install --frozen-lockfile

#
# Rename the primary typings file for the library
#
npx chalk blue bold "Renaming typings file.."
tooling/ci/rename-typings-index.sh

#
# Remove existing library files and replace with new files
#
npx chalk blue bold "Removing existing UI Library files from demo node_modules.."
rm -rf node_modules/@terminus/ui/*
npx chalk blue bold "Moving new library files to the demo's node_modules.."
cp -r dist/library/* node_modules/@terminus/ui/

#
# Compile the demo app with AoT
#
npx chalk blue bold "Building the demo app with AoT.."
yarn run demo:build:ci --base-href "https://getterminus.github.io/ui-demos-release/"

#
# Inject the correct library version number into the demo app
#
npx chalk blue bold "Injecting new library version ($VERSION_NUMBER) in demos.."
# Replace the placeholder text with the library version in all demo app files
grep -rl $PLACEHOLDER 'dist/demo' | xargs sed -i'' -e 's|'$PLACEHOLDER'|'"$VERSION_NUMBER"'|g'
# Delete edit reference files left over from the sed replacement
# NOTE: The force flag is required so that the build isn't cancelled if these files don't exist
rm -f dist/demo/*-e

#
# Update the demos GitHub repo
#
# Enter the demos repo
cd ../ui-demos-release || exit

npx chalk blue bold "Pulling the latest demos code.."
git pull git@github.com:GetTerminus/ui-demos-release.git

# Remove old demo files
npx chalk blue bold "Deleting old demo files.."
# NOTE: Mac/Linux support different regex options
if [ "$SYSTEM_NAME" = "Mac" ]; then
  find -E . -regex '.*\.(html|css|js)' -type f -not -path "./node_modules/*" -delete
else
  find . -regextype posix-extended -regex '.*\.(html|css|js)' -type f -not -path "./node_modules/*" -delete
fi

# Move new files into the demos repo
npx chalk blue bold "Moving new demo files into the demos repo.."
mv -f -v ../terminus-ui/dist/demo/* .

# Clone the index.html file as 404.html to support SPA deep links
cp index.html 404.html

#
# Commit and push new demo files
#
npx chalk blue bold "Committing changes.."
git add . && git commit -m "Promoting latest version to @latest"

# Push quietly to prevent showing the token in log
npx chalk blue bold "Pushing changes to GitHub.."
git push -q https://"${GH_TOKEN}"@github.com/GetTerminus/ui-demos-release.git master

# Move back to the UI directory
cd ../terminus-ui || exit

npx chalk green bold "Success!"
npx chalk --template "{green Library version {bold $VERSION_NUMBER} promoted and demos released!}"
npx chalk --template "{yellow UI Library on NPM: {blue.bold.underline https://www.npmjs.com/package/@terminus/ui?activeTab=versions}}"
npx chalk --template "{yellow Live demos: {blue.bold.underline https://getterminus.github.io/ui-demos-release}}"
npx chalk --template "{yellow Changelog: {blue.bold.underline https://github.com/GetTerminus/terminus-ui/blob/release/CHANGELOG.md}}"

# Reset any git changes
git checkout .
