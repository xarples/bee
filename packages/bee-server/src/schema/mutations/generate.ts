/// <reference path="../../../generated.d.ts" />

import path from 'path'
import { mutationField, objectType, stringArg, arg } from '@nexus/schema'

const GenerateResponse = objectType({
  name: 'GenerateResponse',
  definition(t) {
    t.boolean('success')
    t.string('message')
  },
})

export const generate = mutationField((t) => {
  t.field('generate', {
    type: GenerateResponse,
    args: {
      fileName: stringArg({ required: true }),
      template: arg({ type: 'EntityEnum', required: true }),
    },
    async resolve(_, args, context) {
      enum OutputPathEnum {
        migration = 'migrationsPath',
        seed = 'seedsPath',
      }

      const currentOutputPath = OutputPathEnum[args.template]

      await context.engine.generate({
        template: args.template,
        outputPath: path.resolve(
          context.engine.options[currentOutputPath] || ''
        ),
        fileName: args.fileName,
      })

      return {
        success: true,
        message: 'Hello',
      }
    },
  })
})
