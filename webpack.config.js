
module.exports = {
    entry: './chrome/js/main.js',
    output: {
        filename: './chrome/src/browser_action/bundle.js'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['babel'],
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /\.scss?$/,
                loaders: ['style', 'css', 'sass']
            }
        ]
    }
};
