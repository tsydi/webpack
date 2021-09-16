const path = require('path');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const cssLoaders = extra => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
        },
        'css-loader'
    ]
    if (extra) {
        loaders.push(extra)
    }
    return loaders
}

const jsLoaders = () => {
    const loaders = [{
      loader: 'babel-loader',
      options: babelOptions()
    }]
    /* if (isDev) {
      loaders.push('eslint-loader')
    } */
    return loaders
}

const babelOptions = preset => {
    const opts = {
      presets: [
        '@babel/preset-env'
      ],
      plugins: [
        '@babel/plugin-proposal-class-properties'
      ]
    }
    if (preset) {
      opts.presets.push(preset)
    }
    return opts
}

const plugins = () => {
    const base = [
        new HTMLWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: isProd
            },
            'meta' : {
                'theme-color' : '#000000',
                "description" : "Web site created using create-react-app"
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/assets/favicon.ico'),
                    to: path.resolve(__dirname, 'dist')
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        })
    ]
    /* if (isProd) {
        base.push(new BundleAnalyzerPlugin())
    } */
    return base
}


module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',

    entry: {
        main: ['@babel/polyfill', './index.js']
        // main: ['@babel/polyfill', './index.jsx']
        // analitics: './analitics.js'
        // analytics: './analytics.ts'
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },

    resolve: {
        extensions: ['.js', '.json', '.png', '.jpg', '.svg']
    },

    devServer: {
        port: 4200,
        hot: isDev,
        open: true
    },

    devtool: 'source-map',

    optimization: {
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                  test: /[\\/]node_modules[\\/]/,
                  name: 'vendors',
                  chunks: 'all',
                },
            },
        },
        minimizer: [
            `...`,
            new CssMinimizerPlugin(),
        ],
    },

    plugins: plugins(),

    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoaders()
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader')
            },
            {
                test: /\.(png|jpg|svg|gif|mp4)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            },
            {
                test: /\.csv$/,
                use: ['csv-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: jsLoaders()
            }
            /*{
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: babelOptions('@babel/preset-typescript')
                     }
                ]
            },*/
            /*{
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: babelOptions('@babel/preset-react')
                    }
                ]
            }*/
        ]
    }
}