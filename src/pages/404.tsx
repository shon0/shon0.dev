import Image from 'next/image'
import Layout from 'components/Layout'

const Component = () => {
  return (
    <Layout>
      <div className="text-center">
        <h2 className="text-4xl font-montserrat">404</h2>
        <Image src="/taken.png" width={500} height={500}/>
      </div>
    </Layout>
  )
}

export default Component
