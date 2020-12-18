import { NextPage, GetStaticProps } from 'next'
import Link from 'next/link'
import Layout from 'components/Layout'
import Head from 'components/Head'
import { getPosts } from 'lib/getPost'
import { SITE_TITLE, URL_HOST } from 'constant'

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
      <Head
        title={SITE_TITLE}
        description={'なんのクセもないブログ'}
        url={URL_HOST}
        image={`${URL_HOST}/og-image.png`}
      />
      <div>
        {posts.map(post => (
          <div key={post.slug} className="mb-5">
            <Link href="/posts/[id]" as={`/posts/${post.slug}`}>
              <a className="font-montserrat text-2xl font-bold leading-normal tracking-wide text-black hover:text-gray-700">
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
  const posts = await getPosts()
  return {
    props: { posts },
  }
}

export default Page
