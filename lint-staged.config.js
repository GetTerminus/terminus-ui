const micromatch = require('micromatch')

module.exports = {

  // Target TESTING files
  '**/testing/**/*.ts': [
    `yarn run lint:tslint:spec:fix`,
    `git add`,
  ],

  // Target SPEC files
  '**/*.spec.ts': files => {
    const fileList = removeDirectories(files);

    return [
      `yarn run lint:tslint:spec:fix ${fileList}`,
      `git add ${fileList}`,
    ];
  },


  // Target TYPESCRIPT files
  '!(*spec|*mock).ts': files => {
    const fileList = removeDirectories(files);

    return [
      `yarn run lint:tslint:fix ${fileList}`,
      `eslint --config .eslintrc.js --fix ${fileList}`,
      `git add ${fileList}`,
    ];
  },


  // Target SCSS files
  '!(*.spec).scss': files => {
    const fileList = removeDirectories(files);

    return [
      `yarn run lint:scss:no-files ${fileList}`,
      `git add ${fileList}`,
    ];
  },

}




/**
 * Function to remove any testing or demo files and return a string containing all file names
 *
 * @param {Object} files
 * @return {string} fileNames
 */
function removeDirectories(files) {
  const match = micromatch.not(files, [
    '**/testing/**',
    '**/demo/**',
  ]);
  return match.join(' ');
}
