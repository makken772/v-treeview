var path = require('path')
var webpack = require('webpack')
const WebpackShellPluginNext = require('webpack-shell-plugin-next');

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',
        filename: 'v-treeview.min.js',
        library: 'VTreeview',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    externals: {
        "vue": "Vue"
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }, ]
    },
    plugins: [
        new WebpackShellPluginNext({
            onBuildStart:{
              scripts: ['echo "Webpack Start"'],
              blocking: true,
              parallel: false
            }, 
            onBuildEnd:{
              scripts: ['echo "Webpack End"'],
              blocking: false,
              parallel: true
            }
        })
        /*new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            include: /\.min\.js$/,
            compress: {
                warnings: false
            }
        })*/
    ],
    performance: {
        hints: "error"
    },
    devtool: 'source-map'
}