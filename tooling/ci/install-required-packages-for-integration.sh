#!/bin/bash

#
#
# Install all the necessary packages for spinning up a server
#

. ~/.bashrc

sudo apt-get install libgtk2.0-0 libgtk-3-0 libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb
# For some reason yarn doesn't work here. Might need further investigation.
npm install --save-dev start-server-and-test
npm install ngx-perfect-scrollbar
npm install text-mask-addons
npm install text-mask-core
npm install @amcharts/amcharts4-geodata@4.1.12
sudo npm link gulp


