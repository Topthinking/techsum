const fs = require("fs");
const path = require("path");
const chokidar = require("chokidar");
const Yaml = require("yamljs");
const pinyin = require("pinyin");
const args = process.argv.slice(2);
const docs = path.join(args[0], "docs");
const yamlFile = path.join(args[0], ".yaml");
const pkg = require(path.join(__dirname, "package.json"));

function parseYaml() {
  const res = Yaml.parse(fs.readFileSync(yamlFile, "utf8"));
  res.version = pkg.version;
  fs.writeFileSync(
    path.join(__dirname, ".meta.js"),
    `module.exports = ${JSON.stringify(res)}`,
    {
      encoding: "utf-8",
    }
  );
}

function start() {
  const res = [];
  fs.readdirSync(docs).map((filename, fileIndex) => {
    const filepath = path.join(docs, filename);
    if (fs.statSync(filepath).isFile()) {
      const content = fs.readFileSync(filepath, "utf-8");
      const cr = content.split("\n");
      const v = {};
      let i = 0;
      const d = {
        id: fileIndex,
        filename,
        children: [],
      };
      cr.map((item) => {
        if (/^#\s/.test(item)) {
          const res = item.replace(/^#\s(.*)[\s\S]?/, "$1");
          d.name = res;
          d.pinyin = pinyin(res, {
            style: pinyin.STYLE_NORMAL,
          });
        } else {
          if (/^##\s/.test(item)) {
            i++;
            const res = item.replace(/^##\s(.*)[\s\S]?/, "$1");
            v[i] = {
              name: res,
              id: `${fileIndex}-${i}`,
              children: [],
              pinyin: [
                pinyin(res, {
                  style: pinyin.STYLE_NORMAL,
                }),
              ],
            };
          } else if (i > 0 && /^-\s/.test(item)) {
            const res = item.replace(/^-\s(.*)[\s\S]?/, "$1");
            v[i].pinyin.push(
              pinyin(res, {
                style: pinyin.STYLE_NORMAL,
              })
            );
            v[i].children.push(res);
          }
        }
      });
      for (let key in v) {
        d.children.push(v[key]);
      }
      res.push(d);
    }
  });

  fs.writeFileSync(
    path.join(__dirname, ".docs.js"),
    `module.exports = ${JSON.stringify(res)}`,
    {
      encoding: "utf-8",
    }
  );
}

if (args[1] === "-w") {
  let time1 = null;
  let time2 = null;

  chokidar.watch(docs).on("all", function (e) {
    if (time1) {
      clearTimeout();
    }
    time1 = setTimeout(start, 10);
  });
  chokidar.watch(yamlFile).on("all", function (e) {
    if (time2) {
      clearTimeout();
    }
    time2 = setTimeout(parseYaml, 10);
  });
} else {
  start();
  parseYaml();
}
