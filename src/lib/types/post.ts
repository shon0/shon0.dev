export type MatterData = {
  title: string // タイトル
  publishedAt: string // 公開日
  draft?: boolean // 下書き
  tags?: string[] // タグ
}

export type Post = {
  content: string
  slug: string
} & MatterData
