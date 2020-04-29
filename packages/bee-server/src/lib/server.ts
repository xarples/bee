import express from 'express'
import bee, { IEngineOptions } from '@xarples/bee-engine'

export default function createServer(options: IEngineOptions) {
  const app = express()
  const engine = bee.createEngine(options)

  app.get('/init', (req, res) => {
    engine.generate({
      fileName: req.body.fileName,
      outputPath: req.body.outputPath,
      template: 'init',
    })

    res.send('bee project initialized successfully')
  })

  app.get('/run', async (_, res) => {
    const migrations = await engine.run()

    res.send(migrations)
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

  return app
}
