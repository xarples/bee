import http from 'http'
import express from 'express'

// @ts-ignore
import { Nuxt, Builder } from 'nuxt'

import nuxtConfig from '../nuxt.config'

const nuxt = new Nuxt(nuxtConfig)
const app = express()
const server = http.createServer(app)

app.use(nuxt.render)

async function main() {
  await nuxt.ready()

  if (nuxtConfig.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  server.listen(8001, () => {
    console.log(`Server listening on http://localhost:8001`)
  })
}

if (!module.parent) {
  main()
}

export default app
