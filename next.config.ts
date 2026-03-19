import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // allow your mobile device to access dev HMR
  allowedDevOrigins: ['http://192.168.29.220:3000'], // replace with your mobile URL
};

export default nextConfig;