module.exports = {
  extends: [
    './node_modules/prettier-stylelint/config.js',
    'stylelint-config-standard',
  ],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
          'layer',
        ],
      },
    ],
    'declaration-block-trailing-semicolon': null,
    'no-descending-specificity': null,
    'declaration-colon-newline-after': null,
    'font-family-no-missing-generic-family-keyword': null,
  },
}
