/*
    change webpack config while packing like code below
    webpack --config webpack.dll.js
*/
//use resolve to join the path
const { resolve } = require('path');
//use webpack built-in plugin
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
                //mapping the exported library
                name: '[name]_[hash]',
                //output path
                path: resolve(__dirname, 'dll/manifest.json'),
            }
        )
    ],
    mode: 'production'
};