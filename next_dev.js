const cli = require("next/dist/cli/next-dev");
const dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });

cli.nextDev({
    port: process.env.PORT || 3000,
    hostname: process.env.HOST || "0.0.0.0"
}, "./");