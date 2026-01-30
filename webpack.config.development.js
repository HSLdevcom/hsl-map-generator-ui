const path = require("path");
const webpack = require("webpack");
const baseConfig = require("./webpack.config.base");

module.exports = {
    ...baseConfig,
    mode: "development",
    devtool: "eval-cheap-module-source-map",
    entry: baseConfig.entry,
    module: {
        ...baseConfig.module,
        rules: [
            ...baseConfig.module.rules,
            {
                test: /\.css$/,
                include: /node_modules/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.css$/,
                include: path.resolve(__dirname, "app"),
                exclude: /\.global\.css$/,
                use: [
                    "style-loader",
                    {
                    loader: "css-loader",
                    options: {
                        sourceMap: true,
                        esModule: false, 
                        modules: {
                        localIdentName: "[name]__[local]___[hash:base64:5]",
                        },
                    },
                    },
                ],
            },
            {
                test: /\.global\.css$/,
                include: path.resolve(__dirname, "app"),
                use: ["style-loader", { loader: "css-loader", options: { sourceMap: true } }],
            },
        ]
    },
    plugins: [
        ...baseConfig.plugins,
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    ],
    devServer: {
        port: 3000,
        host: "localhost",
        hot: true,
        historyApiFallback: true,
        static: {
        directory: path.join(__dirname, "dist"),
            publicPath: "/",
        },
        client: {
            overlay: true,
        },
    },
};
