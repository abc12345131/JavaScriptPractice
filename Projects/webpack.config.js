//webpack use commonjs as 
//use resolve to join the path
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'build.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: [
                    'url-loader'
                ],
                options: {
                    limit: 16 * 1024
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin(
            {
                template:'./src/index.html'
            }
        )
    ],
    mode: 'development',
}
