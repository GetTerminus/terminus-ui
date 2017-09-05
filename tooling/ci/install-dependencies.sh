#!/bin/bash

#
# Install dependencies
#


# Authenticate NPM by adding our token
echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > ~/.npmrc

yarn install --frozen-lockfile

