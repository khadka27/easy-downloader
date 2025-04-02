/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
"use client";
import type React from "react";
import { useState, useEffect } from "react";
import {
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaTiktok,
  FaYoutube,
  FaDownload,
  FaLink,
  FaTimes,
} from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
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
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

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
          body: JSON.stringify({
            url: result.mediaUrl,
            mediaType: result.mediaType, // Pass the media type to help the API
          }),
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

  if (!mounted) return null;

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
          <p className="mt-3 text-gray-500 dark:text-gray-400">
            Download images and videos from Instagram, Facebook, Twitter,
            TikTok, and more
          </p>
          <div className="flex justify-center gap-6 mt-6">
            <FaInstagram className="text-3xl text-pink-500" />
            <FaFacebook className="text-3xl text-blue-600" />
            <FaTwitter className="text-3xl text-blue-400" />
            <FaTiktok className="text-3xl dark:text-white text-black" />
            <FaYoutube className="text-3xl text-red-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-8 overflow-hidden">
            <form onSubmit={handleSubmit} className="p-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Paste social media URL here"
                    className="w-full p-3 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    disabled={loading}
                    required
                  />
                  {url && (
                    <button
                      type="button"
                      onClick={() => setUrl("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <FaTimes className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition min-w-[120px] flex items-center justify-center"
                >
                  {loading ? (
                    <ClipLoader size={20} color="#ffffff" />
                  ) : (
                    <>
                      <FaDownload className="mr-2" />
                      Download
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
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
              <div
                className={`rounded-lg overflow-hidden shadow-md ${
                  !result.success
                    ? "bg-red-50 dark:bg-red-900/20"
                    : "bg-white dark:bg-gray-800"
                }`}
              >
                {result.success ? (
                  <div className="flex flex-col">
                    <div className="relative">
                      <button
                        onClick={clearResult}
                        className="absolute top-2 right-2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
                        aria-label="Close"
                      >
                        <FaTimes className="h-3 w-3" />
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
                      <button
                        onClick={copyMediaUrl}
                        className="flex-1 sm:flex-none bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium py-2 px-4 rounded-lg flex items-center justify-center"
                      >
                        <FaLink className="mr-2 h-4 w-4" />
                        Copy URL
                      </button>
                      <button
                        onClick={downloadMedia}
                        disabled={downloading}
                        className={`flex-1 sm:flex-none ${
                          downloading
                            ? "bg-gray-500"
                            : "bg-green-600 hover:bg-green-700"
                        } text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center min-w-[140px]`}
                      >
                        {downloading ? (
                          <>
                            <ClipLoader
                              size={16}
                              color="#ffffff"
                              className="mr-2"
                            />
                            Downloading...
                          </>
                        ) : (
                          <>
                            <FaDownload className="mr-2 h-4 w-4" />
                            Save to device
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-500 dark:bg-red-900/30 mb-3">
                      <FaTimes className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-medium mb-2 text-red-800 dark:text-red-200">
                      Download Failed
                    </h3>
                    <p className="text-red-700 dark:text-red-300">
                      {result.message}
                    </p>
                    <button
                      onClick={clearResult}
                      className="mt-4 bg-white hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium py-2 px-4 rounded-lg border border-gray-300 dark:border-gray-600"
                    >
                      Try Again
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-900 dark:text-gray-100">
              How to use MediaWave
            </h2>
            <ol className="space-y-3 text-gray-700 dark:text-gray-300">
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
          </div>
        </motion.div>
      </div>
    </main>
  );
}
