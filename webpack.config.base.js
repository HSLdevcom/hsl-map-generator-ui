
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
    context: __dirname,

    entry: {
        app: path.resolve(__dirname, "app/index"),
    },

    output: {
        path: path.join(__dirname, "dist"),
        publicPath: "/",
        filename: "bundle.js",
        clean: true,
    },

    resolve: {
        extensions: [".js", ".jsx"],
        mainFields: ["browser", "module", "main"],
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: [
                    path.resolve(__dirname, "app"),
                    path.resolve(__dirname, "node_modules/mapbox-gl/js"),
                ],
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.js$/,
                include: path.resolve(__dirname, "node_modules/hsl-map-style"),
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                type: "asset",
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({ template: "index.ejs" }),
        new Dotenv({ systemvars: true }),
    ],
};
