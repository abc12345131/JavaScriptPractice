//webpack use commonjs syntax
//use resolve to join the path
const { resolve } = require('path');
//use webpack built-in plugin
const { webpack } = require('webpack');
//install add-asset-html-webpack-plugin to auto import dll library to html
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
//install html-webpack-plugin to auto import js/css to html
const HtmlWebpackPlugin = require('html-webpack-plugin');
//install mini-css-extract-plugin to extract css in separate file
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//install optimize-css-assets-webpack-plugin to compress css file
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
//install workbox-webpack-plugin for PWA(progressive web application) which could access offline
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
//set package.json browserlist to development mode, default is production
process.env.NODE_ENV = 'development';

//reuse css compatibility loader
const commonCssLoader = [
    //use style-loader in development for HMR(hot module replacement)
    //'style-loader',
    //use mini-css-extract-plugin loader replace style-loader in production for user experience
    MiniCssExtractPlugin.loader,
    'css-loader',
    {
        //install postcss-loader postcss-preset-env
        loader: 'postcss-loader',
        options: {
            ident: 'postcss',
            plugins: () => [
                /*
                    set package.json 
                    "browserlist": {
                        "development": [
                            "last 1 chrome version",
                            "last 1 firefox version",
                            "last 1 safari version"],
                        "production": [
                            ">0.2%",
                            "not dead",
                            "not op_mini all"]
                    }
                */    
                //help plugin find setting of browserlist in package.json
                require('postcss-preset-env')()
            ]
        }
    }
]

module.exports = {
    entry: ['./src/js/index.js', './src/index.html'],
    output: {
        //could use [name] as file name, which is the entry point like main/test
        filename: 'js/build.[contenthash:10].js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                //do not check imported node_modules 
                exclude: /node_modules/,
                /*
                    set package.json 
                    "eslintConfig": {
                        "extends": "airbnb-base"
                    }
                */
                //make sure js code go through eslint-loader first, then babel-loader
                enforce: 'pre',
                //install eslint-config-airbnb-base eslint-plugin-import eslint
                loader: 'eslint-loader',
                options: {
                    //auto fix the code
                    fix: true        
                }
            },
            {
                oneOf: [
                    {
                        test: /\.css$/,
                        use: [...commonCssLoader]
                    },
                    {
                        test: /\.less$/,
                        use: [...commonCssLoader, 'less-loader']
                    },                    
                    {
                        test: /\.js$/,
                        //do not check imported node_modules 
                        exclude: /node_modules/,
                        use: [
                            /*
                                pack with multi-thread, start would take roughly 600ms
                                communication between threads also take time, so only use for really huge job like babel
                            */
                            {
                                loader: 'thread-loader',
                                options: {
                                    //thread number
                                    workers: 2
                                }
                            },
                            {
                                //install babel-loader @babel/core @babel/preset-env
                                loader: 'babel-loader',
                                options: {
                                    //1.set compatibility options (only use @babel/preset-env only for basic compatibility)
                                    //2.for full compatibility install and import @babel/polyfill in js code, but the file will be huge
                                    //3.load on demand, install core-js
                                    presets: [
                                        [
                                            '@babel/preset-env',
                                            {
                                                //load on demand
                                                useBuiltIns: 'usage',
                                                //core-js version
                                                corejs: {
                                                    version: 3
                                                },
                                                //target compatibility version
                                                targets: {
                                                    chrome: '60',
                                                    firefox: '60',
                                                    ie: '9',
                                                    safari: '10',
                                                    edge: '17'
                                                }
                                            }
                                        ]
                                    ],
                                    //start using babel cache to read cache if anything changed after first build
                                    cacheDirectory: true        
                                }
                            }
                        ]
                        
                    },            
                    {
                        test: /\.(jpg|png|gif)$/,
                        //install url-loader
                        loader: 'url-loader',
                        options: {
                            limit: 8 * 1024,
                            //html-loader use commonjs, change default es6 to false
                            esModule: false, 
                            name: '[hash:10].[ext]',
                            outputPath: 'imgs'
                        }
                    },
                    {
                        test: /\.html$/,
                        //install html-loader for html pics
                        loader: 'html-loader'
                    },
                    {
                        exclude: /\.(js|css|less|jpg|png|gif|html)$/,
                        //install file-loader for media
                        loader: 'file-loader',
                        options: {
                            name: '[hash:10].[ext]',
                            outputPath: 'media'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin(
            {
                //auto import packed js/css based on template
                template:'./src/index.html',
                //compress html code
                minify: {
                    collapseWhitespace: true,
                    removeComments: true
                }
            }
        ),
        new webpack.DllReferencePlugin(
            {
                //webpack won't pack library in this manifest and reference mapped library name in packed code
                manifest: resolve(__dirname, 'dll/manifest.json')
            }
        ),
        new AddAssetHtmlWebpackPlugin(
            {
                //auto import separat packed library to html
                filepath: resolve(__dirname, 'dll/jquery.js'),
            }
        ),
        new MiniCssExtractPlugin(
            {
                filename: 'css/build.[contenthash:10].css'
            }
        ),
        new OptimizeCssAssetsWebpackPlugin(),
        new WorkboxWebpackPlugin.GenerateSW(
            {
                /*
                    quickstart serviceworker and delete old serviceworker
                    generate serviceworker config
                    modify package.json, add env to eslint, so that eslint could understand window and navigator
                        "eslintConfig": {
                            "extends": "airbnb-base",
                            "env": {
                                "browser": true
                            }
                        }
                    register serviceworker in js code
                        if ('serviceWorker' in navigator) {
                            window.addEventListener('load', () => {
                                navigator.serviceWorker
                                .register('/service-worker.js/')
                                .then(() => {
                                    console.log('SW register succeed!');
                                })
                                .catch(() => {
                                    console.log('SW register failed!');
                                });
                            });
                        }
                */
                clientsClaim: true,
                skipWaiting: true
            }
        )
    ],
    /*
        pack node_modules into one separate file
    */
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    //compress js code use production mode,
    /*
        production mode will do tree shaking in ES6, do not let them cut css/less file
        set package.json 
        "sideEffects": "sideEffects": ["*.css", "*.less"]
    */
    mode: 'development',
    externals: {
        //ignore library while packing, need to import from public website in html file
        //Library name: package name in npm
        jquery: 'jQuery'
    },
    devServer: {
        contentBase: resolve(__dirname, 'build'),
        compress: true,
        port: 3000,
        open: true,
        /*
            turn on HMR(hot module replacement)
            css: HMR is implemented inside style-loader 
            js: need to modify code with module.hot
            html: don't support HMR, need to modify entry point
        */    
        hot: ture
    },
    //development use eval-source-map/eval-cheap-module-source-map
    //production use source-map/cheap-module-source-map
    //if need to hide code use hidden-source-map(hide build code)/nonsources-source-map(hide all code)
    devtool: 'source-map'
};
