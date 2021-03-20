import { NextApiHandler } from 'next'
import { client } from 'api'

const apiHandler: NextApiHandler = async (req, res) => {
  if (!req.query.slug) {
    return res.status(404).end()
  }

  const validate = (params: string | string[]) =>
    Array.isArray(params) ? params[0] : params
  
  const slug = validate(req.query.slug)
  const draftKey = validate(req.query.draftKey)

  const content = await client.articles
    ._contentId(slug)
    .$get({
      query: { fields: 'id', draftKey },
    })

  if (!content) {
    return res.status(401).json({ message: 'Invalid slug' })
  }

  res.setPreviewData({
    slug: content.id,
    draftKey: req.query.draftKey,
  })
  res.writeHead(307, { Location: `/posts/${content.id}` })
  res.end('Preview mode enabled')
}

export default apiHandler
