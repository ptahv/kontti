import nodeResolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'

const _plugins = [
    nodeResolve({
        jsnext: true
    }),

    babel({
        exclude: 'node_modules/**'
    }),

    commonjs({
        namedExports: {
            'node_modules/react/index.js': ['createContext']
        }
    })
]

export default [
    {
        input: 'src/index.js',
        output: {
          file: 'dist/kontti.js',
          format: 'umd',
          name: 'kontti',
          indent: false
        },
        plugins: _plugins.concat([
          replace({
            'process.env.NODE_ENV': JSON.stringify('development')
          })
        ])
    }, {
        input: 'src/index.js',
        output: {
            file: 'dist/kontti.min.js',
            format: 'umd',
            name: 'kontti',
            indent: false
        },
        plugins: _plugins.concat([
            replace({
                'process.env.NODE_ENV': JSON.stringify('production')
            }),
            terser({
                compress: {
                    pure_getters: true,
                    unsafe: true,
                    unsafe_comps: true,
                    warnings: false
                }
            })
        ])
    }
]
    
