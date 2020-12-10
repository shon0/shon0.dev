/* eslint-disable @typescript-eslint/no-var-requires */

const sitemap = require('nextjs-sitemap-generator');
const fs = require('fs');

const builtDir = fs.existsSync(__dirname + '/../.next/serverless')
  ? __dirname + '/../.next/serverless/pages'
  : __dirname + '/../.next/server/pages';

sitemap({
  baseUrl: 'https://shon0.dev',
  pagesDirectory: builtDir,
  targetDirectory: 'public/',
  ignoredExtensions: ['js', 'map'],
  ignoredPaths: [
    '[id]',
    '404',
    /\/a\/.?/,
  ],
  ignoreIndexFiles: true,
});
