const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: {
    'js/bundle.js':'./src/js/app.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]',
  },
  devtool: 'source-map',
  module: {
    rules: [{
        test: /\.js$/,
        include: path.resolve(__dirname, 'src/js'),
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(sass|scss)$/,
        include: path.resolve(__dirname, 'src/style'),
        use: [
           MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            js: 'babel-loader',
          }
        }
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './css/style.css',
      allChunks: true,
    }),
    new VueLoaderPlugin(),
  ]
};
