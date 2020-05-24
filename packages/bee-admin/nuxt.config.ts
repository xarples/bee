import { Configuration } from '@nuxt/types'

const config: Configuration = {
  head: {
    link: [
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.12.1/css/all.css',
      },
    ],
  },
  buildModules: ['@nuxt/typescript-build'],
  build: {
    additionalExtensions: ['ts'],
  },
  dev: process.env.NODE_ENV !== 'production',
  mode: 'universal',
  modules: ['@xarples/wolfi-nuxt'],
}

export default config
