import { ContentResponse, GetContentQuery } from '../../common'

export type Article = ContentResponse<{
  title: string
  body: string
}>

export interface Methods {
  get: {
    query?: GetContentQuery
    resBody: Article
  }
}
