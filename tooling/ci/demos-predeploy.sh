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
mv -f -v dist/demo/* ui-demos-release/

# Clone the index.html file as 404.html to support deep linking
cp ui-demos-release/index.html ui-demos-release/404.html
