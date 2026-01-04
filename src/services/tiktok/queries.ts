import { useMutation } from "@tanstack/react-query";
import {
  getTikTokVideoInfo,
  getTikTokDownloadInfo,
  TikTokVideoInfo,
  TikTokDownloadInfo,
} from "./requests";

export function useTikTokVideoInfo() {
  return useMutation<TikTokVideoInfo, Error, { videoUrl: string }>({
    mutationFn: ({ videoUrl }) => getTikTokVideoInfo(videoUrl),
  });
}

export function useTikTokDownloadInfo() {
  return useMutation<TikTokDownloadInfo, Error, { videoUrl: string }>({
    mutationFn: ({ videoUrl }) => getTikTokDownloadInfo(videoUrl),
  });
}
