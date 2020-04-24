import BeeEngine from './lib/engine'
import define from './lib/define'
import { IBeeEngineOptions } from './types'

export { IBeeEngineOptions }

export * from './lib'

export function createClient(options: IBeeEngineOptions) {
  return new BeeEngine(options)
}

export default {
  createClient,
  define,
}
