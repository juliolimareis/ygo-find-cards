const path = require('path');
const webpack = require('webpack');

const localPath = (dir) => path.join(__dirname, dir);

module.exports = {
  entry: ['@babel/polyfill', localPath('src/main.ts')],
  output: {
    path: localPath('public'),
    filename: 'bandle.js',
  },
  devServer: {
    static: {
      directory: localPath('public'),
    },
    hot: true,
    port: 9000,
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        type: 'assets/images',
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    }),
  ],
};
