const path = require("path");
const withLess = require("next-with-less");

module.exports = withLess({
  // reactStrictMode: true,
  lessLoaderOptions: {},
  webpack(config) {
    // Define path alias for styles directory
    config.resolve.alias["@styles"] = path.join(__dirname, "src/assets/styles");
    config.resolve.alias["@fonts"] = path.join(__dirname, "src/assets/fonts");

    // Add webpack rule for SVG files
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
});
