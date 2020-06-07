#!/usr/bin/env node
const { spawn } = require("child_process");
const path = require("path");
const argv = process.argv.slice(2);
const cwd = process.cwd();

const type = argv[0];

if (type === "dev") {
  spawn("node", ["server.js", "dev", cwd], {
    stdio: "inherit",
    cwd: path.join(__dirname, ".."),
  });
}

if (type === "build") {
  (async () => {
    process.env.NODE_ENV = "production";
    // 处理解析配置逻辑
    await new Promise((resolve) => {
      const parse = spawn("node", ["parse.js", cwd], {
        stdio: "inherit",
        cwd: path.join(__dirname, ".."),
      });
      parse.on("close", resolve);
    });
    // 开始编译导出
    const cmd = path.join(
      __dirname,
      "..",
      "node_modules",
      ".bin",
      /^win/.test(process.platform) ? "award.cmd" : "award"
    );
    await new Promise((resolve) => {
      const compiler = spawn(cmd, ["export"], {
        stdio: "inherit",
        cwd: path.join(__dirname, ".."),
      });
      compiler.on("close", resolve);
    });
    console.log("end");
  })();
}
