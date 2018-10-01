import buble from 'rollup-plugin-buble'

const pkg = require('./package.json')

export default {
  input: 'src/index.js',
  output: {
    exports: 'named',
    banner: `/*!
 * ${pkg.name} - ${pkg.description}
 * Version ${pkg.version}
 * Copyright (c) ${new Date().getUTCFullYear()} ${pkg.author.name} <${
      pkg.author.email
    }>
 * Released under the MIT license
 *
 * Source code: ${pkg.repository}
 */`,
    outro: 'module.exports = Object.assign(exports.default, exports)',
    file: 'dist/index.js',
    format: 'cjs',
  },
  plugins: [
    buble({
      objectAssign: 'Object.assign',
    }),
  ],
  external: Object.keys(pkg.dependencies),
}
