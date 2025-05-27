/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import ytdl from "ytdl-core";

// Use a common desktop user agent
const DEFAULT_USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36";

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();
    if (!url) {
      return NextResponse.json(
        { success: false, message: "URL is required" },
        { status: 400 }
      );
    }

    // Validate that it's a proper YouTube URL
    if (!ytdl.validateURL(url)) {
      return NextResponse.json(
        { success: false, message: "Invalid YouTube URL" },
        { status: 400 }
      );
    }

    // Get video info for filename (optional)
    const info = await ytdl.getInfo(url);
    const title = info.videoDetails.title
      .replace(/[^\w\s]/gi, "") // remove special characters
      .replace(/\s+/g, "_") // replace spaces with underscores
      .toLowerCase();

    // Create the video stream.
    // We add requestOptions with our User-Agent.
    const videoStream = ytdl(url, {
      quality: "highestvideo",
      requestOptions: {
        headers: {
          "User-Agent": DEFAULT_USER_AGENT,
        },
      },
    });

    const headers = new Headers();
    headers.set("Content-Type", "video/mp4");
    headers.set("Content-Disposition", `attachment; filename="${title}.mp4"`);

    return new NextResponse(videoStream as any, {
      status: 200,
      headers,
    });
  } catch (error: any) {
    console.error("YouTube download error:", error);
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
