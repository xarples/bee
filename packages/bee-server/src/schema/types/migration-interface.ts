/// <reference path="../../../generated.d.ts" />

import { interfaceType } from '@nexus/schema'

export const MigrationInterface = interfaceType({
  name: 'MigrationInterface',
  definition(t) {
    t.string('name')
    t.string('type')
    t.resolveType((item) => (item.type === 'seed' ? 'Seed' : 'Migration'))
  },
})

export default MigrationInterface
