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
      // Additional domains for Instagram and TikTok
      "cdninstagram.com",
      "scontent.cdninstagram.com",
      "scontent-sjc3-1.cdninstagram.com",
      "scontent-ort2-1.cdninstagram.com",
      "scontent-ort2-2.cdninstagram.com",
      "scontent-iad3-1.cdninstagram.com",
      "v16-webapp.tiktok.com",
      "v19.tiktokcdn.com",
      "v16.tiktokcdn.com",
      "p16-sign.tiktokcdn-us.com",
    ],
  },
  // Increase API response size limit for handling large media files
  experimental: {
    serverComponentsExternalPackages: [],
    largePageDataBytes: 256 * 1000 * 1000, // 256MB limit for API responses
  },
  // Increase maxDuration for API routes that handle large video downloads
  serverRuntimeConfig: {
    api: {
      responseLimit: "256mb",
      bodyParser: {
        sizeLimit: "256mb",
      },
    },
  },
  // Disable strict mode for this application since we're dealing with external APIs
  reactStrictMode: false,
};

export default nextConfig;
