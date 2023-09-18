/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pbxt.replicate.delivery",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "em-content.zobj.net",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
