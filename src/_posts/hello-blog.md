---
title: Next.jsでブログを作って、動的OGPも用意した
publishedAt: 2020/12/22
tags: ['Next.js']
draft: true
---

Jamstackな構成を作ってみたくて、Next.jsでブログを作ってみました。
記事の管理はHeadlessCMSは使用せず、Markdownファイルをディレクトリ内に配置するかたちで運用しています。

リポジトリはこちら

- https://github.com/shon0/Blog

# Next.js

まず定番ですが Next.js を使ってSSGをしています。

`getStaticPaths` でMarkdownファイルを取得して、ファイル名をパスとして返却しています。

```ts
const getPostSlugs = () => {
  const filenames = fs.readdirSync(DIR)
  const slugs = filenames
    .filter(filename => path.parse(filename).ext === EXTENSION)
    .map(filename => path.parse(filename).name)

  return slugs
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getPostSlugs().map(slug => ({
    params: { slug },
  }))
  return { paths, fallback: false }
}
```

これで各記事のファイル各をURLのパスとしてセットされます。

次に `getStaticProps` で記事の内容を返しています。

```ts
export const getStaticProps: GetStaticProps<Props, { slug: string }> = async ({
  params,
}) => {
  if(!params?.slug) throw new Error("Missing slug params");
  
  const { slug } = params

  const content = await getPost(Array.isArray(slug) ? slug[0] : slug)
  return {
    props: { ...content },
  }
}
```

# Markdown

front matter を

# Tailwind

# サイトマップ

# 動的OGP

![動的OGP](https://og-image.shon0.dev/Next.js%E3%81%A7%E3%83%96%E3%83%AD%E3%82%B0%E3%82%92%E4%BD%9C%E3%81%A3%E3%81%A6%E3%80%81%E5%8B%95%E7%9A%84OGP%E3%82%82%E7%94%A8%E6%84%8F%E3%81%97%E3%81%9F.png?theme=shon0.dev)

# lighthouse