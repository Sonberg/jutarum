#!/bin/bash
echo Vilken version vill du installera?
read VERSION
npm uninstall -g ember-cli
npm cache clean
bower cache clean
npm install -g ember-cli@$VERSION
rm -rf node_modules bower_components dist tmp
npm install --save-dev ember-cli@$VERSION
npm install
bower install
ember init