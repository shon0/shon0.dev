---
title: Next.jsでブログを作って、動的OGPも用意した
publishedAt: 2020/12/25
tags: ['Next.js']
---

Jamstackな構成を作ってみたくて、Next.jsでブログを作ってみました。
記事の管理はHeadlessCMSは使用せず、Markdownファイルをディレクトリ内に配置するかたちで運用しています。

リポジトリはこちら

- https://github.com/shon0/Blog

# Next.js

まず定番ですが Next.js を使ってSSGをしています。

`getStaticPaths` でMarkdownファイルを取得して、ファイル名をパスとして返却しています。

```ts
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getPostSlugs().map(slug => ({
    params: { slug },
  }))
  return { paths, fallback: false }
}
```

これで各記事のファイル各をURLのパスとしてセットされます。

次に `getStaticProps` で記事のコンテンツを返しています。

```ts
export const getStaticProps: GetStaticProps<Props, { slug: string }> = async ({
  params,
}) => {
  if (!params?.slug) throw new Error('Missing slug params')

  const content = await getPost(params.slug)
  return {
    props: { ...content },
}
```

# Markdown

Markdownのヘッダに Front Matter という記法でタイトルや公開日などのメタ情報を書いています。

```md
---
title: Next.jsでブログを作って、動的OGPも用意した
publishedAt: 2020/12/25
tags: ['Next.js']
---
```
これを [gray-matter](https://github.com/jonschlinkert/gray-matter) を使ってオブジェクトに変換しています。

```ts
import matter from 'gray-matter'

// markdownファイルを取得
const raw = fs.readFileSync(path.join(DIR, `${slug}.md`), 'utf8')

// gray-matterを使ってFrontMatterを変換
const matterResult = matter(raw)
```

MarkdownのHTMLへの変換は [unified](https://github.com/unifiedjs/unified) という構文解析ライブラリを使っています。

これを使って以下のよう変換しています。

```ts
import unified from 'unified'
import markdown from 'remark-parse'
import gfm from 'remark-gfm'
import slug from 'rehype-slug'
import autolink from 'rehype-autolink-headings'
import remark2rehype from 'remark-rehype'
import stringify from 'rehype-stringify'
import prism from '@mapbox/rehype-prism'

const markdownToHtml = async (content: string) => {
  return await unified()
    .use(markdown)        // Markdownを構文木に変換
    .use(gfm)             // GitHub Flavored Markdown を使えるようにする
    .use(remark2rehype)   // マークダウンからHTMLに変換
    .use(slug)            // h1などの見出しタグにidを追加
    .use(autolink, {      // 見出しタグのidをもとにリンク要素に作成
      content: linkIcon,
    })
    .use(prism)           // シンタックスハイライト
    .use(stringify)       // rehypeの構文木を文字列に変換
    .process(content)
}
```

# Tailwind CSS

スタイリングは [Tailwind CSS](https://tailwindcss.com/) を使っています。

これはいくつかのプロジェクトで採用しており、使い勝手が良いの採用しています。

基本はTailwindなのですが、部分的にCSS Modulesを使っているところがあるのでTailwindで統一できるようにしていきたい。

# サイトマップ

[nextjs-sitemap-generator](https://github.com/IlusionDev/nextjs-sitemap-generator) を使ってサイトマップを生成しています。

```js
//cli/gen-sitemap.js

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
  ignoredPaths: ['404'],
  ignoreIndexFiles: true,
});
```


サイトマップの生成はPackage.jsonのscriptsに 
```
"postbuild": "node cli/gen-sitemap.js"
```
と追加しておけば便利です。

`postbuild` に指定された内容はビルド後に自動で実行されるので、ビルド+サイトマップ生成がセットで行われるようになります。

# 動的OGP

以下のようなOGP画像を動的に生成しています。

![動的OGP](https://og-image.shon0.dev/Next.js%E3%81%A7%E3%83%96%E3%83%AD%E3%82%B0%E3%82%92%E4%BD%9C%E3%81%A3%E3%81%A6%E3%80%81%E5%8B%95%E7%9A%84OGP%E3%82%82%E7%94%A8%E6%84%8F%E3%81%97%E3%81%9F.png?theme=shon0.dev)

動的OGPは、 [vercel/og-image](https://github.com/vercel/og-image) というVercelが作った動的に画像を作るジェネレーターをカスタマイズして使っています。

URLやクエリパラメータを指定することで、それに合わせた画像を生成できたり、画像のデザインはHTML・CSSを編集することで変更できるので手軽で便利です。

ですが、１つ問題があって日本語フォントを追加しないと日本語が使用できません。今回はGoogle Fontsから日本語フォントをダウンロードして使っています。


# Lighthouse

Lighthouseでも好成績だったので、さすが Next.js という感じです。

![lighthouseの結果](/post/lighthouse-result.png)

---

イチからブログ作ってみるだけでも、色々気づきがあって勉強になりました。

内容より、まず書くことを継続できたらなと思ってます。