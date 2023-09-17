/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pbxt.generate.delivery",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
