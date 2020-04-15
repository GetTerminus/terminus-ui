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

echo "CURRENT PATH:"
pwd

# Move new files into the cloned repo
mv -f -v ../dist/demo/* .

# Clone the index.html file as 404.html to support deep linking
cp index.html 404.html

# Update git credentials
git config credential.helper 'cache --timeout=120'
git config user.email "devops@terminus.com"
git config user.name "terminus-devops"

# Commit new files
git add .
git commit -m "Update via CircleCI: release"

# Push quietly to prevent showing the token in log
git push -q https://"${GH_TOKEN}"@github.com/GetTerminus/ui-demos-release.git master
