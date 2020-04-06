#
# Deploy demos
#

. ~/.bashrc

# Clone the demo repo
cd "$HOME" || exit
# HACK: Avoid hosts unknown for GitHub: https://discuss.circleci.com/t/git-clone-fails-in-circle-2-0/15211
mkdir ~/.ssh/ && echo -e "Host github.com\n\tStrictHostKeyChecking no\n" > ~/.ssh/config
git clone git@github.com:GetTerminus/ui-demos-release.git

# Enter the demos repo
cd ui-demos-release || exit

# Remove old demo files
echo "Deleting old demo files:"
find . -regextype posix-extended -regex '.*\.(html|css|js)' -type f -delete

# Move new files into the cloned repo
mv -f -v "$HOME"/ci-build/dist/demo/* "$HOME"/ui-demos-release/

# Clone the index.html file as 404.html to support deep linking
cp "$HOME"/ui-demos-release/index.html "$HOME"/ui-demos-release/404.html

# Update git credentials
git config credential.helper 'cache --timeout=120'
git config user.email "ben@benjamincharity.com"
git config user.name "benjamincharity"

# Commit new files
git add .
git commit -m "Update via CircleCI: release"

# Push quietly to prevent showing the token in log
git push -q https://"${GH_TOKEN}"@github.com/GetTerminus/ui-demos-release.git master
