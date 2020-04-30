import http from 'http'
import createServer from './lib/server'

const app = createServer({
  dialect: 'sqlite',
  storage: './db.sqlite',
})

const server = http.createServer(app)

server.listen(3000, () => {
  console.log('Server listening on http://localhost:3000')
})
