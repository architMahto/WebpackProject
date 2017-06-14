var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = [
  'react', 'lodash', 'redux', 'react-redux', 'react-dom',
  'faker', 'react-input-range', 'redux-form', 'redux-thunk'
];

module.exports = {
  entry: {
    bundle: './src/index.js',
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.join(__dirname, 'dist'),
    // filename changes after any change is made to either the bundle or vendor
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        // exclude does not apply loader to any files inside the value of exclude
        exclude: /node_modules/
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/
      }
    ]
  },
  plugins: [
    // ensures that vendor files are only loaded from vendor instead of bundle.
    new webpack.optimize.CommonsChunkPlugin({
      // a third javascript file is created in the /dist directory
      // the purpose of this file is to better tell the browser
      // whether or not the vendor file got changed 
      names: ['vendor', 'manifest'],
    }),
    // obsolete the need to manually replace script tags inside index.html
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};
