#!/bin/bash

#
# a) Promote the latest @next NPM tag to @latest
# b) Install new dependencies
# c) Deploy updated demos
#

. ~/.bashrc

# NOTE: Requiring a space before 'next' ensures we don't match the 'next' version of another branch (eg v10-next)
#NEXT_VERSION_STRING="$(yarn tag list @terminus/ui | grep -i " next")}"
NEXT_VERSION_STRING="15.3.5"

# Strip everything except the actual version numbers
VERSION_NUMBER="$(echo "$NEXT_VERSION_STRING" | egrep -o ' [[:digit:]]+\.[[:digit:]]+\.[[:digit:]]+' | tr -d '[:space:]')"

#echo "Promoting version: $VERSION_NUMBER"
#npm dist-tag add @terminus/ui@"$VERSION_NUMBER" latest || {
#    echo "Error promoting version: $VERSION_NUMBER";
#    exit 1;
#}

echo "Updating dependencies:"
yarn upgrade @terminus/ui || {
    echo "Error upgrading the library";
    exit 1;
}

echo "Compiling library:"
yarn run build || {
    echo "Error compiling the library";
    exit 1;
}

echo "Renaming typings file:"
/bin/bash/ /tooling/ci/rename-typings-index.sh || {
    echo "Error renaming the primary typings file";
    exit 1;
}

echo "Compiling demos:"
/bin/bash/ /tooling/ci/build-demos-aot.sh || {
    echo "Error compiling the demos";
    exit 1;
}

echo "Injecting new library version in demos:"
/bin/bash/ /tooling/ci/inject-library-version-number.sh || {
    echo "Error injecting the updated version number";
    exit 1;
}

echo "Cloning the demos repo:"
git clone git@github.com:GetTerminus/ui-demos-release.git

# Enter the demos repo
cd ../ui-demos-release || exit

# Remove old demo files
echo "Deleting old demo files:"
find . -regextype posix-extended -regex '.*\.(html|css|js)' -type f -delete

# Move new files into the cloned repo
mv -f -v ../terminus-ui/dist/app/* .

# Clone the index.html file as 404.html to support SPA deep links
cp index.html 404.html

# Commit new files
echo "Commiting changes:"
git add .
git commit -m "Promoting latest version to @latest"

# Push quietly to prevent showing the token in log
#echo "Pushing changes:"
#git push -q https://@github.com/GetTerminus/ui-demos-release.git master

# Move back to the UI directory
cd ../terminus-ui || exit
