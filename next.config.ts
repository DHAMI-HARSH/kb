import type { NextConfig } from "next";

// Keep config untyped to avoid mismatches with Next.js type definitions
// (some Next versions' `NextConfig` type may not include newer fields).
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
