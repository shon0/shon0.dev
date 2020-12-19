import Link from 'next/link'
import { SITE_TITLE, GITHUB_URL, TWITTER_URL } from 'constant'
import Icon from '../icon'

const Component: React.FC = () => {
  return (
    <header className="flex-1 pt-12 mb-10">
      <div className="flex items-center justify-start">
        <h1 className="text-2xl font-black leading-normal font-inconsolata hover:text-gray-700">
          <Link href="/">
            <a>{SITE_TITLE}</a>
          </Link>
        </h1>
        <div className="ml-auto flex justify-center">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-gray-700"
          >
            <Icon.Github />
          </a>
          <a
            href={TWITTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-gray-700 ml-3"
          >
            <Icon.Twitter />
          </a>
        </div>
      </div>
    </header>
  )
}
export default Component
