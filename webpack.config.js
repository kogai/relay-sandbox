const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const AssetsWebpackPlugin = require("assets-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const dotenv = require('dotenv')
dotenv.config({ path: path.join(__dirname, '.env') })

const input = path.resolve(__dirname, "src");
const output = path.resolve(__dirname, "public");

module.exports = {
  devServer: {
    contentBase: './src'
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: [{
        loader: "babel-loader",
        query: {
          cacheDirectory: true,
        },
      }],
      exclude: /node_modules/,
    }],
  },
  context: input,
  entry: ['whatwg-fetch', path.resolve(__dirname, 'src', 'App.jsx')],
  output: {
    filename: "index.js",
    path: output,
  },
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".jsx"],
    modules: [
      input,
      "node_modules",
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        TOKEN: JSON.stringify(process.env.TOKEN),
      },
    }),
  ]
};
