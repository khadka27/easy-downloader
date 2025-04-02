import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "instagram.com",
      "scontent.cdninstagram.com",
      "scontent-iad3-1.cdninstagram.com",
      "graph.facebook.com",
      "pbs.twimg.com",
      "video.twimg.com",
      "p16-sign-va.tiktokcdn.com",
      "p16-sign-sg.tiktokcdn.com",
      "img.youtube.com",
    ],
  },
  // Increase API response size limit for handling large media files
  experimental: {
    serverComponentsExternalPackages: [],
    largePageDataBytes: 128 * 1000 * 1000, // 128MB limit for API responses
  },
};

export default nextConfig;
