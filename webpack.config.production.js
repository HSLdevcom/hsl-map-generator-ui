const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const baseConfig = require("./webpack.config.base");

module.exports = {
    ...baseConfig,

    mode: "production",
    devtool: "source-map",
    bail: true,

    entry: baseConfig.entry,

    output: {
        ...baseConfig.output,
        path: path.join(__dirname, "dist"),
        publicPath: "auto",
        filename: "bundle.[contenthash].js",
        assetModuleFilename: "assets/[hash][ext][query]",
        clean: true,
    },

    module: {
        ...baseConfig.module,
        rules: [
            ...baseConfig.module.rules,

            {
                test: /\.css$/,
                include: /node_modules/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },

            {
                test: /\.css$/,
                include: path.resolve(__dirname, "app"),
                exclude: /\.global\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            esModule: false,
                            modules: {
                                localIdentName: "[name]__[local]___[hash:base64:5]",
                            },
                            importLoaders: 1,
                        },
                    },
                ],
            },
            {
                test: /\.global\.css$/,
                include: path.resolve(__dirname, "app"),
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
        ],  
    },

    plugins: [
        ...baseConfig.plugins,
        new MiniCssExtractPlugin({
            filename: "style.[contenthash].css",
        }),
    ],  

    optimization: {
        splitChunks: {
            chunks: "all",
        },
    },
};
