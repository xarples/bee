/// <reference path="../../../generated.d.ts" />

import {
  mutationField,
  objectType,
  arg,
  unionType,
  booleanArg,
} from '@nexus/schema'

const DownResultResponse = unionType({
  name: 'DownResultResponse',
  description: 'Any container type that can be rendered into the feed',
  definition(t) {
    t.members('Migration', 'Seed')

    t.resolveType((source) => (source.type === 'seed' ? 'Seed' : 'Migration'))
  },
})

const DownMigrationResponse = objectType({
  name: 'DownMigrationResponse',
  definition(t) {
    t.boolean('success')
    t.string('message')
    t.field('result', {
      type: DownResultResponse,
      list: true,
    })
  },
})

export const down = mutationField((t) => {
  t.field('down', {
    type: DownMigrationResponse,
    args: {
      entity: arg({ type: 'EntityEnum', required: true }),
      all: booleanArg(),
    },
    async resolve(_, args, context) {
      enum EntityEnum {
        migration = 'migrations',
        seed = 'seeds',
      }

      const currentEntity = EntityEnum[args.entity]

      const result = await context.engine[currentEntity].revert(
        args.all ? { to: 0 } : undefined
      )

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
