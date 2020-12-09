import Link from 'next/link'
import { SITE_TITLE } from 'constant/meta'
import Icon from '../icon'

const GitHubURL = 'https://github.com/ShonoKoga'

const Component: React.FC = () => {
  return (
    <header className="flex-1 pt-12 mb-10">
      <div className="flex items-center justify-start">
        <h1 className="text-xl font-black leading-normal font-consolas hover:text-gray-700">
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
  )
}
export default Component
