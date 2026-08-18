import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  exportPathMap: () => ({
    "/": { page: "/" },
  }),
  experimental: {
    // The `typescript` package is aliased to `@typescript/typescript6` so that
    // tools needing the compiler API (typescript-eslint) keep working with
    // TypeScript 7 installed. That package ships `tsc6` instead of `tsc`, which
    // Next.js' TypeScript CLI mode cannot find, so use the compiler API instead.
    useTypeScriptCli: false,
  },
};

export default nextConfig;
