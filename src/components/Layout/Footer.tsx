import { SITE_TITLE } from 'constant/meta'

const Component: React.FC = () => {
  return (
    <footer className="flex justify-center items-center mt-16 py-16 border-gray-100 border-t">
      <div className="text-sm">
        &copy; <span className="font-consolas">{SITE_TITLE}</span>
      </div>
    </footer>
  )
}
export default Component
