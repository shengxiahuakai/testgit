var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    entry:'./app/js/main.js',
    output:{
        filename: '[name].min.js',
        path:path.resolve(__dirname, 'dist')
    },
    module:{
        rules:[{
            test:/\.html$/,
            loader: 'html-loader'
        },{
            test:/\.vue$/,
            loader:'vue-loader'
        },{
            test:/\.scss$/,
            loader:'style-loadder!css-loader!sass-loader'
        }]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    },
    plugins:[
        new HtmlWebpackPlugin({template:'./app/views/index.html'})
    ]
}