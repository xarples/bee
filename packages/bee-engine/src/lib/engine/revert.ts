import { DownToOptions, UpDownMigrationsOptions, Umzug } from 'umzug'

export default function setup(umzug: Umzug) {
  return async function revert(
    options?: DownToOptions | UpDownMigrationsOptions
  ) {
    return umzug.down(options)
  }
}
