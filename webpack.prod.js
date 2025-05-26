const path = require("path");
const common = require("./webpack.common.js");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const copyPlugin = require("copy-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(?:js|mjs|cjs)/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env"]],
          },
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new copyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/script/sw.js"),
          to: path.resolve(__dirname, "dist/"),
        },
      ],
    }),
  ],
});
