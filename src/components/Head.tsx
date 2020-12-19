import Head from 'next/head'
import { SITE_TITLE } from 'constant'

type Props = {
  title: string
  url: string
  image: string
  description: string
}

const Component: React.FC<Props> = ({ title, url, image, description }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:site_name" content={SITE_TITLE} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:description" content={description} />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  )
}

export default Component
