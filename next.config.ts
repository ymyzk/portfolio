import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  exportPathMap: () => ({
    "/": { page: "/" },
  }),
};

export default nextConfig;
