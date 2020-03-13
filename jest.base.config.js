module.exports = {
  clearMocks: true,
  collectCoverageFrom: [
    'projects/library/**/!(index|public-api|*.module|*.interface|*.constant|*.mock|*.d).ts',
    'projects/library/**/*.directive.ts',
    '!projects/library/**/testing/**',
  ],
  coverageDirectory: '<rootDir>/coverage/',
  globals: {
    'ts-jest': {
      tsConfig: 'projects/library/tsconfig.spec.json',
      ignoreCoverageForAllDecorators: true,
      diagnostics: false,
      stringifyContentPathRegex: '\\.html$',
      astTransformers: [
        'jest-preset-angular/build/InlineFilesTransformer',
        'jest-preset-angular/build/StripStylesTransformer',
      ],
    },
  },
  moduleFileExtensions: [
    'ts',
    'js',
    'html',
  ],
  moduleNameMapper: {
    'app/(.*)': '<rootDir>/projects/demo/app/$1',
    'assets/(.*)': '<rootDir>/projects/demo/assets/$1',
    'environments/(.*)': '<rootDir>/projects/demo/environments/$1',
    '^@terminus/ui(.*)$': '<rootDir>/projects/library$1/src/public-api.ts',
    '^@terminus/ui(.*)/testing$': '<rootDir>/projects/library$1/testing/src/public-api.ts',
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
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
  testMatch: [
    '<rootDir>/**/?(*.)spec.ts?(x)',
    '<rootDir>/**/?(*.)test-sass.js?(x)',
  ],
  transform: { '^.+\\.(ts|js|html)$': 'ts-jest' },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!@ngrx|popper)',
  ],
};

