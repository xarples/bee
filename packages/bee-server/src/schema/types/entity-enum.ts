import { enumType } from '@nexus/schema'

export const EntityEnum = enumType({
  name: 'EntityEnum',
  members: ['migration', 'seed'],
  description: '',
})
