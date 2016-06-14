import path from 'path';

export default {
  module: {
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
    filename: 'bundle.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main'],
    alias: {
      'mapbox-gl$': 'mapbox-gl/dist/mapbox-gl-dev'
    }
  },
  plugins: [

  ],
  externals: [
  ]
};
