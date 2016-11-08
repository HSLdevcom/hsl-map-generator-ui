import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: "eslint-loader",
        exclude: /node_modules/
      }
    ],  
    noParse: /json-schema\/lib\/validate\.js/,
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main'],
    alias: {
      'mapbox-gl$': 'mapbox-gl/dist/mapbox-gl-dev'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'index.ejs' })
  ],
  externals: [
  ]
};
