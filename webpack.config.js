const webpack = require('webpack');
const path = require('path');


/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

/*
 * We've enabled UglifyJSPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 *
 */

// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
//
//
// module.exports = {
//     module: {
//         rules: [{
//             include: [path.resolve(__dirname, 'src')],
//             loader: 'babel-loader',
//
//             options: {
//                 plugins: ['syntax-dynamic-import'],
//
//                 presets: [['env', {
//                     'modules': false
//                 }]]
//             },
//
//             test: /\.js$/
//         }, {
//             test: /\.(scss|css)$/,
//
//             use: [{
//                 loader: 'style-loader'
//             }, {
//                 loader: 'css-loader'
//             }, {
//                 loader: 'sass-loader'
//             }]
//         }]
//     },
//
//     entry: [path.resolve(__dirname, 'src/app/index.js')],
//
//     output: {
//         filename: '[name].[chunkhash].js',
//         path: path.resolve(__dirname, 'dist')
//     },
//
//     mode: 'development',
//
//     optimization: {
//         splitChunks: {
//             cacheGroups: {
//                 vendors: {
//                     priority: -10,
//                     test: /[\\/]node_modules[\\/]/
//                 }
//             },
//
//             chunks: 'async',
//             minChunks: 1,
//             minSize: 30000,
//             name: true
//         }
//     }
// };

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: __dirname + "/src/app/index.js",
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js',
        publicPath: '/'
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: [
                    /node_modules/
                ]
            },
            {
                test: /\.(sass|scss)$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + "/src/public/index.html",
            inject: 'body'
        })
    ],
    devServer: {
        contentBase: __dirname + '/src/public',
        port: 7700,
    }
};
