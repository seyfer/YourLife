const webpack = require('webpack');
const path = require('path');
require('dotenv').config();


const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const ENV = process.env.APP_ENV;
const isTest = ENV === 'test';
const isProd = ENV === 'prod';
const isGit = ENV === 'git';

// function to set dev-tool depending on environment
function setDevTool() {
    if (isTest) {
        return 'inline-source-map';
    } else if (isProd) {
        return 'source-map';
    } else {
        return 'eval-source-map';
    }
}

const buildDestination = process.env.APP_BUILD || 'dist';

const config = {
    entry: [path.resolve(__dirname, 'src/app/index.js')],
    output: {
        path: path.resolve(__dirname, buildDestination),
        filename: '[name].[hash].js',
        publicPath: isGit ? '/your-life' : '/',
    },
    mode: 'development',
    devtool: setDevTool(),
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            plugins: ['syntax-dynamic-import'],

                            presets: [
                                ['env', {
                                    'modules': false,
                                }],
                                ['stage-2']
                            ],
                        },
                    },
                    {
                        loader: "eslint-loader",
                        options: {
                            failOnError: isProd,
                            failOnWarning: isProd,
                        }
                    },
                ],
                include: [path.resolve(__dirname, 'src')],
                exclude: [
                    path.resolve(__dirname, '/node_modules/'),
                ],
            },
            {
                test: /\.(sass|scss)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'postcss-loader',
                        'sass-loader',
                    ],
                }),
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/public/index.html'),
            inject: 'body',
        }),
        new ExtractTextPlugin('styles.css'),
        new webpack.DefinePlugin({
            APP_NAME: JSON.stringify(process.env.APP_NAME),
        }),
        new DashboardPlugin(),
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'src/public'),
        port: 7700,
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    priority: -10,
                    test: /[\\/]node_modules[\\/]/,
                },
            },

            chunks: 'async',
            minChunks: 1,
            minSize: 30000,
            name: true,
        },
    },
};

// Minify and copy assets in production
if (isProd) {
    config.plugins.push(
        new UglifyJSPlugin(),
        //for assets, as images
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '/src/public'),
        }])
    );
}

module.exports = config;
