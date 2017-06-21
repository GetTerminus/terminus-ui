const replace = require('replace-in-file');

const options = {
  files: [
    'src/lib/**/*.js',
  ],
  // Replacement to make (string or regex)
  from: 'scss',
  to: 'css',
};

/**
 * Replace all references of 'scss' to 'css' within the generated JS files inside the lib
 * (The demo chokes on Sass imports otherwise)
 */
replace(options)
  .then(changedFiles => {
  })
  .catch(error => {
    console.error('Error changing scss to css:', error);
  });

