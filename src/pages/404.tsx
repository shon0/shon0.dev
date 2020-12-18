import Image from 'next/image'
import { default as NextHead } from 'next/head'
import Layout from 'components/Layout'
import Head from 'components/Head'
import { SITE_TITLE, URL_HOST } from 'constant'

const Component = () => {
  return (
    <Layout>
      <NextHead>
        <meta name="robots" content="noindex" />
      </NextHead>
      <Head
        title={`404 Not Found | ${SITE_TITLE}`}
        description="404 Not Found"
        url={URL_HOST}
        image={`${URL_HOST}/og-image.png`}
      />
      <div className="text-center">
        <h2 className="text-4xl font-montserrat">404</h2>
        <Image src="/taken.png" width={500} height={500} />
      </div>
    </Layout>
  )
}

export default Component
