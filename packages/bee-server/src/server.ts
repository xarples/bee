import path from 'path'
import { ApolloServer } from 'apollo-server'
import bee, { IEngineOptions } from '@xarples/bee-engine'

import schema from './schema'

export default function createServer(options: IEngineOptions) {
  return new ApolloServer({
    schema,
    context() {
      const engine = bee.createEngine(options)
      return {
        engine,
      }
    },
  })
}

if (!module.parent) {
  const server = createServer({
    database: undefined,
    username: undefined,
    password: undefined,
    host: 'localhost',
    dialect: 'sqlite',
    migrationStorage: 'json',
    migrationsPath: path.resolve(process.cwd(), 'migrations'),
    storage: path.resolve(process.cwd(), 'db.sqlite'),
    storageOptions: {
      path: path.resolve(process.cwd(), 'bee_migrations.json'),
    },
  })

  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
  })
}
