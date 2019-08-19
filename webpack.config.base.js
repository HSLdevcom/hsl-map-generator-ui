/* eslint-disable no-console, import/no-extraneous-dependencies */

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

const config = {
    module: {
        noParse: /json-schema\/lib\/validate\.js/,
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ["babel-loader"],
                include: [
                    path.resolve(__dirname, "app"),
                    path.resolve(__dirname, "node_modules/mapbox-gl/js")
                ]
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            }
        ],
        postLoaders: [
            {
                test: /\.js$/,
                loader: "transform?brfs",
                include: path.join(__dirname, "node_modules", "hsl-map-style")
            }
        ]
    },
    output: {
        path: path.join(__dirname, "dist"),
        publicPath: "",
        filename: "bundle.js"
    },
    resolve: {
        extensions: ["", ".js", ".jsx"],
        packageMains: [
            "webpack",
            "browser",
            "web",
            "browserify",
            ["jam", "main"],
            "main"
        ],
        /* alias: {
            "mapbox-gl$": "mapbox-gl/dist/mapbox-gl"
        }, */
        fallback: path.join(__dirname, "node_modules")
    },
    resolveLoader: {
        fallback: path.join(__dirname, "node_modules")
    },
    plugins: [new HtmlWebpackPlugin({template: "index.ejs"}), new Dotenv()],
    externals: []
};

module.exports = config;
