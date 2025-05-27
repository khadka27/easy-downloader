import { Platform, VideoInfo } from "@/types";
import { getVideoInfoFromUrl as getInstagramVideo } from "@/features/instagram";

export async function getVideoPreview(url: string): Promise<VideoInfo> {
  const platform = detectPlatform(url);

  switch (platform) {
    case "instagram":
      return await getInstagramVideo(url);
    case "facebook":
      return await getFacebookVideo(url);
    case "tiktok":
      return await getTikTokVideo(url);
    default:
      throw new Error("Unsupported platform");
  }
}

function detectPlatform(url: string): Platform {
  if (url.includes("instagram.com")) return "instagram";
  if (url.includes("facebook.com")) return "facebook";
  if (url.includes("tiktok.com")) return "tiktok";
  throw new Error("Unsupported platform");
}

async function getFacebookVideo(url: string): Promise<VideoInfo> {
  // TODO: Implement Facebook video fetching
  throw new Error("Facebook video fetching not implemented yet");
}

async function getTikTokVideo(url: string): Promise<VideoInfo> {
  // TODO: Implement TikTok video fetching
  throw new Error("TikTok video fetching not implemented yet");
}
