const baseConfig = require('./jest.base.config');

module.exports = {
  ...baseConfig,
  roots: ['<rootDir>/terminus-ui'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/demo/app',
  ],
}
