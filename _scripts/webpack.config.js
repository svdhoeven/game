var webpack = require('webpack'),
    path = require('path');

module.exports = {
    entry : {
        'name' : './src/js/engine.js'
    },
    output : {
        path : path.join(__dirname, 'app'),
        publicPath : '/app/',
        filename : 'bundle.js'
    },
    plugins : [

    ],
    devtool : 'source-map',
    module : {
        loaders: [
            {
                test: /.js$/,
                exclude: /node_modules/,
                loader: 'babel?presets[]=es2015'
            }
        ],
    },
    resolve : {
        extensions : [
            '',
            '.js',
            '.json',
            '.sass'
        ]
    }
};