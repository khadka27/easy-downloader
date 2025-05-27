/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";

// Desktop user agent for general use
const DEFAULT_USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36";
// Mobile user agent (useful for Instagram Reels)
const MOBILE_USER_AGENT =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1";

async function extractInstagramMedia(url: string) {
  try {
    // Use mobile UA for Instagram reels; otherwise use desktop UA
    const userAgent = url.includes("/reel/")
      ? MOBILE_USER_AGENT
      : DEFAULT_USER_AGENT;
    const response = await axios.get(url, {
      headers: {
        "User-Agent": userAgent,
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
      },
    });
    const $ = cheerio.load(response.data);

    // Prioritize video meta tags
    const videoUrl =
      $('meta[property="og:video"]').attr("content") ||
      $('meta[property="og:video:secure_url"]').attr("content") ||
      $('meta[property="og:video:url"]').attr("content");

    if (videoUrl) {
      console.log("Found Instagram video URL:", videoUrl);
      return { mediaUrl: videoUrl, mediaType: "video" as const };
    }

    // Fallback: return image URL if video is not available
    const imageUrl =
      $('meta[property="og:image"]').attr("content") ||
      $('meta[property="og:image:secure_url"]').attr("content");

    if (imageUrl) {
      console.log("Found Instagram image URL (fallback):", imageUrl);
      return { mediaUrl: imageUrl, mediaType: "image" as const };
    }

    // Alternative: check JSON data from script tags if available
    const scriptTags = $('script[type="application/ld+json"]');
    for (let i = 0; i < scriptTags.length; i++) {
      try {
        const jsonData = JSON.parse($(scriptTags[i]).html() || "{}");
        if (jsonData.video && jsonData.video.contentUrl) {
          console.log(
            "Found Instagram video in JSON:",
            jsonData.video.contentUrl
          );
          return {
            mediaUrl: jsonData.video.contentUrl,
            mediaType: "video" as const,
          };
        }
      } catch (e) {
        console.error("Error parsing JSON in script tag:", e);
      }
    }

    throw new Error("No media found on this Instagram post");
  } catch (error: any) {
    console.error("Instagram extraction error:", error);
    throw new Error("Failed to extract media from Instagram");
  }
}

// (Other extraction functions for Facebook, Twitter, TikTok, YouTube remain similar)

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();
    if (!url) {
      return NextResponse.json(
        { success: false, message: "URL is required" },
        { status: 400 }
      );
    }

    console.log("Processing URL:", url);
    let result;

    if (url.includes("instagram.com")) {
      result = await extractInstagramMedia(url);
      console.log("Instagram media extracted:", result);
    } else if (url.includes("facebook.com")) {
      // ... similar extraction for Facebook
    } else if (url.includes("twitter.com") || url.includes("x.com")) {
      // ... similar extraction for Twitter
    } else if (url.includes("tiktok.com")) {
      // ... similar extraction for TikTok
    } else if (url.includes("youtube.com") || url.includes("youtu.be")) {
      // For YouTube we return a thumbnail here (full download handled separately)
      // ... similar extraction for YouTube
    } else {
      return NextResponse.json(
        {
          success: false,
          message:
            "Unsupported platform. Supported platforms: Instagram, Facebook, Twitter, TikTok, YouTube",
        },
        { status: 400 }
      );
    }

    // Check if result exists before accessing its properties
    if (!result) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to extract media from the provided URL",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      mediaUrl: result.mediaUrl,
      mediaType: result.mediaType,
    });
  } catch (error: any) {
    console.error("Download error:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 }
    );
  }
}
