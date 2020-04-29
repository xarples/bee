import { UpToOptions, UpDownMigrationsOptions, Umzug } from 'umzug'

export default function setup(umzug: Umzug) {
  return async function run(options?: UpToOptions | UpDownMigrationsOptions) {
    return umzug.up(options)
  }
}
