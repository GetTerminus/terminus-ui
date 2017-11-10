'use strict';
const fs                 = require('fs');
const path               = require('path');
const rollup             = require('rollup');
const gulp               = require('gulp');
const glob               = require('glob');
const ngc                = require('@angular/compiler-cli/src/main').main;
const execa              = require('execa');
const inlineResources    = require('./inline-resources');
const camelCase          = require('camelcase');
const rollupUglify       = require('rollup-plugin-uglify');
const mergeFiles         = require('merge-files');
const nodeResolve        = require('rollup-plugin-node-resolve');
const commonjs           = require('rollup-plugin-commonjs');
const replace            = require('replace-in-file');
const del                = require('del');
const gulpSourcemaps     = require('gulp-sourcemaps');
const sass               = require('gulp-sass');
const sassModuleImporter = require('sass-module-importer');
const postcss            = require('gulp-postcss');
const autoprefixer       = require('autoprefixer');
const nodeSassImport     = require('node-sass-import');


const libNameWithScope = require('./../package.json').name;
const libName          = libNameWithScope.slice(libNameWithScope.indexOf('/') + 1);
const rootFolder       = path.join(__dirname, '../');

const config = {
  libName: libName,
  paths: {
    rootFolder: rootFolder,
    distFolder: path.join(rootFolder, 'dist'),
    srcFolder: path.join(rootFolder, 'src/lib'),
    tempLibFolder: path.join(rootFolder, 'out-tsc', 'lib'),
    es2015OutputFolder: path.join(rootFolder, 'out-tsc', 'lib-es2015'),
    es5Entry: path.join(rootFolder, 'out-tsc', 'lib-es5', `${libName}.js`),
    libFinalOutputFile: path.join(rootFolder, 'dist', `bundles`, `${libName}.umd.js`),
    libFinalOutputMinifiedFile: path.join(rootFolder, 'dist', `bundles`, `${libName}.umd.min.js`),
    scssHelpersInputPathList: [
      path.join(rootFolder, 'src/lib', 'src/scss/helpers/_typography.scss'),
      path.join(rootFolder, 'src/lib', 'src/scss/helpers/_cursors.scss'),
      path.join(rootFolder, 'src/lib', 'src/scss/helpers/_color.scss'),
      path.join(rootFolder, 'src/lib', 'src/scss/helpers/_assets.scss'),
      path.join(rootFolder, 'src/lib', 'src/scss/helpers/_breakpoints.scss'),
      path.join(rootFolder, 'src/lib', 'src/scss/helpers/_layout.scss'),
      path.join(rootFolder, 'src/lib', 'src/scss/helpers/_z-index.scss'),
      // Spacing must be after typography
      path.join(rootFolder, 'src/lib', 'src/scss/helpers/_spacing.scss'),
      path.join(rootFolder, 'src/lib', 'src/scss/helpers/_animation.scss'),
      path.join(rootFolder, 'src/lib', 'src/scss/helpers/_shadows.scss'),
      // Card must be after spacing and shadows
      path.join(rootFolder, 'src/lib', 'src/scss/helpers/_card.scss'),
    ],
    scssHelpersOutputPath: path.join(rootFolder, 'src/lib', 'helpers.scss'),
  },
};


