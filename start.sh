#!/bin/bash

echo "Installing Chrome..."
apt-get update
apt-get install -y wget unzip
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
apt-get install -y ./google-chrome-stable_current_amd64.deb

export CHROME_PATH=$(which google-chrome)
echo "Chrome installed at $CHROME_PATH"
