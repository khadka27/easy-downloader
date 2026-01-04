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
  Youtube,
  Facebook,
  Music,
  Play,
  Globe,
  Sparkles,
  Zap,
  Shield,
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

// Define supported platforms
type Platform = "instagram" | "youtube" | "tiktok" | "facebook" | "twitter";

interface PlatformConfig {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  gradient: string;
  placeholder: string;
  description: string;
}

const platformConfigs: Record<Platform, PlatformConfig> = {
  instagram: {
    name: "Instagram",
    icon: Instagram,
    color: "from-purple-500 to-pink-500",
    gradient: "from-purple-600 to-pink-600",
    placeholder: "https://www.instagram.com/p/...",
    description: "Download Instagram Reels, Stories & Posts",
  },
  youtube: {
    name: "YouTube",
    icon: Youtube,
    color: "from-red-500 to-red-600",
    gradient: "from-red-600 to-red-700",
    placeholder: "https://www.youtube.com/watch?v=...",
    description: "Download YouTube Videos & Shorts",
  },
  tiktok: {
    name: "TikTok",
    icon: Music,
    color: "from-black to-gray-800",
    gradient: "from-gray-800 to-black",
    placeholder: "https://www.tiktok.com/@user/video/...",
    description: "Download TikTok Videos & Sounds",
  },
  facebook: {
    name: "Facebook",
    icon: Facebook,
    color: "from-blue-500 to-blue-600",
    gradient: "from-blue-600 to-blue-700",
    placeholder: "https://www.facebook.com/watch?v=...",
    description: "Download Facebook Videos & Reels",
  },
  twitter: {
    name: "Twitter",
    icon: Globe,
    color: "from-blue-400 to-blue-500",
    gradient: "from-blue-500 to-blue-600",
    placeholder: "https://twitter.com/user/status/...",
    description: "Download Twitter Videos & GIFs",
  },
};

// Define video resolution type
type VideoResolution = {
  label: string;
  quality: string;
  url: string;
};

// Mock video resolutions (replace with actual data from your API)
const mockResolutions: VideoResolution[] = [
  { label: "Ultra HD (4K)", quality: "4k", url: "" },
  { label: "Full HD (1080p)", quality: "1080p", url: "" },
  { label: "HD (720p)", quality: "720p", url: "" },
  { label: "SD (480p)", quality: "480p", url: "" },
  { label: "Low (360p)", quality: "360p", url: "" },
];

const formSchema = z.object({
  postUrl: z.string().url({
    message: "Provide a valid URL",
  }),
});

