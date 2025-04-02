// File: app/api/fetch-media/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { success: false, message: "URL is required" },
        { status: 400 }
      );
    }

    // Fetch the media file
    const response = await axios.get(url, {
      responseType: "arraybuffer",
      headers: {
        // Add user agent to avoid being blocked
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    // Determine content type
    const contentType = response.headers["content-type"];
    const isVideo = contentType?.includes("video");
    const isImage = contentType?.includes("image");

    if (!isVideo && !isImage) {
      return NextResponse.json(
        { success: false, message: "Invalid media type" },
        { status: 400 }
      );
    }

    // Set the appropriate headers for the response
    const headers = new Headers();
    headers.set(
      "Content-Type",
      contentType || (isVideo ? "video/mp4" : "image/jpeg")
    );
    headers.set(
      "Content-Disposition",
      `attachment; filename="mediawave-download-${Date.now()}.${
        isVideo ? "mp4" : "jpg"
      }"`
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
