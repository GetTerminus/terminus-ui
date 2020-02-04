module.exports = {
  "extends": ["@terminus/eslint-config-frontend/development"],
  "parserOptions": {
    "ecmaVersion": 6,
    "project": "./tsconfig.json",
    "sourceType": "module",
  },
  "root": true,
  "rules": {
    // TODO: Remove once all `console.warn`s have been converted to JS errors.
    "no-console": [
      "error",
      {
        "allow": [
          "warn",
        ],
      },
    ],
  },
  "overrides": [
    // Spec files:
    {
      "files": [
        "*.spec.ts",
        "*.mock.ts",
        // Sass test file:
        "test-sass.js",
        // Test helper files:
        "test-*.ts",
      ],
      "env": {
        "jest": true,
      },
      "rules": {
        "dot-notation": "off",
        "guard-for-in": "off",
        "line-comment-position": "off",
        "no-console": "off",
        "no-magic-numbers": "off",
        "no-underscore-dangle": "off",
      },
    },
  ],
};
