/// <reference path="../../generated.d.ts" />
import path from 'path'
import { makeSchema } from '@nexus/schema'

import * as types from './types'
import * as mutations from './mutations'

export default makeSchema({
  types: { ...types, ...mutations },
  outputs: {
    schema: path.join(__dirname, '../../schema.graphql'),
    typegen: path.join(__dirname, '../../generated.d.ts'),
  },
  typegenAutoConfig: {
    sources: [
      {
        source: path.resolve(
          __dirname.replace('dist', 'src'),
          '..',
          'types.ts'
        ),
        alias: 't',
      },
    ],
    contextType: 't.IContext',
  },
})
