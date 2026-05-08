import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@cookest/ui"],
  turbopack: {
    root: "../",
  },
};

export default nextConfig;
