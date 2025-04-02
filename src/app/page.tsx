/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
// File: app/page.tsx
"use client";
import React, { useState } from "react";
import {
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import { ClipLoader } from "react-spinners";

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

    if (!url) return;

    setLoading(true);
    setResult(null);

    try {
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
      } else {
        setResult({
          success: false,
          message: data.message || "Failed to download media",
        });
      }
    } catch (error) {
      setResult({
        success: false,
        message: "An error occurred while processing your request",
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadMedia = async () => {
    if (result?.mediaUrl) {
      try {
        setDownloading(true);

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
      } catch (error) {
        console.error("Download error:", error);
        alert("Failed to download the media. Please try again.");
      } finally {
        setDownloading(false);
      }
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 md:p-24">
      <div className="z-10 w-full max-w-3xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent">
            MediaWave
          </h1>
          <p className="mt-3 text-gray-500">
            Download images and videos from Instagram, Facebook, Twitter,
            TikTok, and more
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <FaInstagram className="text-3xl text-pink-500" />
            <FaFacebook className="text-3xl text-blue-600" />
            <FaTwitter className="text-3xl text-blue-400" />
            <FaTiktok className="text-3xl text-black" />
            <FaYoutube className="text-3xl text-red-600" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste social media URL here"
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition"
            >
              {loading ? <ClipLoader size={20} color="#ffffff" /> : "Download"}
            </button>
          </div>
        </form>

        {result && (
          <div
            className={`p-4 rounded-lg ${
              result.success ? "bg-green-50" : "bg-red-50"
            }`}
          >
            {result.success ? (
              <div className="flex flex-col items-center">
                <p className="text-green-700 mb-3">Media found successfully!</p>
                {result.mediaType === "image" ? (
                  <img
                    src={result.mediaUrl}
                    alt="Downloaded content"
                    className="max-w-full max-h-[400px] object-contain rounded-lg shadow-md"
                  />
                ) : (
                  <video
                    src={result.mediaUrl}
                    controls
                    className="max-w-full max-h-[400px] object-contain rounded-lg shadow-md"
                  />
                )}
                <button
                  onClick={downloadMedia}
                  disabled={downloading}
                  className={`mt-4 ${
                    downloading
                      ? "bg-gray-500"
                      : "bg-green-600 hover:bg-green-700"
                  } text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center min-w-[140px]`}
                >
                  {downloading ? (
                    <>
                      <ClipLoader size={16} color="#ffffff" className="mr-2" />
                      Downloading...
                    </>
                  ) : (
                    "Save to device"
                  )}
                </button>
              </div>
            ) : (
              <p className="text-red-700">{result.message}</p>
            )}
          </div>
        )}

        <div className="mt-12 bg-gray-50 p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">How to use MediaWave</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>
              Copy the URL of the Instagram, Facebook, Twitter, TikTok, or
              YouTube post
            </li>
            <li>Paste the URL in the input field above</li>
            <li>Click the Download button</li>
            <li>Wait for the media to be processed</li>
            <li>Click "Save to device&quot; to download the image or video</li>
          </ol>
        </div>
      </div>
    </main>
  );
}
