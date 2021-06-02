const path = require('path')

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        implementation: require('sass')
      }
    }
  },

  chainWebpack: config => {
    // Svgファイルにexternalクエリが存在する場合file-loaderを使う
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .oneOf('external')
      .resourceQuery(/external/)
      .use('file-loader')
      .loader('file-loader')
      .end()
      .end()
      .oneOf('inline')
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
  },

  configureWebpack: config => {
    config.resolve.alias['@'] = path.join(__dirname, 'src/')
  }
}
