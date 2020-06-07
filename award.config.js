import config from "./.meta";

export default {
  assetPrefixs: config.assetPrefixs,
  plugins: [
    [
      "award-plugin-webpack-include",
      {
        include: /node_modules\/award-blog/,
      },
    ],
  ],
};
