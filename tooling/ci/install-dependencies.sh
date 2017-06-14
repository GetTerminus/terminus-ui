#!/bin/bash

#
# Install dependencies
#
# 1) Fix export paths for CircleCI
# 2) Install all project dependencies
#

# Add all needed paths
# FIXME: This should not be needed since it is being done in the docker image. Removing it causes an
# 'aws not found' error
echo 'export PATH=/usr/local/bin:~/.yarn/bin:~/.local/bin:$PATH' >>~/.bashrc

# NOTE: Currently `yarn install` does not correctly install all executables under
# `node_modules/.bin/`. NPM does seem to correctly do this. Once yarn is correctly installing all
# `.bin` items, this should be switched back to `yarn install`
npm install

