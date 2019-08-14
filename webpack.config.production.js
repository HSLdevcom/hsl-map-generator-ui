/* eslint-disable import/no-extraneous-dependencies */
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const baseConfig = require("./webpack.config.base");

const config = {
    bail: true,

    ...baseConfig,

    devtool: "source-map",

    entry: "./app/index",

    output: {
        ...baseConfig.output
    },

    module: {
        ...baseConfig.module,

        loaders: [
            ...baseConfig.module.loaders,

            {
                test: /(node_modules.+|\.global)\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },

            {
                test: /^((?!(node_modules|\.global)).)*\.css$/,
                loader: ExtractTextPlugin.extract(
                    "style-loader",
                    "css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]"
                )
            }
        ]
    },

    plugins: [
        ...baseConfig.plugins,
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                screw_ie8: true,
                warnings: false
            }
        }),
        new ExtractTextPlugin("style.css", {allChunks: true})
    ]
};

module.exports = config;
