module.exports = {
  extends: '@terminus/stylelint-config-frontend',
  rules: {
    'no-eol-whitespace': [true, { ignore: 'empty-lines' }],
    // TODO: remove once stylelint config is updated
    'scale-unlimited/declaration-strict-value': [
      [
        'box-shadow',
        '/^((.+-)?(color))$/',
        '/font/',
        '/^(margin|padding)(-top|-left|-bottom|-right)?/',
        'z-index',
      ],
      {
        disableFix: true,
        ignoreFunctions: true,
        ignoreKeywords: {
          '': [
            'auto',
            'currentColor',
            'inherit',
            'none',
          ],
          '/^((.+-)?(color))$/': [
            'currentColor',
            'inherit',
            'transparent',
          ],
          '/^(margin|padding)(-top|-left|-bottom|-right)?/': [
            '0',
            'auto',
            'none',
            'unset',
          ],
          'z-index': [
            -1,
            1,
            'auto',
          ],
        },
      },
    ],
  },
};
