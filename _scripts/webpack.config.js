var webpack = require('webpack'),
    path = require('path');

var projectPath = path.resolve(__dirname, '..');

module.exports = {
    entry: projectPath + '/src/js/Main.js',
    output: {
        path: projectPath + '/app/bundles',
        filename: 'game.js'
    },
    plugins : [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
    ],
    devtool : 'source-map',
    module : {
        loaders: [
            {
                test: /\.js$/,
                include: [
                    path.join(projectPath, 'src/js'),
                    path.join('node_modules/three'),
                    path.join('node_modules/dat.gui')
                ],
                loader: 'babel-loader',
                query: {
                    plugins: ['transform-es2015-modules-commonjs'].map(function (name) {
                        return require.resolve("babel-plugin-" + name)
                    }),
                    presets: ['es2015'].map(function (name) {
                        return require.resolve("babel-preset-" + name)
                    }),
                    sourceMaps: 'inline'
                }
            },
        ]

    },
    resolve : {
        extensions : [
            '',
            '.js',
            '.json',
            '.sass'
        ],
        fallback: [path.join(__dirname, 'node_modules')]
    },
    resolveLoader: {
        fallback: [path.join(__dirname, 'node_modules')]
    },
    cache: false
};
