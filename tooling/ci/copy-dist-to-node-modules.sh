#!/bin/bash

#
# Overwrite the library in node_modules with the freshly built version
#

. ~/.bashrc

# Remove any existing library files
rm -rf node_modules/@terminus/ui/*

# Move library files to the demo's node_modules
cp -r dist/terminus-ui/* node_modules/@terminus/ui/
