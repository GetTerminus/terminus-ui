const baseConfig = require('./jest.base.config');

module.exports = {
  ...baseConfig,
  roots: ['.'],
  testMatch: [
    '<rootDir>/projects/library/**/?(*.)spec.ts?(x)',
    '<rootDir>/projects/library/**/?(*.)test-sass.js?(x)',
  ],
};
