import Link from 'next/link'
import { SITE_TITLE } from 'constant'

const Component: React.FC = () => {
  return (
    <header className="pt-12 mb-8">
      <h1 className="text-2xl font-black leading-normal font-inconsolata hover:text-gray-700">
        <Link href="/">
          <a>{SITE_TITLE}</a>
        </Link>
      </h1>
    </header>
  )
}
export default Component
