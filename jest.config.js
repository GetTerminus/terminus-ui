const baseConfig = require('./jest.base.config');

module.exports = {
  ...baseConfig,
  roots: ['<rootDir>/projects/library'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/demo/app',
  ],
}
