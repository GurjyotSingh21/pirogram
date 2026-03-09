import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.md": {
        loaders: ["ignore-loader"],
      },
      "*.cts": {
        loaders: ["ignore-loader"],
      },
    },
  },
};

export default nextConfig;