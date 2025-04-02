// File: app/api/download/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";

// Helper functions for each platform
async function extractInstagramMedia(url: string) {
  try {
    // Use mobile user agent to get better access to content
    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
      },
    });

    const $ = cheerio.load(response.data);

    // First priority: Look for video in meta tags
    const videoUrl =
      $('meta[property="og:video"]').attr("content") ||
      $('meta[property="og:video:secure_url"]').attr("content") ||
      $('meta[property="og:video:url"]').attr("content");

    if (videoUrl) {
      console.log("Found Instagram video URL:", videoUrl);
      return { mediaUrl: videoUrl, mediaType: "video" as const };
    }

    // Second priority: Look for image in meta tags
    const imageUrl =
      $('meta[property="og:image"]').attr("content") ||
      $('meta[property="og:image:secure_url"]').attr("content");

    if (imageUrl) {
      console.log("Found Instagram image URL:", imageUrl);
      return { mediaUrl: imageUrl, mediaType: "image" as const };
    }

    // Alternative: Look for content URL in JSON data
    const scriptTags = $('script[type="application/ld+json"]');
    for (let i = 0; i < scriptTags.length; i++) {
      try {
        const jsonData = JSON.parse($(scriptTags[i]).html() || "{}");
        if (jsonData.video) {
          console.log(
            "Found Instagram video in JSON data:",
            jsonData.video.contentUrl
          );
          return {
            mediaUrl: jsonData.video.contentUrl,
            mediaType: "video" as const,
          };
        } else if (jsonData.image) {
          console.log("Found Instagram image in JSON data:", jsonData.image);
          return { mediaUrl: jsonData.image, mediaType: "image" as const };
        }
      } catch (e) {
        console.error("Error parsing JSON in script tag:", e);
      }
    }

    throw new Error("No media found on this Instagram post");
  } catch (error) {
    console.error("Instagram extraction error:", error);
    throw new Error("Failed to extract media from Instagram");
  }
}

async function extractFacebookMedia(url: string) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    // Look for image in meta tags
    const imageUrl = $('meta[property="og:image"]').attr("content");
    if (imageUrl) {
      return { mediaUrl: imageUrl, mediaType: "image" as const };
    }

    // Look for video in meta tags
    const videoUrl = $('meta[property="og:video:url"]').attr("content");
    if (videoUrl) {
      return { mediaUrl: videoUrl, mediaType: "video" as const };
    }

    throw new Error("No media found on this Facebook post");
  } catch (error) {
    console.error("Facebook extraction error:", error);
    throw new Error("Failed to extract media from Facebook");
  }
}

async function extractTwitterMedia(url: string) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    // Look for image in meta tags
    const imageUrl = $('meta[property="og:image"]').attr("content");
    if (imageUrl) {
      return { mediaUrl: imageUrl, mediaType: "image" as const };
    }

    // Look for video in meta tags
    const videoUrl = $('meta[property="og:video:url"]').attr("content");
    if (videoUrl) {
      return { mediaUrl: videoUrl, mediaType: "video" as const };
    }

    throw new Error("No media found on this Twitter post");
  } catch (error) {
    console.error("Twitter extraction error:", error);
    throw new Error("Failed to extract media from Twitter");
  }
}

