import { GetStaticProps, GetStaticPaths, NextPage } from 'next'
import Layout from 'components/Layout'
import Head from 'components/Head'
import Icon from 'components/icon'
import { SITE_TITLE, URL_HOST, OG_IMAGE_URL } from 'constant'
import { getPost, getPostSlugs } from 'lib/getPost'
import { Post } from 'lib/types/post'
import styles from 'styles/markdown.module.css'

type Props = Post

const Page: NextPage<Props> = ({ title, publishedAt, content, slug, tags }) => {
  const description =
    content.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '').slice(0, 100) + '...'
  const url = `${URL_HOST}/${slug}`
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
              <time>{publishedAt}</time>
            </span>
            {tags && (
              <div className="ml-3">
                {tags.map(tag => (
                  <span
                    key={tag}
                    className="font-consolas text-gray-700 ml-2 first:ml-0"
                  >
                    <span className="pr-0.5">#</span>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>
        <section>
          <div
            dangerouslySetInnerHTML={{ __html: content }}
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

export const getStaticProps: GetStaticProps<Props, { slug: string }> = async ({
  params,
}) => {
  if (!params?.slug) throw new Error('Missing slug params')

  const { slug } = params

  const content = await getPost(Array.isArray(slug) ? slug[0] : slug)
  return {
    props: { ...content },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getPostSlugs().map(slug => ({
    params: { slug },
  }))
  return { paths, fallback: false }
}

export default Page
