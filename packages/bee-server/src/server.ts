import http from 'http'
import express from 'express'
import bee from '@xarples/bee-engine'

const app = express()
const server = http.createServer(app)
const engine = bee.createEngine({})

app.get('/init', async (req, res) => {
  await engine.generate({
    fileName: req.body.fileName,
    outputPath: req.body.outputPath,
    template: 'init',
  })

  res.send('bee project initialized successfully')
})

app.get('/run', async (req, res) => {
  await engine.run()

  res.send('bee project initialized successfully')
})

app.get('/generate', async (req, res) => {
  await engine.generate({
    fileName: req.body.fileName,
    outputPath: req.body.outputPath,
    template: 'migration',
  })

  res.send('bee project initialized successfully')
})

app.get('/list', async (req, res) => {
  const migrations = await engine.list(req.body.filter)

  res.send(migrations)
})

function main() {
  server.listen(5000)
}

if (!module.parent) {
  main()
}

export default app
