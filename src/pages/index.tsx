import { NextPage, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import dayjs from 'dayjs'
import Layout from 'components/Layout'
import Head from 'components/Head'
import { SITE_TITLE, URL_HOST } from 'constant'
import { client } from 'api'

type Props = InferGetStaticPropsType<typeof getStaticProps>

const Page: NextPage<Props> = ({ articles }) => {
  return (
    <Layout>
      <Head
        title={SITE_TITLE}
        description={'なんのクセもないブログ'}
        url={URL_HOST}
        image={`${URL_HOST}/og-image.png`}
      />
      <div>
        {articles.contents.map(article => (
          <div key={article.id} className="mb-5">
            <Link href="/posts/[id]" as={`/posts/${article.id}`}>
              <a className="text-2xl font-bold leading-normal tracking-wide text-black hover:text-gray-700">
                {article.title}
              </a>
            </Link>
            <div className="flex items-center">
              <span className="font-consolas text-gray-800 text-sm">
                {dayjs(article.publishedAt).format('YYYY/MM/DD')}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export const getStaticProps = async () => {
  const articles = await client.articles.$get({
    query: { fields: 'id,title,publishedAt' },
  })

  return {
    props: { articles },
  }
}

export default Page
