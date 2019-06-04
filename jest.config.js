module.exports = {
  globals: {
    'ts-jest': {
      tsConfigFile: './terminus-ui/tsconfig.spec.json',
      ignoreCoverageForAllDecorators: true,
    },
    '__TRANSFORM_HTML__': true,
  },
  transform: {'^.+\\.(ts|js|html)$': '<rootDir>/node_modules/jest-preset-angular/preprocessor.js' },
  testMatch: [
    '<rootDir>/**/?(*.)spec.ts?(x)',
    '<rootDir>/**/?(*.)test-sass.js?(x)',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/demo/app',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!@ngrx)',
  ],
  reporters: ['default', ['jest-junit', { output: './coverage/junit/report.xml' }]],
  clearMocks: true,
  collectCoverageFrom: [
    'terminus-ui/**/!(index|public-api|*.module|*.interface|*.constant|*.mock|*.d).ts',
    'terminus-ui/**/*.directive.ts',
    '!terminus-ui/**/testing/**',
  ],
  moduleFileExtensions: [
    'ts',
    'js',
    'html',
  ],
  coverageDirectory: '<rootDir>/coverage/',
  setupFilesAfterEnv: [
    '<rootDir>/tooling/jest-setup.ts',
  ],
  moduleNameMapper: {
    'app/(.*)': '<rootDir>/demo/app/$1',
    'assets/(.*)': '<rootDir>/demo/assets/$1',
    'environments/(.*)': '<rootDir>/demo/environments/$1',
    '^@terminus/ui(.*)$': '<rootDir>/terminus-ui$1/src/public-api.ts',
    '^@terminus/ui(.*)/testing$': '<rootDir>/terminus-ui$1/testing/src/public-api.ts',
  },
}
