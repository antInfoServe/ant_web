const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    app: "/src/index.js",
  },
  module: {
    rules: [
      { test: /\.js$/, use: "babel-loader", exclude: /node_modules/ },
      { test: /\.jsx$/, use: "babel-loader", exclude: /node_modules/ },
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, "css-loader"] },
      // { test: /\.svg$/, use: ["@svgr/webpack"] },
      { test: /\.(png|jp(e*)g|svg|gif|webp)$/, use: [{ loader: 'file-loader' }] },
    ],
  },
  resolve: {
    fallback: {
      buffer: require.resolve("buffer/"),
    },
  },
  output: {
    filename: "./index.js",
    path: __dirname + "/public",
  },
  devServer: {
    historyApiFallback: true,
  },
  stats: {
    errorDetails: true,
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/src/index.html",
      filename: "./index.html",
      favicon: "./src/assets/favicon.ico",
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
      ],
      mobile: true,
    }),
    new MiniCssExtractPlugin({
      filename: "./index.css",
    }),
    new CopyPlugin({
      patterns: [{ from: "./src/assets", to: "./assets" }, {from:"./src/service_worker.js", to:"./"}, {from:"./src/manifest.json", to:"./"}],
    }),
  ],
};
