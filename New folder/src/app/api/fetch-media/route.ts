/* eslint-disable @typescript-eslint/no-explicit-any */
// import { NextRequest, NextResponse } from "next/server";
// import axios from "axios";

// // Common desktop user agent string (works for Chrome, Brave, Edge, etc.)
// const DEFAULT_USER_AGENT =
//   "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36";

// export async function POST(request: NextRequest) {
//   try {
//     const { url, mediaType } = await request.json();

//     if (!url) {
//       return NextResponse.json(
//         { success: false, message: "URL is required" },
//         { status: 400 }
//       );
//     }

//     console.log("Fetching media from URL:", url);
//     console.log("Media type from client:", mediaType);

//     // Fetch the media file using axios with the default user agent
//     const response = await axios.get(url, {
//       responseType: "arraybuffer",
//       headers: {
//         "User-Agent": DEFAULT_USER_AGENT,
//         // Use the URL's origin as the referer
//         Referer: new URL(url).origin,
//       },
//       timeout: 30000,
//     });

//     // Determine content type from headers or fallback based on provided mediaType
//     let contentType = response.headers["content-type"];
//     const isVideoFromHeader = contentType?.includes("video");
//     const isImageFromHeader = contentType?.includes("image");

//     if (!isVideoFromHeader && !isImageFromHeader) {
//       if (mediaType === "video") {
//         contentType = "video/mp4";
//       } else if (mediaType === "image") {
//         contentType = "image/jpeg";
//       }
//     }

//     console.log("Detected content type:", contentType);

//     const isVideo = contentType?.includes("video") || mediaType === "video";
//     const fileExtension = isVideo ? "mp4" : "jpg";

//     const headers = new Headers();
//     headers.set(
//       "Content-Type",
//       contentType || (isVideo ? "video/mp4" : "image/jpeg")
//     );
//     headers.set(
//       "Content-Disposition",
//       `attachment; filename="mediawave-download-${Date.now()}.${fileExtension}"`
//     );

//     return new NextResponse(response.data, {
//       status: 200,
//       headers,
//     });
//   } catch (error) {
//     console.error("Media fetch error:", error);
//     return NextResponse.json(
//       {
//         success: false,
//         message:
//           error instanceof Error ? error.message : "An unknown error occurred",
//       },
//       { status: 500 }
//     );
//   }
// }

// // Increase the body size limit for large video files
// export const config = {
//   api: {
//     bodyParser: {
//       sizeLimit: "50mb",
//     },
//     responseLimit: "50mb",
//   },
// };

// app/api/fetch-media/route.ts
import { NextResponse } from "next/server";
import * as cheerio from "cheerio";
import ytdl from "ytdl-core";

const MOBILE_UA =
  "Mozilla/5.0 (Linux; Android 10; Mobile; rv:89.0) Gecko/89.0 Firefox/89.0";

