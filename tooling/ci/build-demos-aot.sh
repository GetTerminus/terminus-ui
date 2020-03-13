#!/bin/bash

#
# Build the demo project
#
# 1. Overwrite the library in node_modules with the freshly built version
# 2. Build the app with the correct base href
#

. ~/.bashrc

# Remove any existing library files
rm -rf node_modules/@terminus/ui/*

# Move library files to the demo's node_modules
cp -r dist/library/* node_modules/@terminus/ui/

# Build the app with the correct base href
yarn run demo:build:ci --base-href https://getterminus.github.io/ui-demos-release/
