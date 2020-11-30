module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
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
    'declaration-empty-line-before': 'never',
    indentation: 2,
    'no-missing-end-of-source-newline': null,
    'string-quotes': 'single',
  },
}
