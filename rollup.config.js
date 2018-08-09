import { resolve } from 'path'
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import eslint from 'rollup-plugin-eslint'

export default {
  input: resolve(__dirname, './index.js'),
  output: {
    file: resolve(__dirname, './dist/index.js'),
    name: 'smartPredictor',
    format: 'umd'
  },
  plugins: [
    eslint(),
    babel({
      exclude: 'node_modules/**'
    }),
    uglify()
  ]
}