// Add any dependency or peer dependency your library has to `globals` and `external`.
// This is required for UMD bundle users.
const GLOBALS = {
  // Angular dependencies
  '@angular/animations': 'ng.animations',
  '@angular/animations/browser': 'ng.animations.browser',
  '@angular/core': 'ng.core',
  '@angular/common': 'ng.common',
  '@angular/flex-layout': 'ng.flex-layout',
  '@angular/forms': 'ng.forms',
  '@angular/http': 'ng.http',
  '@angular/router': 'ng.router',
  '@angular/platform-browser': 'ng.platformBrowser',
  '@angular/platform-browser/animations': 'ng.platformBrowser.animations',
  '@angular/platform-browser-dynamic': 'ng.platformBrowserDynamic',

  // Material
  '@angular/material': 'ng.material',
  '@angular/cdk': 'ng.cdk',
  '@angular/cdk/overlay': 'ng.cdk.overlay',
  '@angular/cdk/portal': 'ng.cdk.portal',
  '@angular/cdk/keycodes': 'ng.cdk.keycodes',

  // Rxjs dependencies
  'rxjs/Subject': 'Rx',
  'rxjs/Observable': 'Rx',
  'rxjs/add/observable/of': 'Rx.Observable',
  'rxjs/add/observable/fromEvent': 'Rx.Observable',
  'rxjs/add/operator/distinctUntilChanged': 'Rx.Operator',
  'rxjs/add/operator/pluck': 'Rx.Operator',
  'rxjs/add/operator/debounceTime': 'Rx.Operator',
  'rxjs/BehaviorSubject': 'Rx.BehaviorSubject',
};

const rollupInputOptions = {
  // NOTE: Using 'entry' throws a warning: `options.entry is deprecated, use options.input`
  // but when switching to `input` the build is no longer generated (silent failure)
  entry: config.paths.es5Entry,
  plugins: [
    nodeResolve({
      es2015: true,
      module: true,
      main: true,
    }),
    commonjs({
      include: [
        './../node_modules/angular2-ladda/**',
        './../node_modules/ladda/**',
        './../node_modules/spin.js/**',
        './../node_modules/rxjs/**',
      ],
    }),
  ],
  onwarn: function(warning) {
    // Suppress this error message... Angular team says to ignore it.
    // https://github.com/rollup/rollup/wiki/Troubleshooting#this-is-undefined
    if (warning.code === 'THIS_IS_UNDEFINED') {
      return;
    }
    console.error(warning.message);
  },
  external: Object.keys(GLOBALS),
};

const rollupOutputOptions = {
  name: camelCase(config.libName),
  file: config.paths.libFinalOutputFile,
  sourcemap: true,
  globals: GLOBALS,
  format: 'umd',
};

const uglifyOptions = {
  compress: true,
  mangle: true,
};
const sassConfig = {
  outputStyle: 'compressed',
  importer: nodeSassImport,
};
const postCssPlugins = [
  autoprefixer({grid: true}),
];
const sharedCssSassConfig = {
  outputStyle: 'compressed',
  importer: sassModuleImporter(),
};
const delOptions = {
  force: true,
};
// Add the uglify plugin to the input options
const rollupMinifiedInputOptions = Object.assign({}, rollupInputOptions);
rollupMinifiedInputOptions.plugins.push(rollupUglify(uglifyOptions));




//
// END OPTIONS / SETUP
//


// Clean all old files
gulp.task('clean-lib', () => {
  return del([
    path.join(config.paths.distFolder, `**/*`),
    path.join(config.paths.srcFolder, `**/!(systemjs-angular-loader).js`),
    path.join(config.paths.srcFolder, `**/*.map`),
    path.join(config.paths.srcFolder, `helpers.+(scss|css)`),
  ], delOptions);
});


// Copy library to temp dir
gulp.task('copy-lib', () => {
  return relativeCopy(`**/*`, config.paths.srcFolder, config.paths.tempLibFolder);
});


// Compile SASS
gulp.task('compile-sass', () => {
  return gulp.src(path.join(config.paths.tempLibFolder, `**/*.scss`))
    .pipe(gulpSourcemaps.init())
    .pipe(sass(sassConfig).on('error', sass.logError))
    .pipe(gulpSourcemaps.write())
    .pipe(postcss(postCssPlugins))
    .pipe(gulp.dest(config.paths.tempLibFolder))
});


// Inline resources
gulp.task('inline-resources', () => {
  return inlineResources(config.paths.tempLibFolder);
});


// Compile to ES5
gulp.task('compile-ngc-es5', () => {
  return ngc({project: `${config.paths.tempLibFolder}/tsconfig.es5.json`});
});


