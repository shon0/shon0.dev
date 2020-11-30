import Head from 'next/head'
import Link from 'next/link'
import { SITE_TITLE } from 'constant/meta'

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
      <header className="flex-1 pt-12 mb-10">
        <div className="flex items-center justify-start">
          <h1 className="text-2xl font-bold leading-normal font-montserrat">
            <Link href="/">
              <a>{SITE_TITLE}</a>
            </Link>
          </h1>
        </div>
      </header>
      <main>
        <div>{children}</div>
      </main>
      <footer>&copy; {SITE_TITLE}</footer>
      <style jsx>{`
        footer {
          margin-top: 4em;
          padding-top: 2em;
          padding-bottom: 2em;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  )
}
export default Component
