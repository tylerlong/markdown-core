const rules = []

rules.push({
  test: /\.css$/,
  use: [
    { loader: 'style-loader' },
    { loader: 'css-loader' }
  ]
})

rules.push({
  test: /\.js$/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: [
        ['env', {
          'targets': {
            'browsers': ['last 2 versions']
          }
        }]
      ]
    }
  }
})

rules.push({
  test: /\.(ttf|eot|svg|woff2?)(\?v=.+?)?$/,
  use: {
    loader: 'url-loader',
    options: {
      limit: 1000000
    }
  }
})

const config = {
  target: 'web',
  entry: {
    'index': './public/index.js'
  },
  output: {
    path: './public',
    filename: '[name].bundle.js'
  },
  module: { rules }
}

module.exports = [config]
