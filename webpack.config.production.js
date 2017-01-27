import webpack from "webpack";
import ExtractTextPlugin from "extract-text-webpack-plugin";
import baseConfig from "./webpack.config.base";

const config = {
    ...baseConfig,

    devtool: "source-map",

    entry: "./app/index",

    output: {
        ...baseConfig.output,
    },

    module: {
        ...baseConfig.module,

        loaders: [
            ...baseConfig.module.loaders,

            {
                test: /\.global\.css$/,
                loader: ExtractTextPlugin.extract(
                    "style-loader",
                    "css-loader",
                ),
            },

            {
                test: /^((?!\.global).)*\.css$/,
                loader: ExtractTextPlugin.extract(
                    "style-loader",
                    "css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]",
                ),
            },
        ],
    },

    plugins: [
        ...baseConfig.plugins,
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production"),
                API_URL: JSON.stringify(""),
                GLYPHS_URL: JSON.stringify("http://136.243.66.163/"),
            },
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                screw_ie8: true,
                warnings: false,
            },
        }),
        new ExtractTextPlugin("style.css", { allChunks: true }),
    ],

};

export default config;
