#!/bin/bash

#
# Check the demo site is up and running
#
# Use cypress to check the demo site is up and running
#

. ~/.bashrc

sudo apt-get install libgtk2.0-0 libgtk-3-0 libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb
npm install --save-dev start-server-and-test
npm install ngx-perfect-scrollbar
npm install text-mask-addons
npm install text-mask-core
sudo npm link gulp


