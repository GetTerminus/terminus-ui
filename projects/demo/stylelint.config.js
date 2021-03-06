module.exports = {
  extends: '@terminus/stylelint-config-frontend',
  rules: {
    'color-named': null,
    'no-eol-whitespace': [true, { ignore: 'empty-lines' }],
    'plugin/stylelint-no-indistinguishable-colors': null,
    'scale-unlimited/declaration-strict-value': null,
  },
};
