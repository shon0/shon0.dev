import { GetStaticProps, GetStaticPaths, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'
import Layout from 'components/Layout'
import Head from 'components/Head'
import { SITE_TITLE, URL_HOST, OG_IMAGE_URL } from 'constant'
import { getPost, getPostSlugs } from 'lib/getPost'
import styles from 'styles/markdown.module.css'

type Props = {
  title: string
  published: boolean
  content: string
  slug: string
}

const Page: NextPage<Props> = ({ title, published, content, slug }) => {
  return (
    <Layout>
      <Head
        title={`${title} | ${SITE_TITLE}`}
        description={content
          .replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '')
          .slice(0, 100) + '...'}
        url={`${URL_HOST}/${slug}`}
        image={encodeURI(`${OG_IMAGE_URL}/${title}?theme=shon0.dev`)}
      />
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
    props: { ...content, slug },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getPostSlugs().map(slug => ({
    params: { slug },
  }))
  return { paths, fallback: false }
}

export default Page
