import { apiClient } from "@/lib/api-client";
import { CustomError } from "@/lib/errors";
import { APIResponse } from "@/types";

export interface YouTubeVideoInfo {
  title: string;
  author: string;
  thumbnail: string;
  duration: string;
  formats: YouTubeFormat[];
}

export interface YouTubeFormat {
  itag: number;
  quality: string;
  container: string;
  hasVideo: boolean;
  hasAudio: boolean;
  url: string;
}

export interface YouTubeDownloadInfo {
  downloadUrl: string;
  filename: string;
  quality: string;
  container: string;
  title: string;
  author: string;
  thumbnail: string;
  duration: string;
}

export async function getYouTubeVideoInfo(
  videoUrl: string
): Promise<YouTubeVideoInfo> {
  const searchParams = new URLSearchParams({ url: videoUrl });
  const res = await apiClient.get(`/api/youtube?${searchParams.toString()}`);

  const json = (await res.json()) as APIResponse<YouTubeVideoInfo>;

  if (json.status === "error") {
    throw new CustomError(json.message);
  }

  return json.data;
}

export async function getYouTubeDownloadInfo(
  videoUrl: string,
  format?: string
): Promise<YouTubeDownloadInfo> {
  const res = await apiClient.post("/api/youtube", {
    url: videoUrl,
    format: format,
  });

  const json = (await res.json()) as APIResponse<YouTubeDownloadInfo>;

  if (json.status === "error") {
    throw new CustomError(json.message);
  }

  return json.data;
}
