import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // pin the workspace root — several lockfiles exist higher up the tree
  turbopack: { root: __dirname },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "image.mux.com" },
      { protocol: "https", hostname: "picsum.photos" }, // demo stills only
    ],
  },
};

export default nextConfig;
