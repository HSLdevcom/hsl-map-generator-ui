/* eslint-disable import/no-extraneous-dependencies */
const webpack = require("webpack");
const baseConfig = require("./webpack.config.base");

const config = {
    ...baseConfig,

    debug: true,

    devtool: "cheap-module-eval-source-map",

    entry: [
        "webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr",
        "./app/index",
    ],

    output: {
        ...baseConfig.output,
    },

    module: {
        ...baseConfig.module,
        loaders: [
            ...baseConfig.module.loaders,

            {
                test: /(node_modules.+|\.global)\.css$/,
                loaders: [
                    "style-loader",
                    "css-loader?sourceMap",
                ],
            },

            {
                test: /^((?!(node_modules|\.global)).)*\.css$/,
                loaders: [
                    "style-loader",
                    "css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]",
                ],
            },
        ],
    },

    plugins: [
        ...baseConfig.plugins,
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("development"),
                API_URL: JSON.stringify("http://kartat.hsl.fi/"),
                GLYPH_URL: JSON.stringify("http://kartat.hsl.fi/"),
            },
        }),
    ],

};

module.exports = config;
