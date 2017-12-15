/**
 * Check out https://googlechromelabs.github.io/sw-toolbox/ for
 * more info on how to use sw-toolbox to custom configure your service worker.
 */


'use strict';
importScripts('./build/sw-toolbox.js');

self.toolbox.options.cache = {
  name: 'ionic-cache'
};

// pre-cache our key assets
self.toolbox.precache(
  [
    './build/main.js',
    './build/vendor.js',
    './build/main.css',
    './build/polyfills.js',
    'index.html',
    'manifest.json'
  ]
);

// dynamically cache any other local assets
self.toolbox.router.any('/*', self.toolbox.fastest);

// for any other requests go to the network, cache,
// and then only use that cached resource if your user goes offline
self.toolbox.router.default = self.toolbox.networkFirst;

/*
    "@angular/common": "5.0.1",
    "@angular/compiler": "5.0.1",
    "@angular/compiler-cli": "5.0.1",
    "@angular/core": "5.0.1",
    "@angular/forms": "5.0.1",
    "@angular/http": "5.0.1",
    "@angular/platform-browser": "5.0.1",
    "@angular/platform-browser-dynamic": "5.0.1",
    "@ionic-native/core": "4.4.0",
    "@ionic-native/splash-screen": "4.4.0",
    "@ionic-native/status-bar": "4.4.0",
    "@ionic/pro": "1.0.16",
    "@ionic/storage": "^2.1.3",
    "cordova-android": "6.3.0",
    "cordova-plugin-device": "^1.1.7",
    "cordova-plugin-ionic-webview": "^1.1.16",
    "cordova-plugin-splashscreen": "^4.1.0",
    "cordova-plugin-whitelist": "1.3.1",
    "cordova-sqlite-storage": "^2.1.2",
    "ionic-angular": "3.9.2",
    "ionic-plugin-keyboard": "^2.2.1",
    "ionicons": "3.0.0",
    "rxjs": "5.5.2",
    "sw-toolbox": "3.6.0",
    "zone.js": "0.8.18"
    */
