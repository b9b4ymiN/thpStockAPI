#!/bin/bash

# Install Chrome
apt-get update
apt-get install -y wget gnupg unzip curl
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
apt-get install -y ./google-chrome-stable_current_amd64.deb

# Start your node app
node dist/index.js
