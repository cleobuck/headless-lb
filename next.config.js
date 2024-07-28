const path = require("path");
const withLess = require("next-with-less");

const envVariables = {
  development: {
    API_URL: "https://tblg.redsports.be/",
    BASE_URL: "http://localhost:3000",
  },
  stage: {
    API_URL: "https://news.ladbrokes.be",
    BASE_URL: "http://localhost:3000",
  },
  production: {
    API_URL: "https://news.ladbrokes.be",
    BASE_URL: "https://news.ladbrokes.be",
  },
};

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

      {
        protocol: "https",
        hostname: "tblg.redsports.be",
        port: "", // typically left empty for default ports
        pathname: "/**", // match all paths under the domain
      },

      {
        protocol: "https",
        hostname: "i.ytimg.com",
        port: "", // typically left empty for default ports
        pathname: "/**", // match all paths under the domain
      },

      {
        protocol: "https",
        hostname: "secure.gravatar.com",
        port: "", // typically left empty for default ports
        pathname: "/**", // match all paths under the domain
      },
    ],
  },
  env: {
    BASE_URL: envVariables[process.env.NODE_ENV].BASE_URL,
    API_URL: envVariables[process.env.NODE_ENV].API_URL,
  },
});
