import fs from 'fs'
import path from 'path'
import remark from 'remark'
import html from 'remark-html'
import matter from 'gray-matter'
import dayjs from 'dayjs'

const DIR = path.join(process.cwd(), 'src/_posts')
const EXTENSION = '.md'

const getPostSlugs = () => {
  const filenames = fs.readdirSync(DIR)
  const slugs = filenames
    .filter(filename => path.parse(filename).ext === EXTENSION)
    .map(filename => path.parse(filename).name)

  return slugs
}

type GetPost = {
  slug: string
}

type MatterData = {
  title: string
  published: string
}

const getPost = async ({ slug }: GetPost) => {
  const raw = fs.readFileSync(path.join(DIR, `${slug}${EXTENSION}`), 'utf8')
  const matterResult = matter(raw)
  const { title, published } = matterResult.data as MatterData
  const parsedContent = await remark().use(html).process(matterResult.content)
  const content = parsedContent.toString()
  const publishedDate = dayjs(published).format('YYYY/MM/DD')

  return {
    title,
    published: publishedDate,
    content,
    slug,
  }
}

const getPosts = async () => {
  const contents = await Promise.all(
    getPostSlugs().map(slug => getPost({ slug })),
  )
  return contents.sort((a, b) => (a.published < b.published ? 1 : -1))
}

export { getPostSlugs, getPost, getPosts }
