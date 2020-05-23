// import path from 'path'
import { ApolloServer } from 'apollo-server'
import bee, { IEngineOptions } from '@xarples/bee-engine'

import schema from '../schema'

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
