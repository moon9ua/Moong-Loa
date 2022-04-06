/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

// module.exports = nextConfig

const debug = process.env.NODE_ENV !== "production";
const name = "Moong-Loa";

module.exports = {
  ...nextConfig,
  assetPrefix: !debug ? `/${name}/` : "",
  env: {
    BACKEND_URL: debug ? "" : `/${name}`,
  },
};
