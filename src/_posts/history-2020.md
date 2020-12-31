---
title: 2020年を振り返る
publishedAt: 2020/12/31
tags: []
---

2020年を簡単に振り返ってみる。

# メインで使った技術

## Next.js

Next.jsはv7くらいから使い始めて、今年も使い続けている。

今年は世の中的にNext.jsがスタンダードになってきたので嬉しい。

## GraphQL

今年はGraphQLの採用を進めた１年だった。

まずはRESTをGraphQLでラップしたBFFをNext.jsのAPIルートに載せるかたちで試し始めた。

なかなか良かったので、サーバー側のREST→GraphQLへの移行がいまは進めらている。

フロント側はApolloではなく、シンプルな内容になっている [URQL](https://formidable.com/open-source/urql/) を好んで採用している。

個人的には、フロントからGraphQLを使い慣れた程度なので、GraphQLサーバーの実装も身につけていきたい。

## Tailwind CSS

Utility FirstなCSSフレームワーク。

いままで、スタイリングには `styled-components` を使うことが多かったが、今年はTailwindしか使ってない。

CSS設計と向き合えていない自分には使い勝手が良い。

[Next.jsでもTailwindをサポートする議論](https://github.com/vercel/next.js/discussions/20030)がされていて、もし導入されればTailwindの普及はさらに加速しそう。

ちなみに、同じUtility FirstなUIフレームワークである [Chakra UI](https://chakra-ui.com/) も導入した。導入した当時はTypeScriptで実装されてないこともあり、型で不整合が起きていて辛かった記憶がある。（いまはTypeScriptで書き直されているので改善されていそう）

## React Native

Swift/KotlinのアプリをReact Nativeへリプレースするプロジェクトを担当することになった。

React Nativeに長けた人がほぼいないなかでの開発だったので、とにかくキャッチアップした。アプリ開発やOS周りの経験・知識が圧倒的に不足していたので開発中苦しい場面が何度もあった。このあたり、なんとか乗り越えてきたので自信に繋がっている気がする。

Web→Appへと自分の領域を広げたのは、2020年で1番大きなチャレンジだったと思う。

# その他

以下の内容を個人的に勉強した。

### Go
以下の本をさらっとやった程度。使う機会を作れなかったので伸びなかった。

- [スターティングGo言語](https://www.amazon.co.jp/%E3%82%B9%E3%82%BF%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0Go%E8%A8%80%E8%AA%9E-%E6%9D%BE%E5%B0%BE%E6%84%9B%E8%B3%80-ebook/dp/B01FH3KRTI/ref=sr_1_8?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&dchild=1&keywords=go&qid=1609400618&sr=8-8)

- [Goプログラミング実践入門　標準ライブラリでゼロからWebアプリを作る](https://www.amazon.co.jp/Go%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%9F%E3%83%B3%E3%82%B0%E5%AE%9F%E8%B7%B5%E5%85%A5%E9%96%80-%E6%A8%99%E6%BA%96%E3%83%A9%E3%82%A4%E3%83%96%E3%83%A9%E3%83%AA%E3%81%A7%E3%82%BC%E3%83%AD%E3%81%8B%E3%82%89Web%E3%82%A2%E3%83%97%E3%83%AA%E3%82%92%E4%BD%9C%E3%82%8B-impress-gear%E3%82%B7%E3%83%AA%E3%83%BC%E3%82%BA-Sheong-Chang-ebook/dp/B06XKPNVWV/ref=sr_1_7?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&dchild=1&keywords=go&qid=1609400618&sr=8-7)

### GitHub Actions

GitHubの[Learning Lab](https://lab.github.com/)でGithub Actionsについて学習した。

そのあと、仕事でも使ったので学習効果を強く感じた。

### Docker

Udemyの[ゼロからはじめる Dockerによるアプリケーション実行環境構築](https://www.udemy.com/course/docker-k/)というコースを見て勉強した。

フロントエンド、アプリ開発しかしてないので、使うときがなくコースを消化しただけとなってる…

### Figma

社内でFigmaを使っていることもあり入門した。

chot.designの[UI/UXデザインツール『Figma』入門](https://chot.design/figma-beginner/)を進めた。（最後の章だけ終わってない）

まだワイヤーフレームをを1人で作りきれる自信はない…

# まとめ

- React Nativeを始めて、ネイティブアプリへの理解がついた
- GraphQLをフロントから使い慣れた
- CIを使い慣れた
- 反復的に使わない内容は勉強しても、効果が低いのを感じた
- ブログを作ってリリースできた

2021年はとりあえずサーバーサイドへと領域を広げていきたい。