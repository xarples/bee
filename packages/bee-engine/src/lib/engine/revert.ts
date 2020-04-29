import { UpToOptions, UpDownMigrationsOptions, Umzug } from 'umzug'

export default function setup(umzug: Umzug) {
  return async function revert(
    options?: UpToOptions | UpDownMigrationsOptions
  ) {
    return umzug.down(options)
  }
}
