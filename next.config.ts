import type { NextConfig } from "next";
import { readFileSync } from "fs";
import { join } from "path";

let uiVersion = "0.1.2";
try {
  const raw = readFileSync(join(process.cwd(), "node_modules/@cookest/ui/package.json"), "utf-8");
  uiVersion = JSON.parse(raw).version;
} catch {}

const nextConfig: NextConfig = {
  transpilePackages: ["@cookest/ui"],
  turbopack: {},
  env: { NEXT_PUBLIC_UI_VERSION: uiVersion },
};

export default nextConfig;
