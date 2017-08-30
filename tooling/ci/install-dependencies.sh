#!/bin/bash

#
# Install dependencies
#


# NOTE: Currently `yarn install` does not correctly install all executables under
# `node_modules/.bin/`. NPM does seem to correctly do this. Once yarn is correctly installing all
# `.bin` items, this should be switched back to `yarn install`. The missing bin items break testing,
# scss linting, and docs generation (compodoc)
# Issue: https://github.com/yarnpkg/yarn/issues/760
yarn install --frozen-lockfile

