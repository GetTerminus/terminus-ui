#!/bin/bash

#
# Deploy demos
#

. ~/.bashrc

# Enter the demos repo
cd ui-demos-release || exit

# Remove old demo files
echo "Deleting old demo files:"
find . -regextype posix-extended -regex '.*\.(html|css|js)' -type f -delete

# Go back to the root
cd ../

# Move new files into the cloned repo
mv -f -v "$HOME"/dist/demo/* "$HOME"/ui-demos-release/

# Clone the index.html file as 404.html to support deep linking
cp "$HOME"/ui-demos-release/index.html "$HOME"/ui-demos-release/404.html
