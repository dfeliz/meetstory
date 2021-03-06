const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");

const PAGES_PATH = "./src/pages";

function generateHtmlPlugins(items) {
  return items.map(
    (name) =>
      new HtmlPlugin({
        filename: `./${name}.html`,
        chunks: [name],
      })
  );
}

module.exports = {
  mode: 'production',
  entry: {
    background: `${PAGES_PATH}/background`,
    popup: `${PAGES_PATH}/popup`,
    content_scripts: `${PAGES_PATH}/content_scripts`,
    options: `${PAGES_PATH}/options`,
  },
  output: {
    path: path.resolve("dist/pages"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader"],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "svg-url-loader",
            options: {
              limit: 10000,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ],
  },
  plugins: [
    new CopyPlugin([
      {
        from: "src",
        to: path.resolve("dist"),
        ignore: ["pages/**/*"],
      },
    ]),
    ...generateHtmlPlugins(["background", "popup", "content_scripts", "options"]),
  ],
};
