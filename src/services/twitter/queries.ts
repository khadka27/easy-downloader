import { useMutation } from "@tanstack/react-query";
import {
  getTwitterVideoInfo,
  getTwitterDownloadInfo,
  TwitterVideoInfo,
  TwitterDownloadInfo,
} from "./requests";

export function useTwitterVideoInfo() {
  return useMutation<TwitterVideoInfo, Error, { videoUrl: string }>({
    mutationFn: ({ videoUrl }) => getTwitterVideoInfo(videoUrl),
  });
}

export function useTwitterDownloadInfo() {
  return useMutation<TwitterDownloadInfo, Error, { videoUrl: string }>({
    mutationFn: ({ videoUrl }) => getTwitterDownloadInfo(videoUrl),
  });
}
