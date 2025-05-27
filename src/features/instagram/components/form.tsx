"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Download,
  Loader2,
  Instagram,
  AlertCircle,
  Check,
  ChevronDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { getHttpErrorMessage } from "@/lib/http";
import { useVideoInfo } from "@/services/api/queries";

// Define video resolution type
type VideoResolution = {
  label: string;
  quality: string;
  url: string;
};

// Mock video resolutions (replace with actual data from your API)
const mockResolutions: VideoResolution[] = [
  { label: "HD (1080p)", quality: "1080p", url: "" },
  { label: "HD (720p)", quality: "720p", url: "" },
  { label: "SD (480p)", quality: "480p", url: "" },
  { label: "Low (360p)", quality: "360p", url: "" },
];

const formSchema = z.object({
  postUrl: z.string().url({
    message: "Provide a valid Instagram post link",
  }),
});

export function InstagramVideoForm() {
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [videoThumbnail, setVideoThumbnail] = useState<string | null>(null);
  const [videoTitle, setVideoTitle] = useState<string | null>(null);
  const [resolutions, setResolutions] = useState<VideoResolution[]>([]);
  const [selectedResolution, setSelectedResolution] =
    useState<VideoResolution | null>(null);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      postUrl: "",
    },
  });

  const { error, isPending, mutateAsync: getVideoInfo } = useVideoInfo();

  const httpError = getHttpErrorMessage(error);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { postUrl } = values;
    try {
      setIsPreviewLoading(true);
      console.log("getting video info", postUrl);
      const videoInfo = await getVideoInfo({ postUrl });

      const { filename, videoUrl } = videoInfo;
      // Define title separately since it's not in the VideoInfo type
      const title = "Instagram Video";

      // Use null as default value for thumbnail since it's not in the VideoInfo type
      const thumbnail = null;
      console.log("videoUrl:", videoUrl);

      // In a real implementation, your API would return multiple resolution URLs
      // Here we're simulating that by creating mock resolutions with the same URL
      const availableResolutions = mockResolutions.map((res) => ({
        ...res,
        url: videoUrl,
      }));

      setVideoPreview(videoUrl);
      setVideoThumbnail(thumbnail);
      setVideoTitle(title);
      setResolutions(availableResolutions);
      setSelectedResolution(availableResolutions[0]); // Default to highest quality
      setIsPreviewLoading(false);
    } catch (error: any) {
      setIsPreviewLoading(false);
      console.log(error);
    }
  }

  async function downloadSelectedResolution() {
    if (!selectedResolution) return;

    try {
      await downloadFile(
        selectedResolution.url,
        `instagram_video_${selectedResolution.quality}.mp4`
      );
    } catch (error) {
      console.error("Error downloading video:", error);
    }
  }

  const resetPreview = () => {
    setVideoPreview(null);
    setVideoThumbnail(null);
    setVideoTitle(null);
    setResolutions([]);
    setSelectedResolution(null);
    form.reset();
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8">
      {/* Header Section */}
      <div className="mb-8 text-center">
        <div className="mb-4 flex items-center justify-center gap-3">
          <div className="rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 p-3">
            <Instagram className="h-8 w-8 text-white" />
          </div>
          <h1 className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
            Instagram Downloader
          </h1>
        </div>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Download Instagram videos and reels quickly and easily. Preview before
          downloading in your preferred quality.
        </p>
      </div>

      {/* Main Form Card */}
      <Card className="border-0 bg-gradient-to-br from-white to-gray-50/50 shadow-2xl dark:from-gray-900 dark:to-gray-800/50">
        <CardHeader className="pb-6">
          <CardTitle className="text-center text-xl font-semibold text-gray-800 dark:text-gray-200">
            {videoPreview ? "Preview Your Video" : "Paste Instagram URL"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {!videoPreview ? (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Error Alert */}
                {httpError && (
                  <Alert
                    variant="destructive"
                    className="border-red-200 bg-red-50 dark:bg-red-950/20"
                  >
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="font-medium">
                      {httpError}
                    </AlertDescription>
                  </Alert>
                )}

                {/* URL Input Section */}
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="postUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <Input
                              disabled={isPending || isPreviewLoading}
                              type="url"
                              placeholder="https://www.instagram.com/p/..."
                              className="h-14 rounded-xl border-2 border-gray-200 bg-white pl-4 pr-4 text-base transition-all duration-200 focus:border-purple-500 dark:border-gray-700 dark:bg-gray-800 dark:focus:border-purple-400"
                              {...field}
                            />
                            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                              <Instagram className="h-5 w-5 text-gray-400" />
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage className="text-sm font-medium" />
                      </FormItem>
                    )}
                  />

                  {/* Get Video Button */}
                  <Button
                    disabled={isPending || isPreviewLoading}
                    type="submit"
                    size="lg"
                    className="h-14 w-full transform rounded-xl border-0 bg-gradient-to-r from-purple-600 to-pink-600 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:scale-[1.02] hover:from-purple-700 hover:to-pink-700 hover:shadow-xl active:scale-[0.98]"
                  >
                    {isPending || isPreviewLoading ? (
                      <>
                        <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                        Fetching Video...
                      </>
                    ) : (
                      <>
                        <Instagram className="mr-3 h-5 w-5" />
                        Get Video
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          ) : (
            <div className="space-y-8">
              {/* Video Preview Section */}
              <div className="space-y-4">
                <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
                  <video
                    src={videoPreview}
                    poster={videoThumbnail || undefined}
                    controls
                    className="h-full w-full object-contain"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>

                {videoTitle && (
                  <h3 className="text-center text-lg font-medium">
                    {videoTitle}
                  </h3>
                )}
              </div>

              {/* Download Options */}
              <div className="space-y-4">
                <div className="flex flex-col gap-4 sm:flex-row">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="h-12 w-full justify-between border-2 sm:w-auto"
                      >
                        <span>
                          {selectedResolution?.label || "Select Quality"}
                        </span>
                        <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-[200px]">
                      {resolutions.map((resolution) => (
                        <DropdownMenuItem
                          key={resolution.quality}
                          onClick={() => setSelectedResolution(resolution)}
                          className="flex items-center justify-between"
                        >
                          <span>{resolution.label}</span>
                          {selectedResolution?.quality ===
                            resolution.quality && (
                            <Check className="h-4 w-4 text-green-500" />
                          )}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Button
                    onClick={downloadSelectedResolution}
                    disabled={!selectedResolution}
                    className="h-12 w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 sm:flex-1"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Download {selectedResolution?.label}
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  onClick={resetPreview}
                  className="h-10 w-full"
                >
                  Try Another URL
                </Button>
              </div>
            </div>
          )}

          {/* Help Text - Only show when not in preview mode */}
          {!videoPreview && (
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/20">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-full bg-blue-100 p-1 dark:bg-blue-900/50">
                  <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="space-y-2 text-sm">
                  <p className="font-medium text-blue-900 dark:text-blue-100">
                    How to download:
                  </p>
                  <ul className="ml-2 list-inside list-disc space-y-1 text-blue-700 dark:text-blue-300">
                    <li>Copy the Instagram post or reel URL</li>
                    <li>Paste it in the input field above</li>
                    <li>Preview the video before downloading</li>
                    <li>Select your preferred quality</li>
                    <li>Click download to save the video</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Features Section */}
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-lg dark:border-gray-700 dark:bg-gray-800">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 dark:bg-green-900/30">
            <Download className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">
            Multiple Resolutions
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Choose from various quality options to suit your needs
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-lg dark:border-gray-700 dark:bg-gray-800">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-900/30">
            <Instagram className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">
            Video Preview
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Watch videos before downloading to ensure it's the right content
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-lg dark:border-gray-700 dark:bg-gray-800">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/30">
            <AlertCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">
            No Registration
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            No sign-up required. Just paste the link and download
          </p>
        </div>
      </div>
    </div>
  );
}

// Utility function for download (unchanged)
export async function downloadFile(videoUrl: string, filename: string) {
  try {
    const response = await fetch(videoUrl);

    if (!response.ok) {
      throw new Error("Failed to fetch the video for download.");
    }

    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = filename; // Set the filename for the download
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Cleanup blob URL
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Error during file download:", error);
  }
}
