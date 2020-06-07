const fs = require("fs");
const path = require("path");
const chokidar = require("chokidar");
const Yaml = require("yamljs");
const args = process.argv.slice(2);
const docs = path.join(args[0], "docs");
const yamlFile = path.join(args[0], ".yaml");

function parseYaml() {
  const res = Yaml.parse(fs.readFileSync(yamlFile, "utf8"));
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
          d.name = item.replace(/^#\s(.*)[\s\S]?/, "$1");
        } else {
          if (/^##\s/.test(item)) {
            i++;
            v[i] = {
              name: item.replace(/^##\s(.*)[\s\S]?/, "$1"),
              id: `${fileIndex}-${i}`,
              children: [],
            };
          } else if (i > 0 && /^-\s/.test(item)) {
            v[i].children.push(item.replace(/^-\s(.*)[\s\S]?/, "$1"));
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
