module.exports = {
  clearMocks: true,
  collectCoverageFrom: [
    'terminus-ui/**/!(index|public-api|*.module|*.interface|*.constant|*.mock|*.d).ts',
    'terminus-ui/**/*.directive.ts',
    '!terminus-ui/**/testing/**',
  ],
  coverageDirectory: '<rootDir>/coverage/',
  globals: {
    'ts-jest': {
      tsConfig: './terminus-ui/tsconfig.spec.json',
      ignoreCoverageForAllDecorators: true,
      diagnostics: false,
      stringifyContentPathRegex: '\\.html$',
      astTransformers: [require.resolve('jest-preset-angular/InlineHtmlStripStylesTransformer')],
    },
  },
  moduleFileExtensions: [
    'ts',
    'js',
    'html',
  ],
  moduleNameMapper: {
    'app/(.*)': '<rootDir>/demo/app/$1',
    'assets/(.*)': '<rootDir>/demo/assets/$1',
    'environments/(.*)': '<rootDir>/demo/environments/$1',
    '^@terminus/ui(.*)$': '<rootDir>/terminus-ui$1/src/public-api.ts',
    '^@terminus/ui(.*)/testing$': '<rootDir>/terminus-ui$1/testing/src/public-api.ts',
  },
  preset: 'jest-preset-angular',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: '<rootDir>/coverage/junit/',
        outputName: 'report.xml',
      },
    ],
  ],
  setupFilesAfterEnv: ['<rootDir>/tooling/jest-setup.ts'],
  snapshotSerializers: [
    'jest-preset-angular/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
  testMatch: [
    '<rootDir>/**/?(*.)spec.ts?(x)',
    '<rootDir>/**/?(*.)test-sass.js?(x)',
  ],
  transform: {'^.+\\.(ts|js|html)$': 'ts-jest'},
  transformIgnorePatterns: [
    'node_modules/(?!@ngrx)',
  ],
};

