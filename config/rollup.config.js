import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'

export default {
  input: 'src/index.js',
  output: {
    file: 'lib/bundle.js',
    format: 'cjs',
    sourcemap: true
  },
  plugins: [
    babel({
      plugins: ['external-helpers'],
      exclude: 'node_modules/**'
    }),
    uglify()
  ]
}
