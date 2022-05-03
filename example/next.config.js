const path = require('path')

module.exports = {
  webpack: (config, options) => {
    if (options.isServer) {
      config.externals = ['react', 'theme-ui', ...config.externals]
    }
    config.resolve.alias['react'] = path.resolve(
      __dirname,
      '.',
      'node_modules',
      'react'
    )
    config.resolve.alias['theme-ui'] = path.resolve(
      __dirname,
      '.',
      'node_modules',
      'theme-ui'
    )
    config.resolve.alias['@emotion/react'] = path.resolve(
      __dirname,
      '.',
      'node_modules',
      '@emotion/react'
    )
    return config
  },
}
