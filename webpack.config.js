"use strict";

const path = require("path"),
    fs = require("fs"),
    webpack = require("webpack");

//==========================================================

const isDebug = process.env.NODE_ENV === "development",
    cssLoaderConfig = JSON.stringify({
        sourceMap: true,
        autoprefixer: false,
        discardComments: {removeAll: true},
        minimize: !isDebug
    }),
    autoprefixerConfig = JSON.stringify({
        browsers: "last 2 versions",
        cascade: false
    });

const webpackPlugins = () => {
    const plugins = [
        new webpack.optimize.OccurenceOrderPlugin(true)
    ];

    if (!isDebug) {
        plugins.push(
            new webpack.DefinePlugin({
                "process.env": {NODE_ENV: JSON.stringify("production")}
            }),
            new webpack.optimize.OccurrenceOrderPlugin(true),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin({
                comments: false,
                warnings: false,
                screw_ie8: true,
                compress: {
                    warnings: false,
                    pure_getters: true,
                    drop_console: true,
                    keep_fargs: false
                }
            }),
            new webpack.NoErrorsPlugin()
        );
    }

    return plugins;
};

const babelPlugins = () => {
    const plugins = [
        "transform-react-jsx",
        "transform-object-rest-spread"
    ];

    if (isDebug) {
        // Don't compile down fully to ES5 as we only debug on latest Chrome / Safari 9 / Firefox
        plugins.push(
            "transform-es2015-arrow-functions",
            "transform-es2015-block-scoping",
            "transform-es2015-classes",
            "transform-es2015-destructuring",
            "transform-es2015-modules-commonjs",
            "transform-es2015-parameters"
        );
    } else {
        plugins.push(
            // Reduces helper code repeating
            // https://babeljs.algolia.com/docs/usage/runtime/
            "transform-runtime",
            "transform-react-constant-elements",
            "transform-react-inline-elements"
        );
    }

    return plugins;
};

const config = {
    entry: "./src/index.jsx",
    cache: true,
    debug: isDebug,
    devtool: isDebug ? "cheap-module-eval-source-map" : "source-map",
    devServer: {
        port: 4000
    },
    module: {
        loaders: [
            {
                loader: "babel",
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                query: {
                    // Compile down fully to ES5 for production
                    presets: isDebug ? null : ["es2015"],
                    plugins: babelPlugins()
                }
            },
            {
                loader: `style!css?${cssLoaderConfig}!autoprefixer?${autoprefixerConfig}!`,
                test: /\.css$/
            }
        ]
    },
    plugins: webpackPlugins(),
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "dist"
    }
};

module.exports = config;
