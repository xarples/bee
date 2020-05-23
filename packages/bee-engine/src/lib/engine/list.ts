import { Umzug } from 'umzug'

type Filter = 'executed' | 'pending' | undefined

export default function setup(umzug: Umzug) {
  return async function list(filter?: Filter | null) {
    if (!filter) {
      const executed = await umzug.executed()
      const pending = await umzug.pending()

      return [...executed, ...pending]
    }

    return umzug[filter]()
  }
}
