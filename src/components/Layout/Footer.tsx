import Link from 'next/link'
import { SITE_TITLE, GITHUB_URL, TWITTER_URL } from 'constant'
import Icon from '../icon'

const Component: React.FC = () => {
  return (
    <footer className="flex justify-center items-center mt-8 py-16 border-gray-100 border-t">
      <div className="text-sm">
        <Link href="/">
          <a>
            &copy; <span className="font-inconsolata">{SITE_TITLE}</span>
          </a>
        </Link>
      </div>
      <div className="flex ml-3 pl-3 border-l border-gray-500">
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-black hover:text-gray-700"
        >
          <Icon.Github width="20" height="20" />
        </a>
        <a
          href={TWITTER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-black hover:text-gray-700 ml-3"
        >
          <Icon.Twitter width="20" height="20" />
        </a>
      </div>
    </footer>
  )
}
export default Component
