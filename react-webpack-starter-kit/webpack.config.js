var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var webpack = require('webpack');

var devFlagPlugin = new webpack.DefinePlugin({
  'process.env.NODE_ENV': `"${process.env.NODE_ENV || 'development'}"`,
  __DEV__: process.env.NODE_ENV!=='production'
});

console.log("Development mode:", process.env.NODE_ENV)

module.exports = {
  entry: {
    'index': './js/index.jsx',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "[name].js"
  },
  module: {
    loaders: [
      // **IMPORTANT** This is needed so that each bootstrap js file required by
      // bootstrap-webpack has access to the jQuery object
      { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader',
        query: {presets: ['es2015','react', "stage-0"],
                plugins: []}
      },
      { test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader',
        query: {presets: ['es2015','react', "stage-0"],
                plugins: []}
      },
      { test: /\.less$/, loader: 'style!css!less' },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.css$/,  loader: "style-loader!css-loader"},
      { test: /\.woff2(\?.*)?$/, loader: "url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2" },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,  loader: "url?limit=10000&minetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,  loader: "file" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,  loader: "url?limit=10000&minetype=image/svg+xml" }
    ],
    noParse: [
      /plotly\.js/
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      {from: 'public'},
      {from: 'public/css/', to: 'css/'},
      {from: 'vendor/bootstrap/css/', to: 'css/'},
      {from: 'vendor/bootstrap/js/', to: 'js/'},
      {from: 'vendor/bootstrap/fonts/', to: 'fonts/'},
      {from: 'vendor/jquery/', to: 'js/'},
      {from: 'vendor/adminlte/js/', to: 'js/'},
      {from: 'vendor/adminlte/css/', to: 'css/'},
      {from: 'vendor/adminlte/img/', to: 'img/'},
    ]),
    devFlagPlugin,
    ...(process.env.NODE_ENV === 'production' ? [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin(),
    ] : []),
  ]
};
