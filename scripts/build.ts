import path from 'path'
import fs from 'fs'
import { rollup, RollupOptions, OutputOptions } from 'rollup'
import rollupTypescript from '@rollup/plugin-typescript'

async function main() {
  const inputOptions: RollupOptions = {
    plugins: [rollupTypescript()],
  }

  const outputOptions: OutputOptions = {
    format: 'cjs',
    dir: 'dist',
  }

  const bundle = await rollup(inputOptions)

  const output = await bundle.write(outputOptions)

  console.log(output)
}

main()
