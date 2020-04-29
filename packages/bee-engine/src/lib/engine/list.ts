import { Umzug } from 'umzug'

type Filter = 'executed' | 'pending' | undefined

export default function list(umzug: Umzug) {
  return async function (filter?: Filter) {
    const filterMethods = {
      executed: umzug.executed,
      pending: umzug.pending,
    }

    if (!filter) {
      const executed = await umzug.executed()
      const pending = await umzug.pending()

      return {
        executed,
        pending,
      }
    }

    return filterMethods[filter]()
  }
}
