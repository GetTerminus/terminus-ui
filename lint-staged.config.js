const micromatch = require('micromatch');
const escape = require('shell-quote').quote;
const IGNORE = [
  'dist/**',
  'docs/**',
  'coverage/**',
  'node_modules/**',
  'package.json',
  'yarn.lock',
];

module.exports = {
  // Target all TS & JS files
  '**/*.{js,ts}': filenames => {
    filenames = removeDirectories(filenames);
    const escapedFileNames = filenames.map(filename => `"${escape([filename])}"`).join(' ');
    return [
      `eslint --fix ${filenames.map(f => `"${f}"`).join(' ')}`,
      `git add ${escapedFileNames}`,
    ]
  },

  // Target library SCSS files
  'projects/library/**/!(*.spec).scss': files => {
    const foo = 2;
    return [
      `yarn run library:lint:scss ${files}`,
    ];
  },

  // Target demo SCSS files
  'projects/demo/**/!(*.spec).scss': files => {
    const foo = 2;
    return [
      `yarn run demo:lint:scss ${files}`,
    ];
  },

  // Target visual-regression SCSS files
  'projects/visual-regression/**/!(*.spec).scss': files => {
    const foo = 2;
    return [
      `yarn run vr:lint:scss ${files}`,
    ];
  },
};


/**
 * Function to remove any testing or demo files and return an array containing all file names
 *
 * @param files
 * @returns Array
 */
const removeDirectories = files => micromatch.not(files, [
  ...IGNORE,
  '**/testing/**',
  '**/demo/**',
  '**/cypress/**',
  '**/visual-regression/**',
]);

