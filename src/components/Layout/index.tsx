import Header from './Header'
import Footer from './Footer'

const Component: React.FC = ({ children }) => {
  return (
    <div className="max-w-screen-md mx-auto px-4 sm:px-7">
      <Header />
      <main>
        <div>{children}</div>
      </main>
      <Footer />
    </div>
  )
}
export default Component
