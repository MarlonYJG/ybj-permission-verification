/*
 * @Author: Marlon
 * @Date: 2024-06-29 23:49:44
 * @Description: 
 */
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'ybj-permission-verification.min.js',
    library: 'YBJPermissionVerification',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  mode: 'production',
  optimization: {
    minimizer: [new TerserPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          }
        },
      },
    ],
  }
};
