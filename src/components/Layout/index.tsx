import Head from 'next/head'
import { SITE_TITLE, URL_HOST } from 'constant'
import Header from './Header'
import Footer from './Footer'

type Props = {
  title?: string
  slug?: string
}

const Component: React.FC<Props> = ({ title, slug, children }) => {
  return (
    <div className="max-w-screen-md mx-auto px-4 sm:px-7">
      <Head>
        <title>{title ? `${title} | ${SITE_TITLE}` : SITE_TITLE}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta
          property="og:title"
          content={title ? `${title} | ${SITE_TITLE}` : SITE_TITLE}
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`${URL_HOST}${slug ? `/${slug}` : ''}`}
        />
        <meta
          property="og:image"
          content={
            title
              ? encodeURI(`https://og-image.shon0.dev/${title}?theme=shon0.dev`)
              : `${URL_HOST}/og-image.png`
          }
        />
        <meta property="og:site_name" content={SITE_TITLE} />
        <meta property="og:description" content="ブログです" />
      </Head>
      <Header />
      <main>
        <div>{children}</div>
      </main>
      <Footer />
    </div>
  )
}
export default Component
