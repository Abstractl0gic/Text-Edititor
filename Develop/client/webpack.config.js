const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development', // Set the mode to development for webpack

    // Entry points for the application. Each key represents a separate bundle.
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
      editor: './src/js/editor.js',
      database: './src/js/database.js',
      header: './src/js/header.js',
    },
    
    // Output configuration for bundled files
    output: {
      filename: '[name].bundle.js', // Output file names with [name] being replaced by the entry point key
      path: path.resolve(__dirname, 'dist'), // Output directory path
    },
    
    // List of plugins used in the build process
    plugins: [
      // Plugin to generate HTML file and inject bundled scripts
      new HtmlWebpackPlugin({
        template: './index.html', // Path to the template HTML file
        title: 'Text Editor', // Title for the generated HTML file
        filename: 'index.html', // Output HTML file name
      }),

      // Plugin for generating the service worker script
      new InjectManifest({
        swSrc: './src-sw.js', // Path to the source service worker file
        swDest: 'src-sw.js', // Destination file name for the generated service worker
      }),

      // Plugin for generating the web app manifest file
      new WebpackPwaManifest({
        fingerprints: false, // Do not add fingerprints to the generated files
        inject: true, // Inject the manifest into the generated HTML file
        name: 'Text Editor', // Name of the web app
        short_name: 'Editor', // Short name for the web app
        description: 'JavaScript Text editor', // Description of the web app
        background_color: '#225ca3', // Background color of the web app
        theme_color: '#225ca3', // Theme color of the web app
        start_url: '/', // Start URL of the web app
        publicPath: '/', // Public path for the assets in the manifest
        icons: [
          {
            src: path.resolve('src/images/logo.png'), // Path to the icon image file
            sizes: [96, 128, 192, 256, 384, 512], // Sizes of the icon for different devices
            destination: path.join('assets', 'icons'), // Output directory for the icons
          },
        ],
      }),
    ],

    // Module rules for handling different file types
    module: {
      rules: [
        {
          test: /\.css$/i, // Match CSS files
          use: ['style-loader', 'css-loader'], // Use style-loader and css-loader for CSS files
        },
        {
          test: /\.m?js$/, // Match JavaScript files
          exclude: /node_modules/, // Exclude files in the node_modules directory
          use: {
            loader: 'babel-loader', // Use Babel loader for JavaScript files
            options: {
              presets: ['@babel/preset-env'], // Babel presets for transpiling JavaScript
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'], // Babel plugins
            },
          },
        },
      ],
    },
  };
};
