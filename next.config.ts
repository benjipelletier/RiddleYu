import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "d3",
    "d3-force",
    "d3-polygon",
    "react-force-graph-2d",
  ],
  serverExternalPackages: [
    "@neondatabase/serverless",
    "@vercel/kv",
    "@anthropic-ai/sdk",
  ],
};

export default nextConfig;
