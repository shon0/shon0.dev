const isDev = process.env.NODE_ENV === 'development'

export const SITE_TITLE = 'SHON0.DEV'
export const GITHUB_URL = 'https://github.com/shon0'
export const TWITTER_URL = 'https://twitter.com/_shon0'
export const URL_HOST = isDev ? 'http://localhost:3000' : 'https://shon0.vercel.app'
export const OG_IMAGE_URL = 'https://og-image.shon0.vercel.app'
