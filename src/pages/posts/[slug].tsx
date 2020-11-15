import { GetStaticProps, GetStaticPaths, NextPage } from 'next'
import Layout from 'components/Layout'
import { getPost, getPostSlugs } from 'lib/getPost'
import { ParsedUrlQuery } from 'querystring'

type Props = {
  title: string
  published: boolean
  content: string
}

const Page: NextPage<Props> = ({ title, published, content }) => {
  return (
    <Layout title={title}>
      <div className="post-meta">
        <span>{published}</span>
      </div>
      <div
        className="post-body"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as Required<ParsedUrlQuery>

  const content = await getPost({ slug: Array.isArray(slug) ? slug[0] : slug })
  return {
    props: {
      ...content,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getPostSlugs().map(slug => ({
    params: { slug },
  }))
  return { paths, fallback: false }
}

export default Page
