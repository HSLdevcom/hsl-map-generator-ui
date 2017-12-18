/* eslint-disable no-console, import/no-extraneous-dependencies */

const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const config = require("./webpack.config.development");

const app = express();
const compiler = webpack(config);

const wdm = webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: {
        colors: true,
    },
});

app.use(wdm);
app.use(webpackHotMiddleware(compiler));

const server = app.listen(process.env.PORT || 3000, "localhost", (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(`Listening at http://localhost:${process.env.PORT || 3000}`);
});

process.on("SIGTERM", () => {
    console.log("Stopping dev server");
    wdm.close();
    server.close(() => {
        process.exit(0);
    });
});
