import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns: [
      {
        hostname: 'utfs.io',
      },
      {
        protocol: 'https',
        hostname: 'img-cdn.pixlr.com',
        pathname: '/**', // Allows any image path under this domain
      }
    ]
  }
};

export default nextConfig;
