const path = require('path');
module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./static/build"),
    filename: "[name].js"
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ],
  },

};