// Helper: Generate Twitter token from tweet ID.
function getTwitterToken(id: string): string {
  return ((Number(id) / 1e15) * Math.PI).toString(36).replace(/(0+|\.)/g, "");
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const urlParam = searchParams.get("url");
  if (!urlParam) {
    return NextResponse.json({ error: "Missing URL" }, { status: 400 });
  }
  const targetUrl = urlParam;
  let hostname = "";
  try {
    hostname = new URL(targetUrl).hostname.toLowerCase();
  } catch {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  const format = (searchParams.get("format") || "").toLowerCase();
  const forceDownload = searchParams.get("download");

  // Variables to hold media details.
  let mediaType = ""; // "image" or "video"
  let mediaUrl = ""; // direct URL to the media (jpg/mp4, etc.)
  let contentType = "";
  let filename = "media";

  try {
    // ----- Instagram -----
    if (hostname.includes("instagram.com")) {
      const response = await fetch(targetUrl, {
        headers: {
          "User-Agent": MOBILE_UA,
          Accept: "text/html,application/xhtml+xml,application/xml",
        },
        redirect: "follow",
      });
      const html = await response.text();
      const $ = cheerio.load(html);
      // First check if this is a reel or video post
      const isReel =
        targetUrl.includes("/reel/") ||
        html.includes("instagram://media?id=") ||
        html.includes('is_video":true');

      // Try to get video first - check multiple possible meta tags
      mediaUrl =
        $('meta[property="og:video"]').attr("content") ||
        $('meta[property="og:video:secure_url"]').attr("content") ||
        $("video").attr("src") ||
        "";

      // If we found a video URL or if it's a reel but no URL yet
      if (mediaUrl || isReel) {
        mediaType = "video";
        contentType = "video/mp4";        // If we didn't find a direct video URL but know it's a reel, try to extract it from JSON data
        if (!mediaUrl && isReel) {
          // Try multiple JSON patterns that might contain video URL
          const jsonPatterns = [
            /"video_url":"([^"]+)"/, 
            /"video_versions":\[\{"type":\d+,"url":"([^"]+)"/, 
            /"playback_url":"([^"]+)"/, 
            /"contentUrl":"([^"]+)"/
          ];
          
          for (const pattern of jsonPatterns) {
            const jsonMatch = html.match(pattern);
            if (jsonMatch && jsonMatch[1]) {
              mediaUrl = jsonMatch[1].replace(/\\u0026/g, '&').replace(/\\/g, "");
              break;
            }
          }

          // Additional backup attempt - look for "base_url" (sometimes used in reels)
          if (!mediaUrl) {
            const baseUrlMatch = html.match(/"base_url":"([^"]+)"/);
            if (baseUrlMatch && baseUrlMatch[1]) {
              mediaUrl = baseUrlMatch[1].replace(/\\u0026/g, '&').replace(/\\/g, "");
            }
          }
        }
      }

      // Fallback to image if no video found
      if (!mediaUrl) {
        mediaUrl =
          $('meta[property="og:image"]').attr("content") ||
          $('meta[property="og:image:secure_url"]').attr("content") ||
          "";
        mediaType = "image";
        contentType = "image/jpeg";
      }

      const title = $('meta[property="og:title"]').attr("content");
      if (title) {
        filename = title.split(" ").join("_");
      } else {
        filename = mediaType === "video" ? "instagram_reel" : "instagram_image";
      }

      // If still no media URL found, report error
      if (!mediaUrl) {
        throw new Error(
          "Could not extract media from Instagram post. This may be a private post or Instagram's structure may have changed."
        );
      }
    }
    // ----- Facebook -----
    else if (
      hostname.includes("facebook.com") ||
      hostname.includes("fb.watch")
    ) {
      let mbasicUrl = "";
      if (hostname.includes("facebook.com")) {
        mbasicUrl = targetUrl.replace(
          /^https?:\/\/(www\.)?facebook\.com/,
          "https://mbasic.facebook.com"
        );
      } else if (hostname.includes("fb.watch")) {
        mbasicUrl = `https://mbasic.facebook.com/plugins/video.php?href=${encodeURIComponent(
          targetUrl
        )}`;
      } else {
        mbasicUrl = targetUrl;
      }
      const response = await fetch(mbasicUrl, {
        headers: { "User-Agent": MOBILE_UA },
        redirect: "follow",
      });
      const html = await response.text();
      const $ = cheerio.load(html);
      const videoRedirectLink = $('a[href^="/video_redirect"]').attr("href");
      if (!videoRedirectLink) {
        throw new Error("Facebook video link not found");
      }
      const redirectUrl = new URL(
        videoRedirectLink,
        "https://mbasic.facebook.com"
      );
      const srcParam = redirectUrl.searchParams.get("src");
      if (!srcParam) {
        throw new Error("Facebook video URL extraction failed");
      }
      mediaUrl = srcParam;
      mediaType = "video";
      contentType = "video/mp4";
      filename = "facebook_video";
    }
    // ----- Twitter / X -----
    else if (
      hostname.includes("twitter.com") ||
      hostname === "x.com" ||
      hostname.includes("x.com")
    ) {
      const tweetIdMatch = targetUrl.match(/status\/(\d+)/);
      if (!tweetIdMatch) {
        throw new Error("Invalid Twitter URL");
      }
      const tweetId = tweetIdMatch[1];
      const token = getTwitterToken(tweetId);
      const apiUrl = `https://cdn.syndication.twimg.com/tweet-result?id=${tweetId}&token=${token}`;
      const response = await fetch(apiUrl, {
        headers: { "User-Agent": MOBILE_UA },
        redirect: "follow",
      });
      const data = (await response.json()) as {
        mediaDetails?: Array<{
          type: string;
          video_url?: string;
          video_url_hls?: string;
          mediaUrlHttps?: string;
        }>;
      };
      if (data.mediaDetails && data.mediaDetails.length > 0) {
        const videoMedia = data.mediaDetails.find((m) => m.type === "video");
        if (videoMedia && videoMedia.video_url) {
          mediaUrl = videoMedia.video_url;
          mediaType = "video";
          contentType = "video/mp4";
          filename = "twitter_video";
        } else if (videoMedia && videoMedia.video_url_hls) {
          mediaUrl = videoMedia.video_url_hls;
          mediaType = "video";
          contentType = "application/vnd.apple.mpegurl";
          filename = "twitter_video";
        } else {
          const photoMedia = data.mediaDetails.find((m) => m.type === "photo");
          if (photoMedia && photoMedia.mediaUrlHttps) {
            mediaUrl = photoMedia.mediaUrlHttps;
            mediaType = "image";
            contentType = "image/jpeg";
            filename = "twitter_image";
          }
        }
      }
      if (!mediaUrl) {
        throw new Error("Twitter media not found");
      }
    }
    // ----- TikTok -----
    else if (hostname.includes("tiktok.com")) {
      const response = await fetch(targetUrl, {
        headers: { "User-Agent": MOBILE_UA },
        redirect: "follow",
      });
      const html = await response.text();
      let match = html.match(/"downloadAddr"\s*:\s*"([^"]+)"/);
      if (!match) {
        match = html.match(/"playAddr"\s*:\s*"([^"]+)"/);
      }
      if (!match) {
        throw new Error("TikTok video URL not found");
      }
      mediaUrl = match[1]
        .replace(/\\u0026/g, "&")
        .replace(/\\u002F/g, "/")
        .replace(/\\/g, "");
      mediaType = "video";
      contentType = "video/mp4";
      filename = "tiktok_video";
    }
    // ----- YouTube -----
    else if (
      hostname.includes("youtube.com") ||
      hostname.includes("youtu.be")
    ) {
      if (!ytdl.validateURL(targetUrl)) {
        throw new Error("Invalid YouTube URL");
      }
      mediaType = "video";
      contentType = "video/mp4";
      const info = await ytdl.getInfo(targetUrl);
      filename = info.videoDetails.title
        ? info.videoDetails.title.replace(/\s+/g, "_")
        : "youtube_video";
      if (format === "json") {
        mediaUrl = targetUrl;
      }
    } else {
      throw new Error("Unsupported URL or domain");
    }

    // If "format=json", return metadata instead of media content.
    if (format === "json") {
      return NextResponse.json({
        type: mediaType,
        contentType: contentType,
        filename: filename + (mediaType === "video" ? ".mp4" : ".jpg"),
        directUrl: mediaUrl || null,
      });
    }

    // ----- Stream Media Content -----
    // For YouTube, stream via ytdl-core.
    if (hostname.includes("youtube.com") || hostname.includes("youtu.be")) {
      const headers = new Headers();
      headers.set("Content-Type", contentType);
      if (forceDownload) {
        headers.set(
          "Content-Disposition",
          `attachment; filename="${filename}.mp4"`
        );
      }
      const youtubeStream = ytdl(mediaUrl || targetUrl, {
        quality: "highest",
        filter: (format) => format.hasVideo && format.hasAudio,
      });
      const readableStream = new ReadableStream({
        start(controller) {
          youtubeStream.on("data", (chunk) => controller.enqueue(chunk));
          youtubeStream.on("end", () => controller.close());
          youtubeStream.on("error", (err) => controller.error(err));
        },
      });
      return new NextResponse(readableStream, { headers });
    }

    // Prepare headers for fetching media content.
    const fetchHeaders: Record<string, string> = {
      "User-Agent": MOBILE_UA,
      Accept: "*/*",
      "Accept-Language": "en-US,en;q=0.9",
    };
    // For TikTok media, use specific Referer and Origin headers.
    if (
      hostname.includes("tiktok.com") ||
      mediaUrl.includes("tiktokcdn") ||
      mediaUrl.includes("vt.tiktok.com")
    ) {
      fetchHeaders["Referer"] = "https://www.tiktok.com/";
      fetchHeaders["Origin"] = "https://www.tiktok.com";
    } else {
      fetchHeaders["Referer"] = targetUrl;
    }

    const mediaResponse = await fetch(mediaUrl, {
      headers: fetchHeaders,
      redirect: "follow",
    });
    if (!mediaResponse.ok) {
      throw new Error(`Failed to fetch media content: ${mediaResponse.status}`);
    }
    const responseHeaders = new Headers();
    responseHeaders.set(
      "Content-Type",
      contentType ||
        mediaResponse.headers.get("Content-Type") ||
        "application/octet-stream"
    );
    if (forceDownload) {
      responseHeaders.set(
        "Content-Disposition",
        `attachment; filename="${filename}.${
          mediaType === "video" ? "mp4" : "jpg"
        }"`
      );
    }
    return new NextResponse(mediaResponse.body, { headers: responseHeaders });
  } catch (err) {
    console.error("Error fetching media:", err);
    const errorMessage =
      err instanceof Error ? err.message : "Failed to fetch media";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
