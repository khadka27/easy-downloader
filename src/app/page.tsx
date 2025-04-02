/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import {
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Download,
  Link,
  Loader2,
  X,
  CheckCircle2,
} from "lucide-react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message?: string;
    mediaUrl?: string;
    mediaType?: "image" | "video";
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!url) {
      toast.error("Please enter a URL");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      // Show toast for processing
      toast.loading("Processing your request...", { id: "processing" });

      const response = await fetch("/api/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult({
          success: true,
          mediaUrl: data.mediaUrl,
          mediaType: data.mediaType,
        });
        toast.success("Media found successfully!", { id: "processing" });
      } else {
        setResult({
          success: false,
          message: data.message || "Failed to download media",
        });
        toast.error(data.message || "Failed to download media", {
          id: "processing",
        });
      }
    } catch (error) {
      setResult({
        success: false,
        message: "An error occurred while processing your request",
      });
      toast.error("An error occurred while processing your request", {
        id: "processing",
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadMedia = async () => {
    if (result?.mediaUrl) {
      try {
        setDownloading(true);
        toast.loading("Preparing download...", { id: "download" });

        // For direct download, we need to fetch the media through our API
        const response = await fetch("/api/fetch-media", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url: result.mediaUrl }),
        });

        if (!response.ok) throw new Error("Failed to fetch media");

        // Get the blob from the response
        const blob = await response.blob();

        // Create a URL for the blob
        const blobUrl = window.URL.createObjectURL(blob);

        // Create an anchor element and trigger the download
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = `mediawave-download-${Date.now()}.${
          result.mediaType === "video" ? "mp4" : "jpg"
        }`;
        document.body.appendChild(a);
        a.click();

        // Clean up
        window.URL.revokeObjectURL(blobUrl);
        document.body.removeChild(a);

        toast.success("Download complete!", { id: "download" });
      } catch (error) {
        console.error("Download error:", error);
        toast.error("Failed to download the media. Please try again.", {
          id: "download",
        });
      } finally {
        setDownloading(false);
      }
    }
  };

  const copyMediaUrl = () => {
    if (result?.mediaUrl) {
      navigator.clipboard
        .writeText(result.mediaUrl)
        .then(() => toast.success("Media URL copied to clipboard"))
        .catch(() => toast.error("Failed to copy URL"));
    }
  };

  const clearResult = () => {
    setResult(null);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8 lg:p-12">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-2xl mx-auto mt-8 md:mt-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent">
            MediaWave
          </h1>
          <p className="mt-3 text-muted-foreground">
            Download media from your favorite social platforms
          </p>
          <div className="flex justify-center gap-6 mt-6">
            <Instagram className="h-6 w-6 text-pink-500" />
            <Facebook className="h-6 w-6 text-blue-600" />
            <Twitter className="h-6 w-6 text-blue-400" />
            <Youtube className="h-6 w-6 text-red-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="mb-8">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Input
                      type="text"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="Paste social media URL here"
                      className="pr-10"
                      disabled={loading}
                    />
                    {url && (
                      <button
                        type="button"
                        onClick={() => setUrl("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <Button
                    type="submit"
                    disabled={loading || !url.trim()}
                    className="min-w-[120px]"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing
                      </>
                    ) : (
                      <>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <Card
                className={`overflow-hidden ${
                  !result.success ? "border-red-300 dark:border-red-700" : ""
                }`}
              >
                <CardContent className="p-0">
                  {result.success ? (
                    <div className="flex flex-col">
                      <div className="relative">
                        <button
                          onClick={clearResult}
                          className="absolute top-2 right-2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-1"
                          aria-label="Close"
                        >
                          <X className="h-4 w-4" />
                        </button>

                        {result.mediaType === "image" ? (
                          <img
                            src={result.mediaUrl || "/placeholder.svg"}
                            alt="Downloaded content"
                            className="w-full h-auto max-h-[400px] object-contain bg-black/5 dark:bg-white/5"
                          />
                        ) : (
                          <video
                            src={result.mediaUrl}
                            controls
                            className="w-full max-h-[400px] object-contain bg-black/5 dark:bg-white/5"
                          />
                        )}
                      </div>

                      <div className="p-4 flex flex-wrap gap-2 justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={copyMediaUrl}
                          className="flex-1 sm:flex-none"
                        >
                          <Link className="mr-2 h-4 w-4" />
                          Copy URL
                        </Button>
                        <Button
                          onClick={downloadMedia}
                          disabled={downloading}
                          size="sm"
                          className="flex-1 sm:flex-none"
                        >
                          {downloading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Downloading...
                            </>
                          ) : (
                            <>
                              <Download className="mr-2 h-4 w-4" />
                              Save to device
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-500 dark:bg-red-900/30 mb-3">
                        <X className="h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">
                        Download Failed
                      </h3>
                      <p className="text-muted-foreground">{result.message}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={clearResult}
                        className="mt-4"
                      >
                        Try Again
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
                How to use MediaWave
              </h2>
              <ol className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 mr-3 shrink-0">
                    1
                  </span>
                  <span>
                    Copy the URL of the social media post you want to download
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 mr-3 shrink-0">
                    2
                  </span>
                  <span>Paste the URL in the input field above</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 mr-3 shrink-0">
                    3
                  </span>
                  <span>Click the Download button and wait for processing</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 mr-3 shrink-0">
                    4
                  </span>
                  <span>Click "Save to device" to download the media</span>
                </li>
              </ol>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </main>
  );
}
