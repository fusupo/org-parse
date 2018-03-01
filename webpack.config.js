const path = require('path');
const webpack = require('webpack');

// module.exports = {
//   entry: './main.js',
//   output: {
//     filename: 'bundle.js'
//   }
// };

module.exports = {
  mode: 'production',
  entry: './main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.min.js',
    libraryTarget: 'umd',
    // libraryTarget: 'window',
    library: 'orgParse'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: 'babel-loader'
      }
    ]
  }
  // plugins: [new webpack.optimize.UglifyJsPlugin()]
};

// const path = require('path');
// const webpack = require('webpack');

// module.exports = {
//   entry: './lib/add.js',
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'add.min.js',
//     libraryTarget: 'umd',
//     library: 'add'
//   },
//   module: {
//     rules: [
//       {
//         test: /\.(js)$/,
//         use: 'babel-loader'
//       }
//     ]
//   },
//   plugins: [
//     new webpack.optimize.UglifyJsPlugin()
//   ]
// }
