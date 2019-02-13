const path = require('path');
const webpack = require('webpack');
const package = require('./package.json');


const banner = `/*!
// ==UserScript==
// @name         ${package.name}
// @namespace    ${package.name}
// @version      ${package.version}
// @description  Show object describes in salesforce
// @author       ${package.author}
// @match        https://*.force.com/*
// @match        https://*.salesforce.com/*
// @noframes     
// ==/UserScript==
*/

`;

module.exports = {
  // mode: 'development',
  mode: 'production',
  entry: path.join(__dirname, 'src', 'index.tsx'),
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'SalesforceDescribeTool.user.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  // devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader'
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin({ banner, raw: true })
  ]
};
