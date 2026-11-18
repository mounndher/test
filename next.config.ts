import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // AVIF first (much lighter than JPEG/WebP for the photographic hero), WebP as fallback.
    formats: ["image/avif", "image/webp"],
    // Photos never change between deployments: let the optimizer cache them for a year.
    minimumCacheTTL: 31536000,
  },
  /**
   * Redirects — old in-page anchors (#commercial-contractuel, #associes-actionnaires, …)
   * are URL fragments: they never reach the server, so no 301 is technically applicable.
   * All historic anchor ids are preserved on the homepage expertise cards and footer links
   * now point to the dedicated pages, so every legacy link keeps working without a redirect.
   */
  async redirects() {
    return [];
  },
};

export default nextConfig;
