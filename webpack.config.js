const path = require('path');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

console.log(`Running in ${process.env.NODE_ENV || 'production'} mode`);

const config = {
  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.min.js',
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },

  watchOptions: {
    ignored: [
      path.resolve(__dirname, './node_modules'),
      path.resolve(__dirname, './demos'),
      path.resolve(__dirname, './build'),
      path.resolve(__dirname, './cache'),
      path.resolve(__dirname, './dist'),
      path.resolve(__dirname, './bin'),
    ],
  },

  devtool: 'source-map',
  context: __dirname,
  target: 'node-webkit',

  module: {
    rules: [
      {
        test: /\.(jpg|jpeg|png)$/,
        use: 'url-loader?limit=1000',
      },
      {
        test: /\.(woff|woff2|eot|otf|ttf|svg)$/,
        use: 'file-loader',
      },
      {
        test: /\.json$/,
        use: 'json-loader',
      },
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /\.(scss|css)$/,
        use: ExtractTextPlugin.extract({
          use: [
            { loader: 'css-loader', options: { sourceMap: true } },
            { loader: 'resolve-url-loader', options: { sourceMap: true } },
            { loader: 'postcss-loader', options: { sourceMap: true } },
            { loader: 'sass-loader', options: { sourceMap: true } },
          ],
        }),
      },
    ],
  },

  plugins: [
    new Webpack.optimize.ModuleConcatenationPlugin(),

    new Webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          require('autoprefixer'),
        ],
        devServer: {
          inline: true,
        },
      },
    }),

    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),

    new ExtractTextPlugin({
      filename: './index.min.css',
      allChunks: true,
    }),

    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};

if (process.env.NODE_ENV === 'production') {
  // …
}

module.exports = config;
