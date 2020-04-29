import Umzug, { Umzug as IUmzug, UmzugOptions } from 'umzug'

let umzug: IUmzug

export default function setupUmzug(options: UmzugOptions) {
  const migrations = options!.migrations || {}
  const storageOptions = options!.storageOptions || {}

  if (Array.isArray(migrations)) {
    throw new Error('Migrations should be an Object')
  }

  if (!umzug) {
    umzug = new Umzug({
      migrations: {
        ...migrations,
        params: migrations.params,
        pattern: /^\d+[\w-]+\.(js|ts)$/,
      },
      storage: options.storage,
      storageOptions: {
        ...storageOptions,
      },
    })
  }

  return umzug
}
