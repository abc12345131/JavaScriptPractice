//webpack use commonjs as 
//use resolve to join the path
const { resolve } = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'build.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        ]
    },
    plugins: [],
    mode: 'development',
}
