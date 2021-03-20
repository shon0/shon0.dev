import {
  GetStaticPaths,
  NextPage,
  InferGetStaticPropsType,
  GetStaticPropsContext,
} from 'next'
import ErrorPage from 'next/error'
import dayjs from 'dayjs'
import Layout from 'components/Layout'
import Head from 'components/Head'
import Icon from 'components/icon'
import { SITE_TITLE, URL_HOST, OG_IMAGE_URL } from 'constant'
import styles from 'styles/markdown.module.css'
import { client } from 'api'
import processor from 'lib/processor'

type Props = InferGetStaticPropsType<typeof getStaticProps>

const Page: NextPage<Props> = ({ id, title, publishedAt, body }) => {
  if (!id) {
    return <ErrorPage statusCode={404} />
  }

  const description =
    body.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '').slice(0, 100) + '...'
  const url = `${URL_HOST}/${id}`
  const tweetUrl = encodeURI(
    `http://twitter.com/share?url=${url}&text=${title} | ${SITE_TITLE.replace(
      '.',
      '',
    )}`,
  )
  const imageUrl = encodeURI(`${OG_IMAGE_URL}/${title}.png?theme=shon0.dev`)

  return (
    <Layout>
      <Head
        title={`${title} | ${SITE_TITLE}`}
        description={description}
        url={url}
        image={imageUrl}
      />
      <article>
        <header className="mb-10">
          <h1 className="text-4xl font-bold leading-normal">{title}</h1>
          <div className="flex mt-3">
            <span className="font-consolas text-gray-800">
              <time>{dayjs(publishedAt).format('YYYY/MM/DD')}</time>
            </span>
          </div>
        </header>
        <section>
          <div
            dangerouslySetInnerHTML={{ __html: body }}
            className={styles['markdown']}
          />
        </section>
      </article>
      <div className="mt-3 px-3 flex justify-end">
        <a
          href={tweetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-twitter"
        >
          <Icon.Twitter />
        </a>
      </div>
    </Layout>
  )
}

export const getStaticProps = async (
  context: GetStaticPropsContext<{
    slug: string
  }>,
) => {
  const slug = context.params?.slug
  const draftKey = context.previewData?.draftKey

  if (!slug) throw new Error('Missing slug params')

  const article = await client.articles
    ._contentId(slug)
    .$get({ query: { draftKey: draftKey ?? undefined } })

  const body = await processor.process(article.body)
  return {
    props: { ...article, body: body.toString() },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  client.articles.$get()
  const articles = await client.articles.$get({ query: { fields: 'id' } })
  const paths = articles.contents.map(article => ({
    params: { slug: article.id },
  }))
  return { paths, fallback: true }
}

export default Page
