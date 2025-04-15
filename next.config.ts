import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
        port: '',
        pathname: '/my-bucket/**',
      },
      {
        protocol: 'https',
        hostname: 'sitem.ssgcdn.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'image.istarbucks.co.kr',
        port: '',
      },
    ],
  },
};

export default nextConfig;
