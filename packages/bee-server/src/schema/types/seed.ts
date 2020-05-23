/// <reference path="../../../generated.d.ts" />
import { objectType } from '@nexus/schema'

export const Seed = objectType({
  name: 'Seed',
  definition(t) {
    t.implements('MigrationInterface')
  },
})

export default Seed
