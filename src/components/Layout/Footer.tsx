import { SITE_TITLE, GITHUB_URL } from 'constant'
import Icon from '../icon'

const Component: React.FC = () => {
  return (
    <footer className="flex justify-center items-center mt-16 py-16 border-gray-100 border-t">
      <div className="text-sm">
        &copy; <span className="font-inconsolata">{SITE_TITLE}</span>
      </div>
      <div className="ml-3">
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-black hover:text-gray-700"
        >
          <Icon.Github width="16" height="16" />
        </a>
      </div>
    </footer>
  )
}
export default Component
