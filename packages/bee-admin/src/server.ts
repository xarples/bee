import http from 'http'
import express from 'express'

const app = express()
const server = http.createServer(app)

server.listen(4000, () => {
  console.log('Server listening on http://localhost:4000')
})
