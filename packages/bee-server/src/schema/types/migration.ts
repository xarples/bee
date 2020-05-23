/// <reference path="../../../generated.d.ts" />

import { objectType } from '@nexus/schema'

export const Migration = objectType({
  name: 'Migration',
  definition(t) {
    t.implements('MigrationInterface')
  },
})

export default Migration
