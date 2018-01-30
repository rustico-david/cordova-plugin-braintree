'use strict';

const fs = require('fs'),
  path = require('path'),
  plist = require('plist');

module.exports = function (context) {
  if (process.length >= 5 && process.argv[1].indexOf('cordova') === -1) {
    if (process.argv[4] !== 'ios') {
      return; // plugin only meant to work for ios platform.
    }
  }

  var config = fs.readFileSync("config.xml").toString();
  var projectNameMatch = config.match(/<name[^>]*>(.*?)<\/name>/i);
  var projectName = projectNameMatch ? projectNameMatch[1] : null;
  var bundleIdMatch = config.match(/<widget.*?\bid="([^"]+)"[^>]*>/im)
  var bundleId = bundleIdMatch ? bundleIdMatch[1] : null;
  var plistFilePath = path.join('./platforms/ios', projectName, projectName + '-Info.plist');
  var infoPlist = plist.parse(fs.readFileSync(plistFilePath, 'utf8'));

  var found = false;
  if (infoPlist.CFBundleURLTypes) {
    infoPlist.CFBundleURLTypes.forEach(function (curValue, index) {
      if (curValue.CFBundleURLSchemes) {
        curValue.CFBundleURLSchemes.forEach(function (curValue2, index2) {
          if (curValue2 === bundleId + ".payments") {
            found = true;
          }
        });
      }
    });
  } else {
    infoPlist.CFBundleURLTypes = [];
  }
  if (!found) {
    infoPlist.CFBundleURLTypes.push({
      "CFBundleTypeRole": "Editor",
      "CFBundleURLSchemes": [bundleId + ".payments"]
    });
    fs.writeFileSync(plistFilePath, plist.build(infoPlist), {encoding: 'utf8'});
  }
};
