// File: app/api/fetch-media/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
  try {
    const { url, mediaType } = await request.json();

    if (!url) {
      return NextResponse.json(
        { success: false, message: "URL is required" },
        { status: 400 }
      );
    }

    console.log("Fetching media from URL:", url);
    console.log("Media type from client:", mediaType);

    // Fetch the media file
    const response = await axios.get(url, {
      responseType: "arraybuffer",
      headers: {
        // Add user agent to avoid being blocked
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        // Add referer to avoid CORS issues
        Referer: new URL(url).origin,
      },
      // Increase timeout for large video files
      timeout: 30000,
    });

    // Determine content type from response headers or fall back to the provided mediaType
    let contentType = response.headers["content-type"];
    const isVideoFromHeader = contentType?.includes("video");
    const isImageFromHeader = contentType?.includes("image");

    // If content type is not properly detected from headers, use the mediaType from the client
    if (!isVideoFromHeader && !isImageFromHeader) {
      if (mediaType === "video") {
        contentType = "video/mp4";
      } else if (mediaType === "image") {
        contentType = "image/jpeg";
      }
    }

    console.log("Detected content type:", contentType);

    // Determine file extension
    const isVideo = contentType?.includes("video") || mediaType === "video";
    const fileExtension = isVideo ? "mp4" : "jpg";

    // Set the appropriate headers for the response
    const headers = new Headers();
    headers.set(
      "Content-Type",
      contentType || (isVideo ? "video/mp4" : "image/jpeg")
    );
    headers.set(
      "Content-Disposition",
      `attachment; filename="mediawave-download-${Date.now()}.${fileExtension}"`
    );

    // Return the file as a response
    return new NextResponse(response.data, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Media fetch error:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 }
    );
  }
}

// Increase the body size limit for video content
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "50mb",
    },
    responseLimit: "50mb",
  },
};
