const baseConfig = require('./jest.base.config');

module.exports = {
  ...baseConfig,
  roots: ['<rootDir>/projects/demo'],
  modulePaths: ['<rootDir>/projects/library'],
  testMatch: [
    '<rootDir>/projects/demo/**/?(*.)spec.ts?(x)',
  ],
};
