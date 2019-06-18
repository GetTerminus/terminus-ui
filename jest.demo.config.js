const baseConfig = require('./jest.base.config');

module.exports = {
  ...baseConfig,
  roots: ['<rootDir>/demo/app'],
  modulePaths: ['<rootDir>/terminus-ui'],
};
