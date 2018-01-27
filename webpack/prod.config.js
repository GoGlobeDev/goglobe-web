require('babel-polyfill');

// Webpack config for creating the production bundle.
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var strip = require('strip-loader');

var projectRootPath = path.resolve(__dirname, '../');
var assetsPath = path.resolve(projectRootPath, './static/dist');

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

module.exports = {
  devtool: 'source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    'main': [
      './src/client.js'
    ]
  },
  output: {
    path: assetsPath,
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
            {
                loader: strip.loader('debug')
            },
            {
                loader: 'babel-loader'
            }
        ]
      },
      {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: 'css-loader'
          })
      },
      {
          test: /\.styl$/,
          use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: [ {
                  loader:'css-loader',
                  options: {
                      importLoaders: 2,
                      sourceMap: true
                  }
              },
              {
                  loader: 'postcss-loader',
                  options: {
                    browsers: 'last 2 version',
                    sourceMap: true
                  }
              },
              'stylus-loader'
             ]
          })
      },
      {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          use: {
              loader: 'url-loader',
              options: {
                  limit: 10000,
                  mimetype: 'application/octet-stream'
              }
          }
      },
      {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          use: {
              loader: 'url-loader',
              options: {
                  limit: 10000,
                  mimetype: 'image/svg+xml'
              }
          }
      },
      {
          test: webpackIsomorphicToolsPlugin.regular_expression('images'),
          use: {
              loader: 'url-loader',
              options: {
                  limit: 10240
              }
          }
      }
    ]
  },
  resolve: {
    modules: [
        path.resolve(__dirname, '../src'),
        "node_modules"
    ],
    alias: {
        theme: path.resolve(__dirname, '../src/theme'),
        utilities: path.resolve(__dirname, '../src/utilities')
    },
    extensions: ['.json', '.js', '.jsx']
  },
  plugins: [
    new CleanPlugin([assetsPath], { root: projectRootPath, verbose: true }),

    // css files from the extract-text-plugin loader
    new ExtractTextPlugin({
        filename: '[name]-[contenthash].css',
        allChunks: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      },

      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false
    }),

    // ignore dev config
    new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),

    // optimizations
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
        // index.html => index0.html
        filename: '../index0.html',
        template: './src/theme/index.html',
        minify: {
            removeComments: true,
            collapseWhitespace: true
        }
    }),
    webpackIsomorphicToolsPlugin
  ]
};
