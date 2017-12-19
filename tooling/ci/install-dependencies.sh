#!/bin/bash

#
# Install dependencies
#


# Authenticate NPM by adding our token
echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > ~/.npmrc

sudo npm i -g semantic-release

yarn install

