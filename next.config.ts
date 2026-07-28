import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow HMR (hot-reload) from devices on the local network
  allowedDevOrigins: ["192.168.1.28"],
};

export default nextConfig;
