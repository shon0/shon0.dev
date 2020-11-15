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
    <Layout title="">
      {posts.map(post => (
        <div key={post.slug} className="post-teaser">
          <h2>
            <Link href="/posts/[id]" as={`/posts/${post.slug}`}>
              <a>{post.title}</a>
            </Link>
          </h2>
          <div>
            <span>{post.published}</span>
          </div>
        </div>
      ))}
      <style jsx>{`
        .post-teaser {
          margin-bottom: 2em;
        }
        .post-teaser h2 a {
          text-decoration: none;
        }
        .home-archive {
          margin: 3em;
          display: flex;
          flex-direction: row;
          justify-content: center;
        }
      `}</style>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const MAX_COUNT = 5
  const posts = await getPosts()
  return {
    props: {
      posts: posts.slice(0, MAX_COUNT),
    },
  }
}

export default Page
