import config from "./.meta";
import * as os from "os";

let reg = /\/node_modules\/techsum/;

if (os.type() === "Windows_NT") {
  reg = /\\node_modules\\techsum/;
}

export default {
  assetPrefixs: config.assetPrefixs,
  plugins: [
    [
      "award-plugin-webpack-include",
      {
        include: reg,
      },
    ],
  ],
};
