const path = require('path');

module.exports = {
 
  // Currently we need to add '.ts' to the resolve.extensions array.
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  entry: './client/index.tsx',
  watch:true,
  output: {
    path: path.join(__dirname, '/client/dist'),
    filename: 'bundle.js',
    publicPath:'/client/dist'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }
    ]
  },
  devServer:{
    host: '0.0.0.0',
    port: 8080,
    publicPath:'/dist/',
    contentBase: path.join(__dirname,'./client'),
    hot:true
  }
};