// Compile to ES2015
gulp.task('compile-ngc', () => {
  return ngc({project: `${config.paths.tempLibFolder}/tsconfig.json`});
});


// Copy library files
gulp.task('copy-dts', () => {
  return relativeCopy('**/*.d.ts', config.paths.es2015OutputFolder, config.paths.distFolder);
});

// Copy metadata files
gulp.task('copy-metadata', () => {
  return relativeCopy('**/*.metadata.json', config.paths.es2015OutputFolder, config.paths.distFolder);
});


// Bundle JS files with Rollup
gulp.task('bundle', () => {
  return rollup.rollup(rollupInputOptions).then(function(bundle) {
    return bundle.generate(rollupOutputOptions).then((result) => {
      // Create bundles dir
      recursiveMkDir(path.join(config.paths.distFolder, `bundles`));

      // Write the output file
      fs.writeFileSync(config.paths.libFinalOutputFile, result.code);

      // Write the map file
      fs.writeFileSync(`${config.paths.libFinalOutputFile}.map`, result.map);
    });
  });
});


// Bundle and minify JS files with Rollup
gulp.task('bundleMinified', () => {
  return rollup.rollup(rollupMinifiedInputOptions).then(function(bundle) {
    return bundle.generate(rollupOutputOptions).then((result) => {
      // Write the output file
      fs.writeFileSync(config.paths.libFinalOutputMinifiedFile, result.code);

      // Write the map file
      fs.writeFileSync(`${config.paths.libFinalOutputMinifiedFile}.map`, result.map);
    });
  });
});


// Copy package files
gulp.task('copy-package-files', () => {
  return Promise.resolve()
    .then(() => relativeCopy('LICENSE', config.paths.rootFolder, config.paths.distFolder))
    .then(() => relativeCopy('package.json', config.paths.rootFolder, config.paths.distFolder))
    .then(() => relativeCopy('README.md', config.paths.rootFolder, config.paths.distFolder));
});


// Merge SCSS helpers and move to dist
gulp.task('bundle-scss-helpers', () => {
  return Promise.resolve()
    .then(() => mergeFiles(config.paths.scssHelpersInputPathList, config.paths.scssHelpersOutputPath))
    .then(() => relativeCopy('helpers.scss', config.paths.srcFolder, config.paths.distFolder))
    .then(() => replace({
      files: path.join(config.paths.distFolder, 'helpers.scss'),
      from: [/@import.*/g],
      to: '',
    }))
    .then(() => fs.unlinkSync(path.join(config.paths.srcFolder, 'helpers.scss')));
});


// Generate CSS for shared styles
gulp.task('generate-css', () => {
  return gulp.src(path.join(config.paths.srcFolder, `src/scss/global/terminus-ui.scss`))
    .pipe(sass(sharedCssSassConfig).on('error', sass.logError))
    .pipe(gulp.dest(config.paths.distFolder));
});


// FULL BUILD TASK
gulp.task('build', gulp.series(
  'clean-lib',
  'copy-lib',
  'compile-sass',
  'inline-resources',
  'compile-ngc',
  'compile-ngc-es5',
  'copy-dts',
  'copy-metadata',
  'copy-package-files',
  'bundle',
  'bundleMinified',
  'bundle-scss-helpers',
  'generate-css'
));




// HELPERS //




// Copy files maintaining relative paths.
function relativeCopy(fileGlob, from, to) {
  return new Promise((resolve, reject) => {
    glob(fileGlob, { cwd: from, nodir: true }, (err, files) => {
      if (err) reject(err);
      files.forEach(file => {
        const origin = path.join(from, file);
        const dest = path.join(to, file);
        const data = fs.readFileSync(origin, 'utf-8');
        recursiveMkDir(path.dirname(dest));
        fs.writeFileSync(dest, data);
        resolve();
      })
    })
  });
}

// Recursively create a dir.
function recursiveMkDir(dir) {
  if (!fs.existsSync(dir)) {
    recursiveMkDir(path.dirname(dir));
    fs.mkdirSync(dir);
  }
}

