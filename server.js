const Award = require("award/server");
const { spawn } = require("child_process");
const path = require("path");
const argv = process.argv.slice(2);

const parse = spawn(
  "node",
  [path.join(__dirname, "./parse.js"), argv[1], "-w"],
  {
    stdio: "inherit",
  }
);

parse.on("close", function () {
  process.exit();
});

const app = new Award();

app.listen();
