#!/usr/bin/env node

const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs-extra");
const cwd = process.cwd();
const argv = process.argv.slice(2);
const type = argv[0];
const yamlFile = path.join(cwd, ".yaml");
const copydir = require("copy-dir");

if (type === "init") {
  if (!fs.existsSync(yamlFile)) {
  }
  process.exit();
}

if (!fs.existsSync(yamlFile)) {
  console.log("请使用【cb init】初始化配置文件");
  process.exit();
}

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
    const meta = require(path.join(__dirname, "..", ".meta.js"));
    copydir.sync(
      path.join(__dirname, "..", "dist"),
      path.join(cwd, meta.output || "public"),
      {
        utimes: true,
        mode: true,
        cover: true,
      }
    );
  })();
}
