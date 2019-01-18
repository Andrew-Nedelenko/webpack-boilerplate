"use strict";
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "js/main.js"
  },
  mode: "production",
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({}),
      new UglifyJsPlugin({
        uglifyOptions: {
            ecma: 5,
            warnings: false,
            compress: true,
            mangle: true,
            keep_fnames: true,
            output: {
                beautify: false,
                comments: false
            }
        }
    })]
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [{ loader: "html-loader", options: { minimize: false } }]
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "./img/[name].[ext]",
              limit: 100
            }
          },
          {
            loader: "img-loader"
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
          }
        },
        {
            loader: 'postcss-loader',
            options: {
                plugins: () => [
                    require('autoprefixer')
                ],
                sourceMap: true
            }
        },
        {
            loader: 'sass-loader',
            options: {
                sourceMap: true
            }
        }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "src/index.html",
      filename: "./index.html"
    }),
    new HtmlWebPackPlugin({
        template: "src/index2.html",
        filename: "./index2.html"
      }),
    new MiniCssExtractPlugin({
        filename: "css/[name].css",
        chunkFilename: "[id].css"
      }),
      new CopyWebpackPlugin([{ from: 'src/img/favicons.png', to: 'img/'}])
  ]
};