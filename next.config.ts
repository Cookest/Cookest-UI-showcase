import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  transpilePackages: ["@cookest/ui"],
  webpack: (config) => {
    config.resolve.symlinks = true;
    return config;
  },
};

export default nextConfig;
