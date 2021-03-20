import { ListContentsResponse, GetListContentsQuery } from '../common'
import { Article } from './_contentId@string'

type ArticleList = ListContentsResponse<Article>

export interface Methods {
  get: {
    query?: GetListContentsQuery
    resBody: ArticleList
  }
}

export type { Article, ArticleList }
