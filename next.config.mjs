/** @type {import('next').NextConfig} */
const env = process.env.VERCEL_ENV;
import withPlaiceholder from "@plaiceholder/next";

const nextConfig = {
  experimental: { typedRoutes: true },
  logging: { fetches: { fullUrl: true } },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pbxt.replicate.delivery",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "9p2lnmynrr4tito0.public.blob.vercel-storage.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "replicate.delivery",
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

if (env === "preview") {
  nextConfig.typescript = {
    ignoreBuildErrors: true,
  };
}

export default withPlaiceholder(nextConfig);
