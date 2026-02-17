import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.northstarastro.com',
          },
        ],
        destination: 'https://northstarastro.com/:path*',
        permanent: true, // 301 redirect
      },
    ];
  },
};

export default nextConfig;
