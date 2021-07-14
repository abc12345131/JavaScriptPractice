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
//install terser-webpack-plugin for production code (js and css) compression
const TerserWebpackPlugin = require('terser-webpack-plugin');
//install clean-webpack-plugin for delete old code before packing
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

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
            postcssOptions: {
                plugins: [                    
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
                    'postcss-preset-env',
                ]
            }
        }
    }
]

const commonJsLoader = [
    /*
        pack with multi-thread, start would take roughly 600ms
        communication between threads also take time, so only use for really huge job like babel
    */
    {   
        //install thread-loader
        loader: 'thread-loader',
        // loaders with equal options will share worker pools
        options: {
            // the number of spawned workers, defaults to (number of cpus - 1) or
            // fallback to 1 when require('os').cpus() is undefined
            workers: 2,
    
            // number of jobs a worker processes in parallel
            // defaults to 20
            workerParallelJobs: 50,
    
            // additional node.js arguments
            workerNodeArgs: ['--max-old-space-size=1024'],
    
            // Allow to respawn a dead worker pool
            // respawning slows down the entire compilation
            // and should be set to false for development
            poolRespawn: false,
    
            // timeout for killing the worker processes when idle
            // defaults to 500 (ms)
            // can be set to Infinity for watching builds to keep workers alive
            poolTimeout: 2000,
    
            // number of jobs the poll distributes to the workers
            // defaults to 200
            // decrease of less efficient but more fair distribution
            poolParallelJobs: 50,
    
            // name of the pool
            // can be used to create different pools with elsewise identical options
            name: 'my-pool',
        },
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
            /*
                //webpack4 setting
                //turn on babel cache to read cache if anything changed after first build
                cacheDirectory: true
            */        
        }
    }
]

