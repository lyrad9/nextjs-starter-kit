import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    authInterrupts: true,
    /* config options here */
  },
};
export default nextConfig;
