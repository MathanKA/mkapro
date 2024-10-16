"use strict";
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
const glob = require("glob");
const autoprefixer = require("autoprefixer");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");

const PATHS = {
  src: path.join(__dirname, "src"),
};

module.exports = {
  mode: "development",
  entry: "./src/assets/js/app.js",
  output: {
    filename: "assets/js/app.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    static: path.resolve(__dirname, "dist"),
    port: 8080,
    hot: true,
    watchFiles: ["src/**/*.html"],
    client: {
      overlay: {
        errors: true,
        warnings: false,
        runtimeErrors: true,
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./src/index.html", filename: "./index.html", minify: false }),
    new HtmlWebpackPlugin({ template: "./src/blogs.html", filename: "./blogs.html", minify: false }),
    new HtmlWebpackPlugin({ template: "./src/blog-details.html", filename: "./blog-details.html", minify: false }),
    new miniCssExtractPlugin({
      filename: "assets/css/index.css",
    }),
    new CopyPlugin({
      patterns: [{ from: "src/assets/images", to: "assets/images" }],
    }),
    // new PurgeCSSPlugin({
    //   paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
    // }),
  ],
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          {
            // Extracts CSS for each JS file that includes CSS
            loader: miniCssExtractPlugin.loader,
          },
          {
            // Interprets `@import` and `url()` like `import/require()` and will resolve them
            loader: "css-loader",
          },
          {
            // Loader for webpack to process CSS with PostCSS
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [autoprefixer],
              },
            },
          },
          {
            // Loads a SASS/SCSS file and compiles it to CSS
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: false,
  },
};
