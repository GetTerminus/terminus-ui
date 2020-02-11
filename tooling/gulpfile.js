'use strict';

const path                 = require('path');
const gulp                 = require('gulp');
const gulpSass             = require('gulp-sass');
const sassModuleImporter   = require('sass-module-importer');
const postcss              = require('gulp-postcss');
const autoprefixer         = require('autoprefixer');
const gulpStripComments    = require('gulp-strip-json-comments');
const gulpRemoveEmptyLines = require('gulp-remove-empty-lines');
const gulpConcat           = require('gulp-concat');
const gulpReplace          = require('gulp-replace');
// For dev
const gulpPrint            = require('gulp-print').default;

const libNameWithScope     = require('./../package.json').name;
const libName              = libNameWithScope.slice(libNameWithScope.indexOf('/') + 1);
const rootFolder           = path.join(__dirname, '../');


// General configurations for the build process
const config = {
  libName,
  paths: {
    rootFolder,
    distFolder: path.join(rootFolder, 'dist/terminus-ui'),
    npmFolder: path.join(rootFolder, 'node_modules/@terminus/ui'),
    scss: {
      helpersInputs: [
        // NOTE: Keep custom properties first in line:
        path.join(rootFolder, 'terminus-ui', 'scss/global/_custom-properties.scss'),
        path.join(rootFolder, 'terminus-ui', 'scss/a11y/_a11y.scss'),
        path.join(rootFolder, 'terminus-ui', 'scss/animation/_animation.scss'),
        path.join(rootFolder, 'terminus-ui', 'scss/breakpoints/_breakpoints.scss'),
        path.join(rootFolder, 'terminus-ui', 'scss/color/_color.scss'),
        path.join(rootFolder, 'terminus-ui', 'scss/cursors/_cursors.scss'),
        path.join(rootFolder, 'terminus-ui', 'scss/layout/_center-content.scss'),
        path.join(rootFolder, 'terminus-ui', 'scss/layout/_opposite-direction.scss'),
        path.join(rootFolder, 'terminus-ui', 'scss/layout/_pseudo.scss'),
        path.join(rootFolder, 'terminus-ui', 'scss/layout/_responsive-ratio.scss'),
        path.join(rootFolder, 'terminus-ui', 'scss/layout/_take-space.scss'),
        path.join(rootFolder, 'terminus-ui', 'scss/layout/_visually-hidden.scss'),
        path.join(rootFolder, 'terminus-ui', 'scss/scrollbars/_scrollbars.scss'),
        path.join(rootFolder, 'terminus-ui', 'scss/shadows/_shadows.scss'),
        path.join(rootFolder, 'terminus-ui', 'scss/spacing/_spacing.scss'),
        path.join(rootFolder, 'terminus-ui', 'scss/triangle/_triangle.scss'),
        path.join(rootFolder, 'terminus-ui', 'scss/typography/_typography.scss'),
        path.join(rootFolder, 'terminus-ui', 'scss/utilities/_utilities.scss'),
        path.join(rootFolder, 'terminus-ui', 'scss/z-index/_z-index.scss'),
        // Card must be after spacing and shadows
        path.join(rootFolder, 'terminus-ui', 'scss/card/_card.scss'),
      ],
      globalStylesInput: path.join(rootFolder, 'terminus-ui', `scss/global/terminus-ui.scss`),
    },
  },
  sass: {
    shared: {
      outputStyle: 'compressed',
      importer: sassModuleImporter(),
    },
    postCss: [
      autoprefixer({ grid: true }),
    ],
  },
};




//
// BEGIN TASKS
//


/**
 * Bundle exposed SCSS
 *
 * 1) Merge all SCSS helper files
 * 2) Save to dist
 */
gulp.task('bundle-exposed-scss', () => gulp.src(config.paths.scss.helpersInputs)
  .pipe(gulpConcat('helpers.scss'))
  .pipe(gulp.dest(config.paths.distFolder)));


/**
 * Sanitize Exposed SCSS
 *
 * 1) Strip comments
 * 2) Strip @imports
 * 3) Remove empty lines
 */
gulp.task('sanitize-exposed-scss', () => gulp.src(path.join(config.paths.distFolder, 'helpers.scss'))
  .pipe(gulpStripComments())
  .pipe(gulpReplace(/@import.*/g, ''))
  .pipe(gulpRemoveEmptyLines())
  .pipe(gulp.dest(config.paths.distFolder)));


/**
 * Generate Exposed CSS
 *
 * 1) Compile to CSS
 * 2) Run through PostCSS/AutoPrefixer
 */
gulp.task('generate:css', () => gulp.src(config.paths.scss.globalStylesInput)
  .pipe(gulpSass(config.sass.shared).on('error', gulpSass.logError))
  .pipe(postcss(config.sass.postCss))
  .pipe(gulp.dest(config.paths.distFolder)));


/**
 * Copy styles to the node_modules directory. This allows the demo application to use styles
 * locally.
 *
 * 1) Copy files to `node_modules/@terminus/ui`
 */
gulp.task('copy-to-npm', () => gulp.src([
  path.join(config.paths.distFolder, 'helpers.scss'),
  path.join(config.paths.rootFolder, 'node_modules/@terminus/design-tokens/css/library-design-tokens.css'),
  path.join(config.paths.distFolder, 'terminus-ui.css'),
])
  .pipe(gulp.dest(config.paths.npmFolder)));




//
// Complex Tasks
//


// Generate the SCSS helpers file
gulp.task('generate:exposed-scss', gulp.series(
  'bundle-exposed-scss',
  'sanitize-exposed-scss'
));


// Generate a full release build
gulp.task('generate:styles', gulp.series(
  'generate:exposed-scss',
  'generate:css',
  'copy-to-npm'
));
