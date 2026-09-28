
const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

// maplibre-gl-worker.mjs imports maplibre-gl-shared.mjs by relative path, but the worker
// is copied as an asset so its imports are not followed, and maplibre-gl.mjs needs the
// shared module as real code. Emit it next to the worker by hand.
class MaplibreWorkerAssetsPlugin {
    apply(compiler) {
        compiler.hooks.thisCompilation.tap("MaplibreWorkerAssets", (compilation) => {
            const file = fs.readFileSync(
                path.resolve(
                    __dirname,
                    "node_modules/maplibre-gl/dist/maplibre-gl-shared.mjs"
                )
            );
            compilation.emitAsset(
                "maplibre-gl-shared.mjs",
                new webpack.sources.RawSource(file)
            );
        });
    }
}

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
            {
                // maplibre-gl 6 resolves its worker url from import.meta.url, which webpack
                // rewrites to a file:// path, so the worker is never fetched and the map
                // renders nothing. Emit the worker next to the bundle; app/index.js points
                // maplibre at it. See also MaplibreWorkerAssetsPlugin for the file it imports.
                test: /maplibre-gl-worker\.mjs$/,
                include: path.resolve(__dirname, "node_modules/maplibre-gl/dist"),
                type: "asset/resource",
                generator: {
                    filename: "[name][ext]",
                },
            },
        ],
    },

    ignoreWarnings: [
        {
            module: /node_modules\/maplibre-gl\/dist\/maplibre-gl\.mjs$/,
            message: /Critical dependency: the request of a dependency is an expression/,
        },
    ],

    plugins: [
        new HtmlWebpackPlugin({ template: "index.ejs" }),
        new Dotenv({ systemvars: true }),
        new MaplibreWorkerAssetsPlugin(),
    ],
};
