import { SITE_TITLE } from 'constant/meta'

const Component: React.FC = () => {
  return (
    <footer className="flex justify-center items-center mt-16 py-16 border-gray-100 border-t">
      <div className="text-sm">&copy; {SITE_TITLE}</div>
    </footer>
  )
}
export default Component