export function SocialMediaDownloader() {
  const [selectedPlatform, setSelectedPlatform] =
    useState<Platform>("instagram");
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [videoThumbnail, setVideoThumbnail] = useState<string | null>(null);
  const [videoTitle, setVideoTitle] = useState<string | null>(null);
  const [resolutions, setResolutions] = useState<VideoResolution[]>([]);
  const [selectedResolution, setSelectedResolution] =
    useState<VideoResolution | null>(null);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      postUrl: "",
    },
  });

  const { error, isPending, mutateAsync: getVideoInfo } = useVideoInfo();

  const httpError = getHttpErrorMessage(error);
  const currentPlatform = platformConfigs[selectedPlatform];

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { postUrl } = values;
    try {
      setIsPreviewLoading(true);
      console.log("getting video info", postUrl);
      const videoInfo = await getVideoInfo({ postUrl });

      const { filename, videoUrl } = videoInfo;
      const title = `${currentPlatform.name} Video`;

      const thumbnail = null;
      console.log("videoUrl:", videoUrl);

      const availableResolutions = mockResolutions.map((res) => ({
        ...res,
        url: videoUrl,
      }));

      setVideoPreview(videoUrl);
      setVideoThumbnail(thumbnail);
      setVideoTitle(title);
      setResolutions(availableResolutions);
      setSelectedResolution(availableResolutions[0]);
      setIsPreviewLoading(false);
    } catch (error: any) {
      setIsPreviewLoading(false);
      console.log(error);
    }
  }

  async function downloadSelectedResolution() {
    if (!selectedResolution) return;

    try {
      setIsDownloading(true);
      await downloadFile(
        selectedResolution.url,
        `${selectedPlatform}_video_${selectedResolution.quality}.mp4`
      );
    } catch (error) {
      console.error("Error downloading video:", error);
    } finally {
      setIsDownloading(false);
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
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <div className="mb-6 flex items-center justify-center gap-3">
          <div className="animate-float hover-glow rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 p-4 shadow-2xl">
            <Sparkles className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-responsive-xl animate-gradient bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text font-extrabold text-transparent">
            Social Media Downloader
          </h1>
        </div>
        <p className="text-responsive mx-auto max-w-3xl text-muted-foreground">
          Download videos from Instagram, YouTube, TikTok, Facebook, and Twitter
          in high quality. Fast, free, and secure.
        </p>
      </div>

      {/* Platform Selection */}
      <div className="mb-8">
        <h2 className="text-responsive-lg mb-6 text-center font-semibold">
          Choose Your Platform
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {(Object.keys(platformConfigs) as Platform[]).map((platform) => {
            const config = platformConfigs[platform];
            const Icon = config.icon;
            return (
              <button
                key={platform}
                onClick={() => setSelectedPlatform(platform)}
                className={`hover-lift group relative overflow-hidden rounded-2xl border-2 p-4 transition-all duration-300 ${
                  selectedPlatform === platform
                    ? `border-${config.color.split("-")[1]}-500 bg-gradient-to-br ${config.color} animate-pulse-slow shadow-lg`
                    : "border-gray-200 bg-white hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600"
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`rounded-xl p-3 transition-all duration-300 ${
                      selectedPlatform === platform
                        ? "bg-white/20 text-white"
                        : `bg-gradient-to-br ${config.color} text-white`
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <span
                    className={`text-sm font-medium transition-colors ${
                      selectedPlatform === platform
                        ? "text-white"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {config.name}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Form Card */}
      <Card className="hover-lift border-0 bg-gradient-to-br from-white to-gray-50/50 shadow-2xl dark:from-gray-900 dark:to-gray-800/50">
        <CardHeader className="pb-6">
          <CardTitle className="text-responsive-lg flex items-center justify-center gap-3 text-center font-semibold text-gray-800 dark:text-gray-200">
            <div
              className={`rounded-xl bg-gradient-to-br ${currentPlatform.color} animate-bounce-slow p-2`}
            >
              <currentPlatform.icon className="h-6 w-6 text-white" />
            </div>
            {currentPlatform.name} Downloader
          </CardTitle>
          <p className="text-center text-muted-foreground">
            {currentPlatform.description}
          </p>
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
                              placeholder={currentPlatform.placeholder}
                              className="h-16 rounded-xl border-2 border-gray-200 bg-white pl-4 pr-12 text-base transition-all duration-200 focus:border-purple-500 dark:border-gray-700 dark:bg-gray-800 dark:focus:border-purple-400"
                              {...field}
                            />
                            <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                              <currentPlatform.icon className="h-5 w-5 text-gray-400" />
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
                    className={`h-16 w-full transform rounded-xl border-0 bg-gradient-to-r ${currentPlatform.gradient} hover-glow text-base font-semibold text-white shadow-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]`}
                  >
                    {isPending || isPreviewLoading ? (
                      <>
                        <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                        <span className="loading-dots">Fetching Video</span>
                      </>
                    ) : (
                      <>
                        <Play className="mr-3 h-5 w-5" />
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
                <div className="hover-lift relative aspect-video w-full overflow-hidden rounded-xl bg-black shadow-2xl">
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
                  <h3 className="animate-shimmer text-center text-lg font-medium">
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
                    disabled={!selectedResolution || isDownloading}
                    className={`h-12 w-full bg-gradient-to-r ${currentPlatform.gradient} hover-glow hover:shadow-lg sm:flex-1`}
                  >
                    {isDownloading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        <span className="loading-dots">Downloading</span>
                      </>
                    ) : (
                      <>
                        <Download className="mr-2 h-5 w-5" />
                        Download {selectedResolution?.label}
                      </>
                    )}
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
                    <li>Copy the {currentPlatform.name} video URL</li>
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
      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="hover-lift group rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-lg transition-all duration-300 dark:border-gray-700 dark:bg-gray-800">
          <div className="animate-float mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 dark:bg-green-900/30">
            <Download className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">
            Multiple Qualities
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Choose from various quality options to suit your needs
          </p>
        </div>

        <div className="hover-lift group rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-lg transition-all duration-300 dark:border-gray-700 dark:bg-gray-800">
          <div className="animate-float mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-900/30">
            <Play className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">
            Video Preview
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Watch videos before downloading to ensure it's the right content
          </p>
        </div>

        <div className="hover-lift group rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-lg transition-all duration-300 dark:border-gray-700 dark:bg-gray-800">
          <div className="animate-float mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/30">
            <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">
            Secure & Private
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            No registration required. Your privacy is protected
          </p>
        </div>

        <div className="hover-lift group rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-lg transition-all duration-300 dark:border-gray-700 dark:bg-gray-800">
          <div className="animate-float mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 dark:bg-orange-900/30">
            <Zap className="h-6 w-6 text-orange-600 dark:text-orange-400" />
          </div>
          <h3 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">
            Fast & Free
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Lightning-fast downloads with no hidden costs
          </p>
        </div>
      </div>
    </div>
  );
}

// Utility function for download
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
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Error during file download:", error);
  }
}
