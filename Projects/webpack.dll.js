//webpack use commonjs syntax
//use resolve to join the path
const { resolve } = require('path');
const { webpack } = require('webpack');

module.exports = {
    entry: {
        //file name after packed: [library name like 'jquery', 'react', 'vue']
        jquery: ['jquery']
    },
    output: {
        //se [name] as file name, which is the entry point like main/test
        filename: '[name].js',
        path: resolve(__dirname, 'dll'),
        //exported name of the packed library 
        library: '[name]_[hash]',
    },
    plugins: [
        new webpack.DllPlugin(
            {
                name: ''
            }
        )
    ]
};