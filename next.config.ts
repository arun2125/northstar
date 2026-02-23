import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/posts/:path*',
        destination: '/blog/:path*',
        permanent: true, // 301 redirect
      },
    ];
  },
};

export default nextConfig;