async function extractTikTokMedia(url: string) {
  try {
    // Use mobile user agent to get better access to content
    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
      },
    });

    const $ = cheerio.load(response.data);

    // Look for video in meta tags - first priority
    const videoUrl =
      $('meta[property="og:video"]').attr("content") ||
      $('meta[property="og:video:secure_url"]').attr("content") ||
      $('meta[property="og:video:url"]').attr("content");

    if (videoUrl) {
      console.log("Found TikTok video URL:", videoUrl);
      return { mediaUrl: videoUrl, mediaType: "video" as const };
    }

    // Try to find video in JSON data embedded in the page
    let videoUrlFromScript = "";
    const scriptTags = $("script")
      .map((i, el) => $(el).html())
      .get();

    for (const script of scriptTags) {
      if (!script) continue;

      // Look for videoData or videoUrl patterns
      if (
        script.includes('"playAddr":') ||
        script.includes('"downloadAddr":') ||
        script.includes('"playUrl":')
      ) {
        try {
          // Find the JSON object containing video data
          const jsonStartIndex = script.indexOf("{");
          const jsonEndIndex = script.lastIndexOf("}") + 1;

          if (jsonStartIndex > -1 && jsonEndIndex > 0) {
            const jsonStr = script.substring(jsonStartIndex, jsonEndIndex);
            const data = JSON.parse(jsonStr);

            // Navigate through common TikTok JSON structures to find video URL
            if (
              data.videoData &&
              data.videoData.itemInfos &&
              data.videoData.itemInfos.video
            ) {
              videoUrlFromScript = data.videoData.itemInfos.video.urls[0];
            } else if (
              data.props &&
              data.props.pageProps &&
              data.props.pageProps.videoData
            ) {
              videoUrlFromScript =
                data.props.pageProps.videoData.itemInfos.video.urls[0];
            } else if (
              data.props &&
              data.props.pageProps &&
              data.props.pageProps.videoObject
            ) {
              videoUrlFromScript =
                data.props.pageProps.videoObject.downloadAddr ||
                data.props.pageProps.videoObject.playAddr;
            }

            if (videoUrlFromScript) {
              console.log(
                "Found TikTok video URL in script:",
                videoUrlFromScript
              );
              return {
                mediaUrl: videoUrlFromScript,
                mediaType: "video" as const,
              };
            }
          }
        } catch (e) {
          console.error("Error parsing JSON in TikTok script:", e);
        }
      }
    }

    // Look for image (thumbnail) as fallback
    const imageUrl = $('meta[property="og:image"]').attr("content");
    if (imageUrl) {
      console.log("Found TikTok image URL (fallback):", imageUrl);
      return { mediaUrl: imageUrl, mediaType: "image" as const };
    }

    throw new Error("No media found on this TikTok post");
  } catch (error) {
    console.error("TikTok extraction error:", error);
    throw new Error("Failed to extract media from TikTok");
  }
}

async function extractYouTubeMedia(url: string) {
  try {
    // Extract video ID from URL
    const videoId = url.includes("youtu.be/")
      ? url.split("youtu.be/")[1].split("?")[0]
      : url.includes("v=")
      ? url.split("v=")[1].split("&")[0]
      : null;

    if (!videoId) {
      throw new Error("Invalid YouTube URL");
    }

    // For YouTube, we'll return the thumbnail as an image
    // Full video download would require a separate service
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    return { mediaUrl: thumbnailUrl, mediaType: "image" as const };
  } catch (error) {
    console.error("YouTube extraction error:", error);
    throw new Error("Failed to extract media from YouTube");
  }
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { success: false, message: "URL is required" },
        { status: 400 }
      );
    }

    let result;

    // Log the URL being processed
    console.log("Processing URL:", url);

    // Determine which platform the URL is from
    if (url.includes("instagram.com")) {
      result = await extractInstagramMedia(url);
      console.log("Instagram media extracted:", result);
    } else if (url.includes("facebook.com")) {
      result = await extractFacebookMedia(url);
      console.log("Facebook media extracted:", result);
    } else if (url.includes("twitter.com") || url.includes("x.com")) {
      result = await extractTwitterMedia(url);
      console.log("Twitter media extracted:", result);
    } else if (url.includes("tiktok.com")) {
      result = await extractTikTokMedia(url);
      console.log("TikTok media extracted:", result);
    } else if (url.includes("youtube.com") || url.includes("youtu.be")) {
      result = await extractYouTubeMedia(url);
      console.log("YouTube media extracted:", result);
    } else {
      return NextResponse.json(
        {
          success: false,
          message:
            "Unsupported platform. We currently support Instagram, Facebook, Twitter, TikTok, and YouTube",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      mediaUrl: result.mediaUrl,
      mediaType: result.mediaType,
    });
  } catch (error) {
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
