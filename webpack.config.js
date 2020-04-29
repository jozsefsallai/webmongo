const webpack = require('webpack');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');
const config = require('sapper/config/webpack.js');
const pkg = require('./package.json');

const mode = process.env.NODE_ENV;
const dev = mode === 'development';
const hot = dev && process.env.HOT !== 0;

const alias = {
  svelte: path.resolve('node_modules', 'svelte'),
  '@': path.resolve('src')
};
const extensions = ['.mjs', '.js', '.json', '.svelte', '.html'];
const mainFields = ['svelte', 'module', 'browser', 'main'];

module.exports = {
  client: {
    entry: config.client.entry(),
    output: config.client.output(),
    resolve: { alias, extensions, mainFields },
    module: {
      rules: [
        {
          test: /\.(svelte|html)$/,
          use: {
            loader: 'svelte-loader-hot',
            options: {
              dev,
              emitCss: true,
              hydratable: true,
              hotReload: true,
              hotOptions: {
                optimistic: true
              }
            }
          }
        },
        {
          test: /\.css$/,
          use: [
            MiniCSSExtractPlugin.loader,
            'css-loader'
          ]
        }
      ]
    },
    mode,
    plugins: [
      // pending https://github.com/sveltejs/svelte/issues/2377
      // dev && new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'process.browser': true,
        'process.env.NODE_ENV': JSON.stringify(mode)
      }),
      new MiniCSSExtractPlugin('[name].css'),
      hot && new webpack.HotModuleReplacementPlugin()
    ].filter(Boolean),
    devtool: dev && 'inline-source-map',
    devServer: {
      historyApiFallback: {
        disableDotRule: true
      }
    }
  },

  server: {
    entry: config.server.entry(),
    output: config.server.output(),
    target: 'node',
    resolve: { alias, extensions, mainFields },
    externals: Object.keys(pkg.dependencies).concat('encoding'),
    module: {
      rules: [
        {
          test: /\.(svelte|html)$/,
          use: {
            loader: 'svelte-loader-hot',
            options: {
              css: false,
              generate: 'ssr',
              dev
            }
          }
        },
        {
          test: /\.css$/,
          use: [
            'file-loader',
            'css-loader'
          ]
        }
      ]
    },
    mode: process.env.NODE_ENV,
    performance: {
      hints: false // it doesn't matter if server.js is large
    }
  },

  serviceworker: {
    entry: config.serviceworker.entry(),
    output: config.serviceworker.output(),
    mode: process.env.NODE_ENV
  }
};
