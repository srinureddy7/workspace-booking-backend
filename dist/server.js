"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const db_1 = require("./config/db");
const env_1 = require("./config/env");
async function start() {
    await (0, db_1.connectDB)();
    const app = (0, app_1.createApp)();
    app.listen(env_1.PORT, () => {
        console.log(`Server running on port ${env_1.PORT}`);
    });
}
start().catch((err) => {
    console.error("Failed to start server", err);
});
