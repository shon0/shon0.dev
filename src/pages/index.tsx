import { NextPage, GetStaticProps } from 'next'
import Link from 'next/link'
import Layout from 'components/Layout'
import { getPosts } from 'lib/getPost'

type Props = {
  posts: {
    slug: string
    title: string
    published: string
  }[]
}

const Page: NextPage<Props> = ({ posts }) => {
  return (
    <Layout>
      <div>
        {posts.map(post => (
          <div key={post.slug} className="mb-5">
            <Link href="/posts/[id]" as={`/posts/${post.slug}`}>
              <a className="font-montserrat text-2xl font-bold leading-normal tracking-wide text-black hover:text-blue-500">
                {post.title}
              </a>
            </Link>
            <div>
              <span className="font-consolas text-gray-800 text-sm">
                {post.published}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const MAX_COUNT = 5
  const posts = await getPosts()
  return {
    props: {
      posts: posts.slice(0, MAX_COUNT),
    },
  }
}

export default Page
