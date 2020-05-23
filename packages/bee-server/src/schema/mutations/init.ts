/// <reference path="../../../generated.d.ts" />

import path from 'path'
import { mutationField, objectType } from '@nexus/schema'

const InitResponse = objectType({
  name: 'InitResponse',
  definition(t) {
    t.boolean('success')
    t.string('message')
  },
})

export const init = mutationField((t) => {
  t.field('init', {
    type: InitResponse,
    args: {},
    async resolve(_, __, context) {
      await context.engine.generate({
        fileName: '',
        template: 'init',
        outputPath: path.resolve(process.cwd()),
      })

      return {
        success: true,
        message: 'Hello',
      }
    },
  })
})
