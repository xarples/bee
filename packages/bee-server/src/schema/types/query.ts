/// <reference path="../../../generated.d.ts" />

import { queryType, arg } from '@nexus/schema'

export const Query = queryType({
  definition(t) {
    t.field('migrations', {
      type: 'Migration',
      description: 'get the migration list',
      list: true,
      args: {
        filter: arg({ type: 'MigrationFilterEnum' }),
      },
      async resolve(_, args, context) {
        const migrations = await context.engine.migrations.list(args.filter)

        // @ts-ignore
        return migrations.map((migration) => ({
          name: migration.file,
          type: 'migration',
        }))
      },
    })

    t.field('seeds', {
      type: 'Seed',
      description: '',
      list: true,
      args: {
        filter: arg({ type: 'MigrationFilterEnum' }),
      },
      async resolve(_, args, context) {
        const seeds = await context.engine.seeds.list(args.filter)

        return seeds.map((seed) => ({
          name: seed.file,
          type: 'seed',
        }))
      },
    })
  },
})

export default Query
