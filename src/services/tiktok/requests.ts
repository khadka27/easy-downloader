import { apiClient } from "@/lib/api-client";
import { CustomError } from "@/lib/errors";
import { APIResponse } from "@/types";

export interface TikTokVideoInfo {
  title: string;
  author: string;
  thumbnail: string | null;
  duration: string;
  videoUrl: string;
  filename: string;
  width: string;
  height: string;
}

export interface TikTokDownloadInfo {
  downloadUrl: string;
  filename: string;
  quality: string;
  container: string;
  title: string;
  author: string;
  thumbnail: string | null;
  duration: string;
}

export async function getTikTokVideoInfo(
  videoUrl: string
): Promise<TikTokVideoInfo> {
  const searchParams = new URLSearchParams({ url: videoUrl });
  const res = await apiClient.get(`/api/tiktok?${searchParams.toString()}`);

  const json = (await res.json()) as APIResponse<TikTokVideoInfo>;

  if (json.status === "error") {
    throw new CustomError(json.message);
  }

  return json.data;
}

export async function getTikTokDownloadInfo(
  videoUrl: string
): Promise<TikTokDownloadInfo> {
  const res = await apiClient.post("/api/tiktok", {
    url: videoUrl,
  });

  const json = (await res.json()) as APIResponse<TikTokDownloadInfo>;

  if (json.status === "error") {
    throw new CustomError(json.message);
  }

  return json.data;
}
