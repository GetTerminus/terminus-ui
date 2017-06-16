/**
 * System configuration for demo
 */
(function (global) {
  System.config({
    paths: {
      // Paths serve as alias
      'npm:': 'node_modules/'
    },
    // Map tells the System loader where to look for things
    map: {
      // Our app is within the app folder
      app: 'app',

      // Angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      '@angular/animations': 'npm:@angular/animations/bundles/animations.umd.js',
      '@angular/animations/browser': 'npm:@angular/animations/bundles/animations-browser.umd.js',
      // HACK: Not sure why this only works when pulling from the CDN. When defining as the others
      // above, it throws an odd undefined error from inside the bundle
      '@angular/animations': 'https://unpkg.com/@angular/animations/bundles/animations.umd.js',
      '@angular/animations/browser': 'https://unpkg.com/@angular/animations/bundles/animations-browser.umd.js',
      '@angular/platform-browser/animations': 'https://unpkg.com/@angular/platform-browser/bundles/platform-browser-animations.umd',


      // Material
      '@angular/material': 'npm:@angular/material/bundles/material.umd.js',

      // Other libraries
      'rxjs': 'npm:rxjs',
      'angular2-ladda': 'node_modules/angular2-ladda/module',
      'ladda': 'node_modules/ladda/js',
      'spin': 'node_modules/ladda/js/spin.js',
    },
    // Packages tells the System loader how to load when no filename and/or no extension
    packages: {
      'app': {
        defaultExtension: 'js',
        meta: {
          './*.js': {
            loader: 'systemjs-angular-loader.js'
          }
        }
      },
      'rxjs': {
        defaultExtension: 'js'
      },
      '@terminus/ui': {
        main: 'index.js',
        defaultExtension: 'js',
        meta: {
          './*.js': {
            loader: 'systemjs-angular-loader.js'
          }
        }
      },
      'angular2-ladda': {
        main: 'module.js',
        defaultExtension: 'js',
      },
      'ladda': {
        main: 'ladda.js',
        defaultExtension: 'js',
      },
    },
  });
})(this);
