import path from 'path'
import createServer from './lib/createServer'

const server = createServer({
  database: undefined,
  username: undefined,
  password: undefined,
  host: 'localhost',
  dialect: 'sqlite',
  storage: path.resolve(process.cwd(), 'db.sqlite'),
  migrationsPath: path.resolve(process.cwd(), 'migrations'),
  migrationStorage: 'json',
  migrationStorageOptions: {
    path: path.resolve(process.cwd(), 'bee_migrations.json'),
  },
  seedsPath: path.resolve(process.cwd(), 'seeds'),
  seedStorage: 'json',
  seedStorageOptions: {
    path: path.resolve(process.cwd(), 'bee_seeds.json'),
  },
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
