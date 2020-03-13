const baseConfig = require('./jest.base.config');

module.exports = {
  ...baseConfig,
  roots: ['.'],
  modulePaths: ['<rootDir>/projects/library'],
  testMatch: [
    '<rootDir>/projects/visual-regression/**/?(*.)spec.ts?(x)',
    '<rootDir>/projects/visual-regression/**/?(*.)test-sass.js?(x)',
  ],
};
