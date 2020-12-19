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
        'noto-mont': [
          'Noto Sans JP',
          'Montserrat',
          '-apple-system',
          'Segoe UI',
          'Helvetica Neue',
          'Hiragino Kaku Gothic ProN',
          'メイリオ',
          'meiryo',
          'sans-serif',
        ],
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
