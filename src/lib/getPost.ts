import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import markdownToHtml from './markdownToHtml'
import { MatterData } from './types/post'

const DIR = path.join(process.cwd(), 'src/_posts')
const EXTENSION = '.md'

const getPostSlugs = () => {
  const filenames = fs.readdirSync(DIR)
  const slugs = filenames
    .filter(filename => path.parse(filename).ext === EXTENSION)
    .map(filename => path.parse(filename).name)

  return slugs
}

const getPost = async (slug: string) => {
  const raw = fs.readFileSync(path.join(DIR, `${slug}${EXTENSION}`), 'utf8')
  const matterResult = matter(raw)
  const matterData = matterResult.data as MatterData
  const parsedContent = await markdownToHtml(matterResult.content)
  const content = parsedContent.toString()

  return {
    content,
    slug,
    ...matterData,
  }
}

const getPosts = async () => {
  const posts = await Promise.all(
    getPostSlugs().map(async slug => {
      const post = await getPost(slug)
      return { ...post }
    }),
  )
  return posts
    .filter(post => !post.draft)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
}

export { getPostSlugs, getPost, getPosts }
