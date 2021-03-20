import 'styles/global.css'
import 'highlight.js/styles/gradient-dark.css'

import { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import * as gtag from 'lib/gtag'

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url)
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@400;900&display=swap"
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default App
