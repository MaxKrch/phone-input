const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: path.resolve(__dirname, './src/demo/index.tsx'),
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: {
            '@demo': path.resolve(__dirname, './src/demo'),
            '@components': path.resolve(__dirname, './src/components'),
            '@store': path.resolve(__dirname, './src/store'),
            '@shared': path.resolve(__dirname, './src/shared'),
        },
    },
    module: {
        rules: [
            {
                test: /\.[jt]sx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-typescript',
                            '@babel/preset-react'
                          ],
                    },
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Phone Input Demo App',
            filename: 'index.html',
            template: path.resolve(__dirname, './src/demo/index.html'),
        }),
    ],
}
