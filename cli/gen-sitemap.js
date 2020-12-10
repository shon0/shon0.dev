// eslint-disable-next-line @typescript-eslint/no-var-requires
const sitemap = require('nextjs-sitemap-generator');

sitemap({
  baseUrl: 'https://shon0.dev',
  pagesDirectory: __dirname + '/../.next/server/pages',
  targetDirectory: 'public/',
  ignoredExtensions: ['js', 'map'],
  ignoredPaths: [
    '[id]',
    '404',
    /\/a\/.?/,
  ],
  ignoreIndexFiles: true,
});
