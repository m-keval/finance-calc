import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow HMR (hot-reload) from devices on the local network
  allowedDevOrigins: ["192.168.1.28"],
  async redirects() {
    return [
      { source: '/calculators/sip', destination: '/calculators/investment/sip-calculator', permanent: true },
      { source: '/calculators/loan-emi', destination: '/calculators/loan/emi-calculator', permanent: true },
      { source: '/calculators/inflation', destination: '/calculators/financial/inflation-calculator', permanent: true },
      { source: '/calculators/step-up-sip', destination: '/calculators/investment/step-up-sip-calculator', permanent: true },
      // other redirects could be added here if needed, matching the SEO data map
    ];
  },
};

export default nextConfig;
