import { apiClient } from "@/lib/api-client";
import { CustomError } from "@/lib/errors";
import { APIResponse } from "@/types";

export interface FacebookVideoInfo {
  title: string;
  author: string;
  thumbnail: string | null;
  duration: string;
  videoUrl: string;
  filename: string;
  width: string;
  height: string;
}

export interface FacebookDownloadInfo {
  downloadUrl: string;
  filename: string;
  quality: string;
  container: string;
  title: string;
  author: string;
  thumbnail: string | null;
  duration: string;
}

export async function getFacebookVideoInfo(
  videoUrl: string
): Promise<FacebookVideoInfo> {
  const searchParams = new URLSearchParams({ url: videoUrl });
  const res = await apiClient.get(`/api/facebook?${searchParams.toString()}`);

  const json = (await res.json()) as APIResponse<FacebookVideoInfo>;

  if (json.status === "error") {
    throw new CustomError(json.message);
  }

  return json.data;
}

export async function getFacebookDownloadInfo(
  videoUrl: string
): Promise<FacebookDownloadInfo> {
  const res = await apiClient.post("/api/facebook", {
    url: videoUrl,
  });

  const json = (await res.json()) as APIResponse<FacebookDownloadInfo>;

  if (json.status === "error") {
    throw new CustomError(json.message);
  }

  return json.data;
}
