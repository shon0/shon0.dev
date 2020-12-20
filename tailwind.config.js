module.exports = {
  purge: {
    content: ['./src/{components,pages}/**/*.{ts,tsx}'],
    options: {
      safelist: ['inline', 'align-baseline'],
    },
  },
  theme: {
    extend: {
      fontFamily: {
        consolas: [
          'Consolas',
          'Menlo',
          'Monaco',
          'source-code-pro',
          'Courier New',
          'monospace',
        ],
        inconsolata: ['Inconsolata'],
      },
      textColor: {
        twitter: '#00acee',
      },
    },
  },
  variants: {
    extend: {
      visibility: ['hover', 'focus'],
    },
  },
  plugins: [],
}
