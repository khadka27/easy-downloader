import { useState } from "react";
import { VideoInfo } from "@/types";

interface VideoPreviewProps {
  videoInfo: VideoInfo;
  onDownload: () => void;
}

export function VideoPreview({ videoInfo, onDownload }: VideoPreviewProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      onDownload();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl rounded-lg bg-white p-4 shadow-lg">
      <div className="relative mb-4 aspect-video">
        {videoInfo.thumbnailUrl ? (
          <img
            src={videoInfo.thumbnailUrl}
            alt={videoInfo.title || "Video thumbnail"}
            className="h-full w-full rounded-lg object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-lg bg-gray-200">
            <span className="text-gray-500">No preview available</span>
          </div>
        )}
      </div>

      <div className="space-y-2">
        {videoInfo.title && (
          <h3 className="text-lg font-semibold">{videoInfo.title}</h3>
        )}
        {videoInfo.author && (
          <p className="text-gray-600">By {videoInfo.author}</p>
        )}
        {videoInfo.duration && (
          <p className="text-sm text-gray-500">
            Duration: {Math.floor(videoInfo.duration / 60)}:
            {(videoInfo.duration % 60).toString().padStart(2, "0")}
          </p>
        )}
      </div>

      <button
        onClick={handleDownload}
        disabled={isLoading}
        className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
      >
        {isLoading ? "Downloading..." : "Download Video"}
      </button>
    </div>
  );
}
