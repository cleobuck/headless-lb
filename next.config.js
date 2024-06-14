const path = require("path");
const withLess = require("next-with-less");

module.exports = withLess({
  // reactStrictMode: true,
  lessLoaderOptions: {
    lessOptions: {
      javascriptEnabled: true,
    },
  },
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

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "news.ladbrokes.be",
        port: "", // typically left empty for default ports
        pathname: "/**", // match all paths under the domain
      },
    ],
  },
});
