const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        static: path.resolve(__dirname, './dist'),
        port: 3000,
        open: true,
        hot: true,
    },
})