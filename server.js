/* eslint no-console: 0 */

import express from "express";
import config from "./webpack.config.production";

const app = express();
const PORT = 3000;
const staticPath = config.output.path;

app
.use(express.static(staticPath))
.get("/", (req, res) => {
    res.sendFile("index.html", {
        root: staticPath,
    });
});

const server = app.listen(PORT, "localhost", (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(`Listening at http://localhost:${PORT}`);
});

process.on("SIGTERM", () => {
    console.log("Stopping server");
    server.close(() => {
        process.exit(0);
    });
});
