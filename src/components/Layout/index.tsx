import Head from 'next/head'
import { SITE_TITLE } from 'constant/meta'
import Header from './Header'
import Footer from './Footer'

type Props = {
  title?: string
}

const Component: React.FC<Props> = ({ title, children }) => {
  return (
    <div className="max-w-screen-md mx-auto px-4 sm:px-7">
      <Head>
        <title>{title ? `${title} | ${SITE_TITLE}` : SITE_TITLE}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
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
