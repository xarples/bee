import { enumType } from '@nexus/schema'

export const MigrationFilterEnum = enumType({
  name: 'MigrationFilterEnum',
  members: ['pending', 'executed'],
  description: '',
})
