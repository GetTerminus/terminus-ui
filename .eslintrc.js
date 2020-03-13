const SEVERITY = 'error';
const DISABLED = 'off';


module.exports = {
  root: true,
  extends: ['@terminus/eslint-config-frontend'],
  rules: {
    'jsdoc/require-jsdoc': SEVERITY,
  },
  overrides: [
    // TypeScript and Angular specific rules
    {
      files: ['*.ts'],
      rules: {
        // TODO: Do I need to redefine the entire rule here? Or can I just add the prefix array?
        '@angular-eslint/component-selector': [
          SEVERITY,
          {
            type: 'element',
            // TODO: change 'app' to 'vr'
            prefix: ['ts', 'app', 'demo'],
            style: 'kebab-case',
          },
        ],
        '@angular-eslint/directive-selector': [
          SEVERITY,
          {
            type: 'attribute',
            // TODO: change 'app' to 'vr'
            prefix: ['ts', 'app', 'demo'],
            style: 'camelCase',
          },
        ],
        // For performance, prefer OnPush
        '@angular-eslint/prefer-on-push-component-change-detection': SEVERITY,
      },
    },


    // Test helper files
    {
      'files': [
        '**/*.spec.ts',
        '**/*.mock.ts',
        '**/test-helpers.ts',
        '**/test-components.ts',
      ],
      'rules': {
        '@angular-eslint/prefer-on-push-component-change-detection': DISABLED,
      },
    },

    // Demo project
    {
      files: [
        'projects/demo/**/*.ts',
        'projects/visual-regression/**/*.ts',
      ],
      rules: {
        '@angular-eslint/prefer-on-push-component-change-detection': DISABLED,
        '@typescript-eslint/explicit-member-accessibility': DISABLED,
        '@typescript-eslint/member-ordering': DISABLED,
        '@typescript-eslint/no-explicit-any': DISABLED,
        '@typescript-eslint/no-magic-numbers': DISABLED,
        '@typescript-eslint/no-non-null-assertion': DISABLED,
        'no-console': DISABLED,
        'jsdoc/require-jsdoc': DISABLED,
      },
    },
  ],
};
