import Head from 'next/head'
import Link from 'next/link'
import { SITE_TITLE } from 'constant/meta'
import Icon from './icon'

const GitHubURL = 'https://github.com/ShonoKoga'

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
          <h1 className="text-2xl font-bold leading-normal font-montserrat hover:text-gray-700">
            <Link href="/">
              <a>{SITE_TITLE}</a>
            </Link>
          </h1>
          <div className="ml-auto flex justify-center">
            <a
              href={GitHubURL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-gray-700"
            >
              <Icon.Github />
            </a>
          </div>
        </div>
      </header>
      <main>
        <div>{children}</div>
      </main>
      <footer className="flex justify-center items-center mt-16 py-16">
        &copy; {SITE_TITLE}
      </footer>
    </div>
  )
}
export default Component
