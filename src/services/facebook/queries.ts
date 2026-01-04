import { useMutation } from "@tanstack/react-query";
import {
  getFacebookVideoInfo,
  getFacebookDownloadInfo,
  FacebookVideoInfo,
  FacebookDownloadInfo,
} from "./requests";

export function useFacebookVideoInfo() {
  return useMutation<FacebookVideoInfo, Error, { videoUrl: string }>({
    mutationFn: ({ videoUrl }) => getFacebookVideoInfo(videoUrl),
  });
}

export function useFacebookDownloadInfo() {
  return useMutation<FacebookDownloadInfo, Error, { videoUrl: string }>({
    mutationFn: ({ videoUrl }) => getFacebookDownloadInfo(videoUrl),
  });
}
