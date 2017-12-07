'use strict';

const fs                   = require('fs');
const path                 = require('path');
const rollup               = require('rollup');
const gulp                 = require('gulp');
const glob                 = require('glob');
const ngc                  = require('@angular/compiler-cli/src/main').main;
const execa                = require('execa');
const inlineResources      = require('./inline-resources');
const camelCase            = require('camelcase');
const rollupUglify         = require('rollup-plugin-uglify');
const rollupNodeResolve    = require('rollup-plugin-node-resolve');
const rollupCommonjs       = require('rollup-plugin-commonjs');
const replace              = require('replace-in-file');
const del                  = require('del');
const gulpSourcemaps       = require('gulp-sourcemaps');
const gulpSass             = require('gulp-sass');
const sassModuleImporter   = require('sass-module-importer');
const postcss              = require('gulp-postcss');
const autoprefixer         = require('autoprefixer');
const nodeSassImport       = require('node-sass-import');
const gulpStripComments    = require('gulp-strip-json-comments');
const gulpRemoveEmptyLines = require('gulp-remove-empty-lines');
const gulpConcat           = require('gulp-concat');
const gulpReplace          = require('gulp-replace');
const cloneDeep            = require('lodash.clonedeep');
// For dev
const gulpPrint            = require('gulp-print');

const libNameWithScope     = require('./../package.json').name;
const libName              = libNameWithScope.slice(libNameWithScope.indexOf('/') + 1);
const rootFolder           = path.join(__dirname, '../');

// This is the list of dependencies and peer dependencies this library has.
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

