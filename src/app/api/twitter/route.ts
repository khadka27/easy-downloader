import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const videoUrl = searchParams.get("url");

    if (!videoUrl) {
      return NextResponse.json(
        { error: "Twitter URL is required" },
        { status: 400 }
      );
    }

    // Validate Twitter URL
    if (!videoUrl.includes("twitter.com") && !videoUrl.includes("x.com")) {
      return NextResponse.json(
        { error: "Invalid Twitter URL" },
        { status: 400 }
      );
    }

    // For now, return a placeholder response
    // In a real implementation, you would scrape the Twitter page
    // This is a simplified version - you might need to use puppeteer for full functionality
    
    const response = {
      title: "Twitter Video",
      author: "Twitter User",
      thumbnail: null,
      duration: "0",
      videoUrl: videoUrl, // This would be the actual video URL after scraping
      filename: "twitter_video.mp4",
      width: "1920",
      height: "1080"
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Twitter API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch Twitter video information" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: "Twitter URL is required" },
        { status: 400 }
      );
    }

    // Validate Twitter URL
    if (!url.includes("twitter.com") && !url.includes("x.com")) {
      return NextResponse.json(
        { error: "Invalid Twitter URL" },
        { status: 400 }
      );
    }

    // For now, return a placeholder response
    // In a real implementation, you would scrape the Twitter page and extract video URL
    
    const response = {
      downloadUrl: url, // This would be the actual video URL after scraping
      filename: "twitter_video.mp4",
      quality: "1080p",
      container: "mp4",
      title: "Twitter Video",
      author: "Twitter User",
      thumbnail: null,
      duration: "0"
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Twitter Download Error:", error);
    return NextResponse.json(
      { error: "Failed to process Twitter video download" },
      { status: 500 }
    );
  }
} 