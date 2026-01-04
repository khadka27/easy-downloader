import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getYouTubeVideoInfo,
  getYouTubeDownloadInfo,
  YouTubeVideoInfo,
  YouTubeDownloadInfo,
} from "./requests";

export function useYouTubeVideoInfo() {
  return useMutation<YouTubeVideoInfo, Error, { videoUrl: string }>({
    mutationFn: ({ videoUrl }) => getYouTubeVideoInfo(videoUrl),
  });
}

export function useYouTubeDownloadInfo() {
  return useMutation<
    YouTubeDownloadInfo,
    Error,
    { videoUrl: string; format?: string }
  >({
    mutationFn: ({ videoUrl, format }) =>
      getYouTubeDownloadInfo(videoUrl, format),
  });
}
