module.exports = {
  purge: ['./src/{components,pages}/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        montserrat: [
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
    },
  },
  variants: {
    extend: {
      visibility: ['hover', 'focus'],
    },
  },
  plugins: [],
}