// General configurations for the build process
const config = {
  libName: libName,
  paths: {
    rootFolder: rootFolder,
    distFolder: path.join(rootFolder, 'dist'),
    // NOTE: The temp dist folder allows us to generate a new build without removing the existing
    // dist files. This stops `ng-serve` from throwing errors during a recompile.
    distTempFolder: path.join(rootFolder, 'dist-temp'),
    srcFolder: path.join(rootFolder, 'src/lib'),
    tempLibFolder: path.join(rootFolder, 'out-tsc', 'lib'),
    es2015OutputFolder: path.join(rootFolder, 'out-tsc', 'lib-es2015'),
    es5Entry: path.join(rootFolder, 'out-tsc', 'lib-es5', `${libName}.js`),
    libFinalOutputFile: path.join(rootFolder, 'dist-temp', `bundles`, `${libName}.umd.js`),
    libFinalOutputMinifiedFile: path.join(rootFolder, 'dist-temp', `bundles`, `${libName}.umd.min.js`),
    scss: {
      helpersInputs: [
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
      helpersLibOutput: path.join(rootFolder, 'src/lib', 'helpers.scss'),
      helpersDistOutput: path.join(rootFolder, 'dist-temp', 'helpers.scss'),
      globalStylesInput: path.join(rootFolder, 'src/lib', `src/scss/global/terminus-ui.scss`),
    },
  },
  uglify: {
    compress: true,
    mangle: true,
  },
  sass: {
    default: {
      outputStyle: 'compressed',
      importer: nodeSassImport,
    },
    shared: {
      outputStyle: 'compressed',
      importer: sassModuleImporter(),
    },
    dev: {
      outputStyle: 'expanded',
      importer: nodeSassImport,
    },
    postCss: [
      autoprefixer({
        grid: true,
      }),
    ],
  },
  delOptions: {
    // Necessary to run the delete process outside of the workspace
    force: true,
  },
};

// Base shared options for the RollupJS input config
const rollupInputOptionsBase = {
  // NOTE: Using 'entry' throws a warning: `options.entry is deprecated, use options.input`
  // but when switching to `input` the build is no longer generated (silent failure)
  entry: config.paths.es5Entry,
  plugins: [
    rollupNodeResolve({
      es2015: true,
      module: true,
      main: true,
    }),
    rollupCommonjs({
      include: [
        './../node_modules/angular2-ladda/**',
        './../node_modules/ladda/**',
        './../node_modules/spin.js/**',
        './../node_modules/rxjs/**',
      ],
    }),
  ],
  onwarn: function(warning) {
    // NOTE: Suppress this error message... Angular team says to ignore it.
    // https://github.com/rollup/rollup/wiki/Troubleshooting#this-is-undefined
    if (warning.code === 'THIS_IS_UNDEFINED') {
      return;
    }
    console.error(warning.message);
  },
  external: Object.keys(GLOBALS),
};

// Extend base rollup config with minification
const rollupMinifiedInputOptions = cloneDeep(rollupInputOptionsBase);
rollupMinifiedInputOptions.plugins.push(rollupUglify(config.uglify));

// General rollup configurations for the build process
const rollupConfig = {
  input: rollupInputOptionsBase,
  inputMinified: rollupMinifiedInputOptions,
  output: {
    name: camelCase(config.libName),
    file: config.paths.libFinalOutputFile,
    sourcemap: true,
    globals: GLOBALS,
    format: 'umd',
  },
};




//
// BEGIN TASKS
//


/**
 * Remove all generated files
 */
gulp.task('clean-generated-files', () => {
  return del([
    path.join(config.paths.distTempFolder, `**/*`),
    path.join(config.paths.tempLibFolder, `**/*`),
    path.join(config.paths.srcFolder, `**/!(systemjs-angular-loader).js`),
    path.join(config.paths.srcFolder, `**/*.map`),
    path.join(config.paths.srcFolder, `helpers.+(scss|css)`),
    path.join(config.paths.srcFolder, `**/*.css`),
  ], config.delOptions);
});


/**
 * Copy library to temp working directory for the build process
 */
gulp.task('copy-lib', () => {
  return gulp.src(path.join(config.paths.srcFolder, '**/*'))
    .pipe(gulp.dest(config.paths.tempLibFolder));
});


/**
 * Compile SCSS to CSS
 *
 * 1) Compile to CSS
 * 2) Strip comments
 * 3) Write sourcemaps
 * 4) Run through PostCSS
 */
gulp.task('compile-sass', () => {
  return gulp.src(path.join(config.paths.tempLibFolder, `**/*.scss`))
    .pipe(gulpSourcemaps.init())
    .pipe(gulpSass(config.sass.default).on('error', gulpSass.logError))
    .pipe(gulpStripComments())
    .pipe(gulpSourcemaps.write())
    .pipe(postcss(config.sass.postCss))
    .pipe(gulp.dest(config.paths.tempLibFolder))
});


/**
 * Inline all component resources (HTML/CSS)
 */
gulp.task('inline-resources', () => {
  return inlineResources(config.paths.tempLibFolder);
});


/**
 * Compile TypeScript to ES2015
 */
gulp.task('compile-ngc', () => {
  return Promise.resolve()
  .then(() => {
    return ngc(['-p', `${config.paths.tempLibFolder}/tsconfig.json`], (error) => {
      if (error) {
        throw new Error('compile-ngc-es5 compilation failed: ' + error);
      }
    });
  });
});


/**
 * Compile TypeScript to ES5
 */
gulp.task('compile-ngc-es5', () => {
  return Promise.resolve()
  .then(() => {
    return ngc(['-p', `${config.paths.tempLibFolder}/tsconfig.es5.json`], (error) => {
      if (error) {
        throw new Error('compile-ngc-es5 compilation failed: ' + error);
      }
    });
  });
});


/**
 * Bundle JS files with Rollup (with maps)
 *
 * Currently expected warnings:
 * 1. options.entry is deprecated, use options.input
 *   - See `rollupInputOptionsBase`
 * 1. 'LOCALE_ID' is imported from external module '@angular/core' but never used
 *   - This began after a 4.x Angular upgrade. It is generated by the rollup functionality but does
 *   not seem to affect/break the build
 */
gulp.task('bundle', () => {
  return rollup.rollup(rollupConfig.input).then((bundle) => {
    return bundle.generate(rollupConfig.output).then((result) => {
      // Create bundles dir
      recursiveMkDir(path.join(config.paths.distTempFolder, `bundles`));

      // Write the output file
      fs.writeFileSync(config.paths.libFinalOutputFile, result.code);

      // Write the map file
      fs.writeFileSync(`${config.paths.libFinalOutputFile}.map`, result.map);
    });
  });
});


/**
 * Bundle & minify JS files with Rollup (with maps)
 */
gulp.task('bundleMinified', () => {
  return rollup.rollup(rollupConfig.inputMinified).then((bundle) => {
    return bundle.generate(rollupConfig.output).then((result) => {
      // Write the output file
      fs.writeFileSync(config.paths.libFinalOutputMinifiedFile, result.code);

      // Write the map file
      fs.writeFileSync(`${config.paths.libFinalOutputMinifiedFile}.map`, result.map);
    });
  });
});


/**
 * Copy package files to dist
 */
gulp.task('copy-package-files', () => {
  return gulp.src([
    path.join(config.paths.rootFolder, 'LICENSE'),
    path.join(config.paths.rootFolder, 'package.json'),
    path.join(config.paths.rootFolder, 'README.md'),
    path.join(config.paths.es2015OutputFolder, '**/*.metadata.json'),
    path.join(config.paths.es2015OutputFolder, '**/*.d.ts'),
  ])
    .pipe(gulp.dest(config.paths.distTempFolder));
});


/**
 * Bundle exposed SCSS
 *
 * 1) Merge all SCSS helper files
 * 2) Save to dist
 */
gulp.task('bundle-exposed-scss', () => {
  return gulp.src(config.paths.scss.helpersInputs)
    .pipe(gulpConcat('helpers.scss'))
    .pipe(gulp.dest(config.paths.distTempFolder));
});


/**
 * Sanitize Exposed SCSS
 *
 * 1) Strip comments
 * 2) Strip @imports
 * 3) Remove empty lines
 */
gulp.task('sanitize-exposed-scss', () => {
  return gulp.src(path.join(config.paths.distTempFolder, 'helpers.scss'))
    .pipe(gulpStripComments())
    .pipe(gulpReplace(/@import.*/g, ''))
    .pipe(gulpRemoveEmptyLines())
    .pipe(gulp.dest(config.paths.distTempFolder));
});


/**
 * Generate Exposed CSS
 *
 * 1) Compile to CSS
 * 2) Run through PostCSS/AutoPrefixer
 */
gulp.task('generate:css', () => {
  return gulp.src(config.paths.scss.globalStylesInput)
    .pipe(gulpSass(config.sass.shared).on('error', gulpSass.logError))
    .pipe(postcss(config.sass.postCss))
    .pipe(gulp.dest(config.paths.distTempFolder));
});


/**
 * Generate SASS during development
 *
 * 1) Compile to CSS
 * 2) Strip comments
 * 2) Run through PostCSS/AutoPrefixer
 */
gulp.task('compile-sass-dev', () => {
  return gulp.src(path.join(config.paths.srcFolder, `**/*.scss`))
    .pipe(gulpSass(config.sass.dev).on('error', gulpSass.logError))
    .pipe(gulpStripComments())
    .pipe(postcss(config.sass.postCss))
    .pipe(gulp.dest(config.paths.srcFolder))
});


/**
 * Move all files from dist-temp to dist
 */
gulp.task('overwrite-dist', () => {
  return gulp.src([`${config.paths.distTempFolder}/**/*`])
    .pipe(gulp.dest(config.paths.distFolder));
});


/**
 * Remove temporary dist artifacts
 */
gulp.task('clean:temp-dist-files', () => {
  return del([
    config.paths.distTempFolder,
    path.join(config.paths.distFolder, `dist-temp`),
  ], config.delOptions);
});


//
// Complex Tasks
//


// Generate the SCSS helpers file
gulp.task('generate:exposed-scss', gulp.series(
  'bundle-exposed-scss',
  'sanitize-exposed-scss'
));


// Generate a full release build
gulp.task('generate:build', gulp.series(
  'clean-generated-files',
  'copy-lib',
  'compile-sass',
  'inline-resources',
  'compile-ngc',
  'compile-ngc-es5',
  'copy-package-files',
  'bundle',
  'bundleMinified',
  'generate:exposed-scss',
  'generate:css',
  'overwrite-dist',
  'clean:temp-dist-files'
));





/**
 * Recursively create directories
 *
 * @param {String} dir The directory path to create
 */
function recursiveMkDir(dir) {
  if (!fs.existsSync(dir)) {
    recursiveMkDir(path.dirname(dir));
    fs.mkdirSync(dir);
  }
}
