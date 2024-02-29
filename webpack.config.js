const path = require("path");

module.exports = {
  entry: "./src/index.js", // Entry point of your application
  output: {
    path: path.resolve(__dirname, "dist"), // Output directory
    filename: "bundle.js", // Output filename
  },
  resolve: {
    fallback: {
      zlib: require.resolve("browserify-zlib"), // Polyfill for zlib module
      crypto: false,
      http: false,
      https: require.resolve("https-browserify"),
      assert: false,
    },
  },
  // Other webpack configuration options can be added here
};

module.exports = {
  resolve: {
    fallback: {
      path: false,
      os: false,
      crypto: false,
      http: false,
      https: false,
      zlib: false,
      assert: false,
    },
  },
};
