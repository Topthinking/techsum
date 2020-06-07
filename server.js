const Award = require("award/server");
const { spawn } = require("child_process");
const path = require("path");
const argv = process.argv.slice(2);

spawn("node", [path.join(__dirname, "./parse.js"), argv[1], "-w"]);

const app = new Award();

app.listen();
