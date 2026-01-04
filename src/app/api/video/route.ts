import { NextResponse } from "next/server";

import { HTTPError } from "@/lib/errors";
import { makeErrorResponse, makeSuccessResponse } from "@/lib/http";

import { VideoInfo } from "@/types";
import { getVideoInfo } from "@/features/instagram";
import { INSTAGRAM_CONFIGS } from "@/features/instagram/constants";
import { getPostIdFromUrl } from "@/features/instagram/utils";

// Platform detection function
function detectPlatform(url: string): string {
  const urlLower = url.toLowerCase();

  if (urlLower.includes("instagram.com") || urlLower.includes("instagr.am")) {
    return "instagram";
  } else if (
    urlLower.includes("youtube.com") ||
    urlLower.includes("youtu.be")
  ) {
    return "youtube";
  } else if (urlLower.includes("tiktok.com")) {
    return "tiktok";
  } else if (urlLower.includes("facebook.com") || urlLower.includes("fb.com")) {
    return "facebook";
  } else if (urlLower.includes("twitter.com") || urlLower.includes("x.com")) {
    return "twitter";
  }

  return "unknown";
}

// Enhanced video info function for multiple platforms
async function getMultiPlatformVideoInfo(
  url: string,
  platform: string
): Promise<VideoInfo> {
  switch (platform) {
    case "instagram":
      const postId = await getPostIdFromUrl(url);
      if (!postId) {
        throw new HTTPError("Invalid Instagram URL", 400);
      }
      return await getVideoInfo(postId);

    case "youtube":
      // Import ytdl-core dynamically to avoid SSR issues
      const ytdl = (await import("@distube/ytdl-core")).default;

      if (!ytdl.validateURL(url)) {
        throw new HTTPError("Invalid YouTube URL", 400);
      }

      const videoInfo = await ytdl.getInfo(url);
      const videoDetails = videoInfo.videoDetails;
      const bestFormat = ytdl.chooseFormat(videoInfo.formats, {
        quality: "highest",
      });

      return {
        thumbnailUrl: videoDetails.thumbnails[0]?.url || null,
        title: videoDetails.title,
        author: videoDetails.author.name,
        duration: videoDetails.lengthSeconds,
        filename: `${videoDetails.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.${bestFormat.container}`,
        width: bestFormat.width?.toString() || "1920",
        height: bestFormat.height?.toString() || "1080",
        videoUrl: bestFormat.url,
      };

    case "tiktok":
      // Call TikTok API
      const tiktokResponse = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/tiktok?url=${encodeURIComponent(url)}`
      );
      if (!tiktokResponse.ok) {
        throw new HTTPError("Failed to fetch TikTok video info", 500);
      }
      const tiktokData = await tiktokResponse.json();
      return {
        thumbnailUrl: tiktokData.thumbnail,
        title: tiktokData.title,
        author: tiktokData.author,
        duration: tiktokData.duration,
        filename: tiktokData.filename,
        width: tiktokData.width,
        height: tiktokData.height,
        videoUrl: tiktokData.videoUrl,
      };

    case "facebook":
      // Call Facebook API
      const facebookResponse = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/facebook?url=${encodeURIComponent(url)}`
      );
      if (!facebookResponse.ok) {
        throw new HTTPError("Failed to fetch Facebook video info", 500);
      }
      const facebookData = await facebookResponse.json();
      return {
        thumbnailUrl: facebookData.thumbnail,
        title: facebookData.title,
        author: facebookData.author,
        duration: facebookData.duration,
        filename: facebookData.filename,
        width: facebookData.width,
        height: facebookData.height,
        videoUrl: facebookData.videoUrl,
      };

    case "twitter":
      // Call Twitter API
      const twitterResponse = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/twitter?url=${encodeURIComponent(url)}`
      );
      if (!twitterResponse.ok) {
        throw new HTTPError("Failed to fetch Twitter video info", 500);
      }
      const twitterData = await twitterResponse.json();
      return {
        thumbnailUrl: twitterData.thumbnail,
        title: twitterData.title,
        author: twitterData.author,
        duration: twitterData.duration,
        filename: twitterData.filename,
        width: twitterData.width,
        height: twitterData.height,
        videoUrl: twitterData.videoUrl,
      };

    default:
      throw new HTTPError("Unsupported platform", 400);
  }
}

function handleError(error: any) {
  if (error instanceof HTTPError) {
    const response = makeErrorResponse(error.message);
    return NextResponse.json(response, { status: error.status });
  } else {
    console.error(error);
    const response = makeErrorResponse();
    return NextResponse.json(response, { status: 500 });
  }
}

export async function GET(request: Request) {
  if (!INSTAGRAM_CONFIGS.enableServerAPI) {
    const notImplementedResponse = makeErrorResponse("Not Implemented");
    return NextResponse.json(notImplementedResponse, { status: 501 });
  }

  const postUrl = new URL(request.url).searchParams.get("postUrl");
  if (!postUrl) {
    const badRequestResponse = makeErrorResponse("Post URL is required");
    return NextResponse.json(badRequestResponse, { status: 400 });
  }

  // Detect platform from URL
  const platform = detectPlatform(postUrl);

  if (platform === "unknown") {
    const unsupportedPlatformResponse = makeErrorResponse(
      "Unsupported platform. Please provide a valid URL from Instagram, YouTube, TikTok, Facebook, or Twitter."
    );
    return NextResponse.json(unsupportedPlatformResponse, { status: 400 });
  }

  try {
    const postJson = await getMultiPlatformVideoInfo(postUrl, platform);
    const response = makeSuccessResponse<VideoInfo>(postJson);
    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    return handleError(error);
  }
}
