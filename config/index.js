/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-commonjs */
const path = require('path')

const conditionAlias = {
  "react": path.resolve(__dirname, "../node_modules/@tarojs/taro"),
  "axios": path.resolve(__dirname, "../node_modules/taro-axios"),
  // "axios-hooks": path.resolve(__dirname, "../node_modules/axios-hooks/es"),
}

if(process.env.TARO_ENV === 'h5') {
  Object.assign(conditionAlias,{
    'react': path.resolve(__dirname,'../node_modules/nervjs'),
    'react-dom': path.resolve(__dirname, '../node_modules/nervjs'),
  })
}

const config = {
  projectName: 'mini-taro-1',
  date: '2020-2-2',
  designWidth: 750,
  deviceRatio: {
    '640': 2.34 / 2,
    '750': 1,
    '828': 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  babel: {
    sourceMap: true,
    presets: [
      ['env', {
        modules: false
      }]
    ],
    plugins: [
      'transform-decorators-legacy',
      'transform-class-properties',
      'transform-object-rest-spread',
      ['transform-runtime', {
        "helpers": false,
        "polyfill": false,
        "regenerator": true,
        "moduleName": 'babel-runtime'
      }]
    ]
  },
  defineConstants: {
  },
  alias: {
    // 'react': 'node_modules/nervjs',
    // 'react-dom': 'node_modules/nervjs',
    //"react": path.resolve(__dirname, "../node_modules/@tarojs/taro"),
    // "react-dom": path.resolve(__dirname, "../node_modules/@tarojs/taro"),
    // "react-hooks-form": "node_modules/react-hooks-form/dist/react-hooks-form.min.js",
    ...conditionAlias,
    "mobx-sync": "node_modules/mobx-sync/lib/index",
    "@": path.resolve(__dirname,"../src"),
    "@/package": "../package.json",
    "@/project": "../project.config.json",
  },
  mini: {
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
          browsers: [
            'last 3 versions',
            'Android >= 4.1',
            'ios >= 8'
          ]
        }
      },
      pxtransform: {
        enable: true,
        config: {

        }
      },
      url: {
        enable: true,
        config: {
          limit: 10240 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    esnextModules: ['taro-ui'],
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
          browsers: [
            'last 3 versions',
            'Android >= 4.1',
            'ios >= 8'
          ]
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
