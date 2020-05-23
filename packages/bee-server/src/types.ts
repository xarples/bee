import { createEngine } from '@xarples/bee-engine'

const Engine = (false as true) && createEngine({})

export interface IContext {
  engine: typeof Engine
}
