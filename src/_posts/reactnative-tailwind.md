---
title: React NativeでもTailwindを使いたい
publishedAt: 2020/12/25
tags: ['ReactNative', 'tailwind']
---

[Zenn](https://zenn.dev/shon0/articles/3157650d9b3cb1b0eb41)でも同様の内容を投稿しています。

React Native の標準スタイリングである `StyleSheet` も良いのですが、どうも開発スピードが上がらなかったため `tailwind-rn` を使って `Tailwind` を導入したので、使い方について紹介。

# tailwind-rn を導入

React Native で tailwind を使う場合は、以下のライブラリを使います。

- https://github.com/vadimdemedes/tailwind-rn

このライブラリは以下の機能を提供しています。
- tailwindのCSSをReact Nativeのスタイルとして使えるように修正してJSONファイルとして生成するCLIツール
- アプリケーション内で使用するスタイルを生成する関数

## 導入手順

とりあえずインストール。

```shell
$ npm install tailwind-rn
// or
$ yarn add tailwind-rn
```

### tailwind.config.js を作成する

以下のコマンドで、 `tailwind.config.js` が生成します。

```shell
$ npx tailwindcss init
```

`tailwind.config.js`は[Tailwindの構成](https://tailwindcss.com/docs/configuration)についてカスタマイズを定義するファイルです。

### tailwind-rn の設定

以下のコマンドで、`tailwind.config.js` の設定をもとに `styles.json` が生成されます。

```shell
$ npx create-tailwind-rn
```
`styles.json` にはTailwindのCSSをReact Nativeでも使えるように変換されたものが入っています。

ここで注意すべき点は、Tailwindには存在するがReact Nativeでは使用できないようなスタイルは事前に生成しないようになっていることです。

何が生成される対象なのかは、以下を確認してください。
- https://github.com/vadimdemedes/tailwind-rn#supported-utilities

---

次に`create()`にさっき生成したJSONを渡して、`tailwind`を作ります。exportしてコンポーネントから使えるようにしておきます。

```typescript
// tailwind.ts
import { create } from 'tailwind-rn'
import styles from './styles.json'

const { tailwind } = create(styles)
export { tailwind }
```

`create` で `getColor` というのも返ってくるのですが、今回は説明しないです。(https://github.com/vadimdemedes/tailwind-rn#getcolorcolor)


### スタイリング方法

さきほど作成した `tailwind` 関数を使ってスタイリングをします。

この関数は `tailwind('flex-1')` といったように、 Tailwindで使うclass名を文字列として渡すことで、React Nativeのstyleで使用できるオブジェクトが返ってきます。

なので、 `<View style={tailwind('flex-1')} />` でスタイリングができます。

複数のスタイルをあてるには、スペース区切りで１つの文字列として渡します。
`tailwind('flex-1 justify-center items-center')` 

`tailwind（）`に使える文字列は厳密には、`create()`の引数に渡したオブジェクトのキーです

以下はコンポーネント内で使用した例です。

```tsx
import React from 'react'
import { View, Text } from 'react-native'
import { tailwind } from './tailwind'

const Component = () => {
    return(
        <View style={tailwind('flex-1 justify-center items-center')}>
            <Text style={tailwind('text-lg')}>中央に大きめの文字が表示されるよ</Text>
        </View>
    )
}

export default Component
```

## カスタマイズ

`tailwind.config.js` から `theme` を拡張することでデフォルトで生成されるスタイルを変更したり、追加したりできます。(テーマ拡張は[こちら](https://tailwindcss.com/docs/theme)を参考にしてください。)

React NativeのスタイリングはCSSと似ていますが異なります。そのためtailwindにあるすべてのスタイルが使用できるわけではありません。

`tailwind-rn` では、それを見越して React Native で使えないものは生成しない、あるいは使えるように変換してくれています。
そのため`tailwind-rn`が標準で生成しないものをtheme拡張で追加しようとしても上手くいかないケースがあります。

そういったケースに対応するには、
`custom-styles.json`などを作成して、そこに独自のスタイルを追加して、`tailwind` 関数を作るときにで `styles.json` と合わせて引数に渡します。(最終的にオブジェクトであればいいので必ずしもJSONで定義する必要はありません)

```typescript
import { create } from 'tailwind-rn'
import styles from './styles.json' // tailwind-rnで生成されたスタイル
import custom from './custom-styles.json' // 独自で追加したいスタイル

const { tailwind, getColor } = create({ ...styles, ...custom })
export { tailwind, getColor }
```

苦肉の策ですが、この対応方法でおおよそのケースには対応できると思います。


# 拡張機能

VSCodeを使うことで、tailwindの拡張機能を使うことができます。

https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss

この拡張機能をつかうと、入力の補完ができます。

ですが、候補が出てくる条件が`class=`、`className=`と決まっているため`tailwind()`や`style=`では表示されません。(対応してほしいというIssueはありましたが、`tailwind-rn`は公式のパッケージではないので対応しない方針のようです。残念。)

もし拡張機能を利用したいなら、頻出するコンポーネントを `class` あるいは `className` のpropsでスタイリングできるようにラップするしかなさそうです。

以下は `View` コンポーネントをラップしたものです。

```tsx
// components/View.tsx
import React from 'react'
import { View } from 'react-native'
import { tailwind } from '~/config/tailwind'

const Component: React.FC<
  React.ComponentProps<typeof View> & {
    className?: string
  } => ({ className, children, style, ...rest }) => (
  <View style={[className ? tailwind(className) : undefined, style]} {...rest}>
    {children}
  </View>
)

export default Component
```

これで`className`で受け取れるので入力の補完が効きます。

```tsx
import React from 'react'
import { Text } from 'react-native'
import View from '~/components/View'

const Component = () => {
    return(
        <View className="flex-1 justify-center items-center">
            <Text>中央に文字が表示されるよ。</Text>
        </View>
    )
}

// styleも使えるので、tailwindにはないスタイルが必要な場合はこんな書き方になる
const WithStyle = () => {
    return(
        <View className="flex-1 justify-center items-center bg-black">
            <View className="bg-white" style={{ height: 50, width: 50 }}>
                <Text>黒い背景の中央に白い正方形と文字が表示されるよ。</Text>
            </View>
        </View>
    )
}

```

これも苦肉の策ですね…

# まとめ

Web開発でTailwindを使ったときの体験が忘れられず、React Nativeでもと思って導入してみました。

CSSとの差異や拡張機能の対応など、Webでの開発ほどはTailwindの恩恵にはあずかれていないのが現状ですが、個人的には標準のスタイリングよりはスピード感持って開発できています。

Tailwindを使ったことある人はぜひReact Nativeでも使ってみてください 🙌