#!/bin/bash

# ติดตั้ง Chrome แบบ manual
mkdir -p /opt/chrome
cd /opt/chrome

curl -O https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
apt-get update && apt-get install -y ./google-chrome-stable_current_amd64.deb || true

# สร้าง symlink
ln -s /usr/bin/google-chrome /opt/render/.cache/puppeteer/chrome

# เริ่มแอป
npm start
