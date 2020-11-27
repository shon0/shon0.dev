import { GetStaticProps, GetStaticPaths, NextPage } from 'next'
import Layout from 'components/Layout'
import { getPost, getPostSlugs } from 'lib/getPost'
import { ParsedUrlQuery } from 'querystring'
import styles from 'styles/markdown.module.css'

type Props = {
  title: string
  published: boolean
  content: string
}

const Page: NextPage<Props> = ({ title, published, content }) => {
  return (
    <Layout title={title}>
      <article>
        <header className="mb-10">
          <h1 className="font-montserrat text-4xl font-bold leading-normal">
            {title}
          </h1>
          <div className="mt-3">
            <span className="font-consolas text-gray-800">
              <time>{published}</time>
            </span>
          </div>
        </header>
        <section>
          <div
            dangerouslySetInnerHTML={{ __html: content }}
            className={styles['markdown']}
          />
        </section>
      </article>
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
