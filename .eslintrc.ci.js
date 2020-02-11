module.exports = {
  'extends': ['@terminus/eslint-config-frontend'],
  'parserOptions': {
    'ecmaVersion': 6,
    'project': './tsconfig.json',
    'sourceType': 'module',
  },
  'rules': {
    // TODO: Remove once all `console.warn`s have been converted to JS errors.
    'no-console': [
      'error',
      {
        'allow': [
          'warn',
        ],
      },
    ],
  },
  'overrides': [
    {
      'files': [
        '**/*.spec.ts',
        '**/*.mock.ts',
        '**/test-sass.js',
      ],
      'env': {
        'jest': true,
      },
    },
  ],
};
