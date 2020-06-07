const fs = require("fs");
const path = require("path");
const chokidar = require("chokidar");
const args = process.argv.slice(2);
const docs = path.join(args[0], "docs");

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
  let time = null;
  chokidar.watch(docs).on("all", function (e) {
    if (time) {
      clearTimeout();
    }
    time = setTimeout(start, 10);
  });
} else {
  start();
}
