var path = require('path');

module.exports = {
    devtool: 'sourcemaps',
    entry: './src/main.js',
    output: {
        path: __dirname,
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                loaders: ['babel'],
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.scss?$/,
                loaders: ['style', 'css', 'sass']
            }
        ]
    }
};
