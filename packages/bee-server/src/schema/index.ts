/// <reference path="../../my-generated-types.d.ts" />
import path from 'path'
import { queryType, makeSchema, objectType, interfaceType } from '@nexus/schema'

const MigrationInterface = interfaceType({
  name: 'MigrationInterface',
  definition(t) {
    t.string('name')
    t.resolveType(() => null)
  },
})

const Migration = objectType({
  name: 'Migration',
  definition(t) {
    t.string('name')
    t.implements(MigrationInterface)
  },
})

const Seed = objectType({
  name: 'Seed',
  definition(t) {
    t.string('name')
    t.implements(MigrationInterface)
  },
})

const Query = queryType({
  definition(t) {
    t.field('migrations', {
      type: Migration,
      description: 'get the migration list',
      list: true,
      args: {},
      async resolve() {
        return [{ name: 'Test' }]
      },
    })

    t.field('seeds', {
      type: Seed,
      description: 'get the seed list',
      list: true,
      args: {},
      async resolve() {
        return [{ name: 'Test' }]
      },
    })
  },
})

export default makeSchema({
  types: [Query],
  outputs: {
    schema: path.join(__dirname, '../../my-schema.graphql'),
    typegen: path.join(__dirname, '../../my-generated-types.d.ts'),
  },
  typegenAutoConfig: {
    sources: [
      {
        source: path.resolve(__dirname, '..', 'types', 'index.ts'),
        alias: 't',
      },
    ],
    contextType: 't.IContext',
  },
})
