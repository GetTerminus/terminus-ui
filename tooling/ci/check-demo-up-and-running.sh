#!/bin/bash

#
#
# Install all the necessary packages for spinning up a server
#

. ~/.bashrc

sudo apt-get install libgtk2.0-0 libgtk-3-0 libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb
npm install --save-dev start-server-and-test
npm install ngx-perfect-scrollbar
npm install text-mask-addons
npm install text-mask-core
sudo npm link gulp


