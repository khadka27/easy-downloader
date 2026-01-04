import { apiClient } from "@/lib/api-client";
import { CustomError } from "@/lib/errors";
import { APIResponse } from "@/types";

export interface TwitterVideoInfo {
  title: string;
  author: string;
  thumbnail: string | null;
  duration: string;
  videoUrl: string;
  filename: string;
  width: string;
  height: string;
}

export interface TwitterDownloadInfo {
  downloadUrl: string;
  filename: string;
  quality: string;
  container: string;
  title: string;
  author: string;
  thumbnail: string | null;
  duration: string;
}

export async function getTwitterVideoInfo(
  videoUrl: string
): Promise<TwitterVideoInfo> {
  const searchParams = new URLSearchParams({ url: videoUrl });
  const res = await apiClient.get(`/api/twitter?${searchParams.toString()}`);

  const json = (await res.json()) as APIResponse<TwitterVideoInfo>;

  if (json.status === "error") {
    throw new CustomError(json.message);
  }

  return json.data;
}

export async function getTwitterDownloadInfo(
  videoUrl: string
): Promise<TwitterDownloadInfo> {
  const res = await apiClient.post("/api/twitter", {
    url: videoUrl,
  });

  const json = (await res.json()) as APIResponse<TwitterDownloadInfo>;

  if (json.status === "error") {
    throw new CustomError(json.message);
  }

  return json.data;
}
