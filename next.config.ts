import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Environment variables can be exposed to the browser by prefixing with NEXT_PUBLIC_.
  // No explicit env config needed here if that convention is followed.
  // Example for server-only env vars (not used in this Firebase client-side setup):
  // env: {
  //   FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
  // },
};

export default nextConfig;