module.exports = {
    entry: ['./src/js/index.js', './src/index.html'],
    output: {
        //could use [name] as file name, which is the entry point like main/test
        filename: 'js/build.[contenthash:10].js',
        path: resolve(__dirname, 'dist'),
        //html import path prefix 
        publicPath: './',
        //non-entry chunk name
        chunkFilename: '[name]_chunk.js',
        /*
            //only use these setting for library packing
            //exposed library name
            library: '[name]',
            //imported library would be added to place like global, window or any node 
            //or set this like commonjs or amd to import with certain syntax
            libraryTarget: 'window'
        */
        /*
            //output format setting, default is ES5
            environment: {
                // The environment supports arrow functions ('() => { ... }').
                arrowFunction: true,
                // The environment supports BigInt as literal (123n).
                bigIntLiteral: false,
                // The environment supports const and let for variable declarations.
                const: true,
                // The environment supports destructuring ('{ a, b } = obj').
                destructuring: true,
                // The environment supports an async import() function to import EcmaScript modules.
                dynamicImport: false,
                // The environment supports 'for of' iteration ('for (const x of array) { ... }').
                forOf: true,
                // The environment supports ECMAScript Module syntax to import ECMAScript modules (import ... from '...').
                module: false,
            }
        */
    },
    cache: {
        type: 'filesystem',
        /*
            //defaults to node_modules/.cache/webpack
            cacheDirectory: resolve(__dirname, '.temp_cache')
        */
        buildDependencies: {
            // This makes all dependencies of this file - build dependencies
            config: [__filename],
            // By default webpack and loaders are build dependencies
        }
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
                //only check code in folder src 
                include: resolve(__dirname, 'src'),
                //make sure js code go through js code in certain order, 'pre' first, 'post' last, default in code order
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
                        //use loader array order is from bottom to top
                        use: [...commonCssLoader]
                    },
                    {
                        test: /\.less$/,
                        //install less less-loader
                        use: [...commonCssLoader, 'less-loader']
                    },                    
                    {
                        test: /\.js$/,
                        //do not check imported node_modules 
                        exclude: /node_modules/,
                        use: [...commonJsLoader]
                        
                    },
                    {
                        test: /\.ts$/,
                        //do not check imported node_modules 
                        exclude: /node_modules/,
                        //install typescript ts-loader
                        use: [...commonJsLoader,
                            {
                                loader: 'ts-loader', 
                                options: {
                                    happyPackMode: true
                                }
                            }
                        ], 
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
        new MiniCssExtractPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin(
            {
                //self defined title
                title:"my title",
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
    optimization: {        
        //pack node_modules into one separate file
        splitChunks: {
            chunks: 'all',
            /*
                this part is default setting, normally don't need to change
                //min chunk size 30kb
                minSize: {
                    javascript: 30 * 1024,
                    style: 50 * 1024
                },
                //no max chunk size 
                maxSize: 0,
                //chunk being used at least 1 time  
                minChunks: 1,
                //max parallel loading number while doing load on demand 
                maxAsyncRequests: 5,
                //max parallel loading number while loading entry js code 
                maxInitialRequests: 3,
                //name connector
                automaticNameDelimiter: '~',
                //naming rules can be used
                name: true,
                //chunk group
                cacheGroups: {
                    vendors: {
                        //node_modules files would be packed into vendors group named like vendors~xxx.js
                        //inherit above rules
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10
                    },
                    default: {
                        //this would override above rules
                        minChunks: 2,
                        //this has to be lower priority
                        priority: -20,
                        //if same module already been packed before, reuse instead of repack
                        reuseExistingChunk: true
                    }
                }
            */
        },
        //pack the hash record of other modules in current module into a file: runtime
        //modified code contenthash changed, runtime resolve cache issue 
        runtimeChunk: {
            name: entrypoint => `runtime-${entrypoint}`
        },
        minimizer: [
            //set production code compression config
            new TerserWebpackPlugin(
                {
                    //turn on cache
                    cache: true,
                    //turn on multi-thread packing
                    parallel: true,
                    //turn on source-map
                    sourceMap: true         
                }
            )
        ]
    },
    /*
        compress js code use production mode,
        production mode will do tree shaking,
        do not let them cut css/less file,
        set package.json 
        "sideEffects": "sideEffects": ["*.css", "*.less"]
    */
    mode: 'development',

    //Do not use this if you always make mistake with file path, this will mess up even more.
    resolve: {
        /*
        //set resolve module path alias, simplify path
        alias: {
            $css: resolve(__dirname, 'src/css')
        },
        */
        //set path suffix, simplify path
        extensions: ['.ts', '.js', '.json', '.jsx'],
        //set webpack module path, save time when looking for modules
        modules: [resolve(__dirname, '../../node_modules'), 'node_modules']
    },

    externals: {
        //ignore library while packing, need to import from public website in html file
        //Library name: package name in npm
        jquery: 'jQuery'
    },
    devServer: {
        //running path
        contentBase: resolve(__dirname, 'build'),
        //watch content base fold files, reload if anything changed
        watchContentBase: true,
        watchOptions: {
            //ignore files
            ignored: /node_modules/
        },
        //turn on gzip compress
        compress: true,
        port: 3000,
        host: 'localhost',
        //auto open browser
        open: true,
        /*
            turn on HMR(hot module replacement)
            css: HMR is implemented inside style-loader 
            js: need to modify code with module.hot
            html: don't support HMR, need to modify entry point if hot is true
        */    
        hot: true,
        //do not show server start log
        clientLogLevel: 'none',
        //do not show anything other than basic info
        quiet: true,
        //do not show full screen prompt if there is any error
        overlay: false,
        //server proxy
        proxy: {
            //if devServer get /api request(port 3000), forward it to another server below(port 5000)
            '/api': {
                target: 'http://localhost:5000',
                //forward path rewrite, change '/api/xxx' to '/xxx' 
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    //development use eval-source-map(react recommended)/eval-cheap-module-source-map
    //production use source-map(react recommended)/cheap-module-source-map
    //if need to hide code use hidden-source-map(hide build code)/nonsources-source-map(hide all code)
    devtool: 'source-map'
};
