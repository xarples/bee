/// <reference path="../../../generated.d.ts" />

import { mutationField, objectType, arg, unionType } from '@nexus/schema'

const RunResultResponse = unionType({
  name: 'RunResultResponse',
  description: 'Any container type that can be rendered into the feed',
  definition(t) {
    t.members('Migration', 'Seed')
    // @ts-ignore
    t.resolveType((source) => (source.type === 'seed' ? 'Seed' : 'Migration'))
  },
})

const RunMigrationResponse = objectType({
  name: 'RunMigrationResponse',
  definition(t) {
    t.boolean('success')
    t.string('message')
    t.field('result', {
      type: RunResultResponse,
      list: true,
    })
  },
})

export const run = mutationField((t) => {
  t.field('run', {
    type: RunMigrationResponse,
    args: {
      entity: arg({ type: 'EntityEnum', required: true }),
    },
    async resolve(_, args, context) {
      enum EntityEnum {
        migration = 'migrations',
        seed = 'seeds',
      }

      const currentEntity = EntityEnum[args.entity]
      const result = await context.engine[currentEntity].run()

      return {
        success: true,
        message: 'Hello',
        result: result.map((item) => ({
          name: item.file,
          type: args.entity,
        })),
      }
    },
  })
})
