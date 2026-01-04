import { NextRequest, NextResponse } from "next/server";
import ytdl from "ytdl-core";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const videoUrl = searchParams.get("url");

    if (!videoUrl) {
      return NextResponse.json(
        { error: "YouTube URL is required" },
        { status: 400 }
      );
    }

    // Validate YouTube URL
    if (!ytdl.validateURL(videoUrl)) {
      return NextResponse.json(
        { error: "Invalid YouTube URL" },
        { status: 400 }
      );
    }

    // Get video info
    const videoInfo = await ytdl.getInfo(videoUrl);
    const videoDetails = videoInfo.videoDetails;

    // Get available formats
    const formats = ytdl.filterFormats(videoInfo.formats, "videoandaudio");

    // Create response with video info and available formats
    const response = {
      title: videoDetails.title,
      author: videoDetails.author.name,
      thumbnail: videoDetails.thumbnails[0]?.url,
      duration: videoDetails.lengthSeconds,
      formats: formats.map((format) => ({
        itag: format.itag,
        quality: format.qualityLabel,
        container: format.container,
        hasVideo: format.hasVideo,
        hasAudio: format.hasAudio,
        url: format.url,
      })),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("YouTube API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch video information" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { url, format } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: "YouTube URL is required" },
        { status: 400 }
      );
    }

    // Validate YouTube URL
    if (!ytdl.validateURL(url)) {
      return NextResponse.json(
        { error: "Invalid YouTube URL" },
        { status: 400 }
      );
    }

    // Get video info
    const videoInfo = await ytdl.getInfo(url);
    const videoDetails = videoInfo.videoDetails;

    // Get the requested format or default to best quality
    const selectedFormat = format
      ? ytdl.chooseFormat(videoInfo.formats, { quality: format })
      : ytdl.chooseFormat(videoInfo.formats, { quality: "highest" });

    if (!selectedFormat) {
      return NextResponse.json(
        { error: "Requested format not available" },
        { status: 400 }
      );
    }

    // Create a safe filename
    const safeTitle = videoDetails.title
      .replace(/[^a-z0-9]/gi, "_")
      .toLowerCase();
    const filename = `${safeTitle}.${selectedFormat.container}`;

    // Return download info
    return NextResponse.json({
      downloadUrl: selectedFormat.url,
      filename: filename,
      quality: selectedFormat.qualityLabel,
      container: selectedFormat.container,
      title: videoDetails.title,
      author: videoDetails.author.name,
      thumbnail: videoDetails.thumbnails[0]?.url,
      duration: videoDetails.lengthSeconds,
    });
  } catch (error) {
    console.error("YouTube Download Error:", error);
    return NextResponse.json(
      { error: "Failed to process video download" },
      { status: 500 }
    );
  }
}
