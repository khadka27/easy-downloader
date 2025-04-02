// File: app/api/download/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';

// Helper functions for each platform
async function extractInstagramMedia(url: string) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    
    // Look for image in meta tags
    const imageUrl = $('meta[property="og:image"]').attr('content');
    if (imageUrl) {
      return { mediaUrl: imageUrl, mediaType: 'image' as const };
    }
    
    // Look for video in meta tags
    const videoUrl = $('meta[property="og:video"]').attr('content');
    if (videoUrl) {
      return { mediaUrl: videoUrl, mediaType: 'video' as const };
    }
    
    throw new Error('No media found on this Instagram post');
  } catch (error) {
    console.error('Instagram extraction error:', error);
    throw new Error('Failed to extract media from Instagram');
  }
}

async function extractFacebookMedia(url: string) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    
    // Look for image in meta tags
    const imageUrl = $('meta[property="og:image"]').attr('content');
    if (imageUrl) {
      return { mediaUrl: imageUrl, mediaType: 'image' as const };
    }
    
    // Look for video in meta tags
    const videoUrl = $('meta[property="og:video:url"]').attr('content');
    if (videoUrl) {
      return { mediaUrl: videoUrl, mediaType: 'video' as const };
    }
    
    throw new Error('No media found on this Facebook post');
  } catch (error) {
    console.error('Facebook extraction error:', error);
    throw new Error('Failed to extract media from Facebook');
  }
}

async function extractTwitterMedia(url: string) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    
    // Look for image in meta tags
    const imageUrl = $('meta[property="og:image"]').attr('content');
    if (imageUrl) {
      return { mediaUrl: imageUrl, mediaType: 'image' as const };
    }
    
    // Look for video in meta tags
    const videoUrl = $('meta[property="og:video:url"]').attr('content');
    if (videoUrl) {
      return { mediaUrl: videoUrl, mediaType: 'video' as const };
    }
    
    throw new Error('No media found on this Twitter post');
  } catch (error) {
    console.error('Twitter extraction error:', error);
    throw new Error('Failed to extract media from Twitter');
  }
}

async function extractTikTokMedia(url: string) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    
    // Look for video in meta tags
    const videoUrl = $('meta[property="og:video"]').attr('content');
    if (videoUrl) {
      return { mediaUrl: videoUrl, mediaType: 'video' as const };
    }
    
    // Look for image (thumbnail) as fallback
    const imageUrl = $('meta[property="og:image"]').attr('content');
    if (imageUrl) {
      return { mediaUrl: imageUrl, mediaType: 'image' as const };
    }
    
    throw new Error('No media found on this TikTok post');
  } catch (error) {
    console.error('TikTok extraction error:', error);
    throw new Error('Failed to extract media from TikTok');
  }
}

async function extractYouTubeMedia(url: string) {
  try {
    // Extract video ID from URL
    const videoId = url.includes('youtu.be/')
      ? url.split('youtu.be/')[1].split('?')[0]
      : url.includes('v=')
        ? url.split('v=')[1].split('&')[0]
        : null;
        
    if (!videoId) {
      throw new Error('Invalid YouTube URL');
    }
    
    // For YouTube, we'll return the thumbnail as an image
    // Full video download would require a separate service
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    
    return { mediaUrl: thumbnailUrl, mediaType: 'image' as const };
  } catch (error) {
    console.error('YouTube extraction error:', error);
    throw new Error('Failed to extract media from YouTube');
  }
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();
    
    if (!url) {
      return NextResponse.json({ success: false, message: 'URL is required' }, { status: 400 });
    }
    
    let result;
    
    // Determine which platform the URL is from
    if (url.includes('instagram.com')) {
      result = await extractInstagramMedia(url);
    } else if (url.includes('facebook.com')) {
      result = await extractFacebookMedia(url);
    } else if (url.includes('twitter.com') || url.includes('x.com')) {
      result = await extractTwitterMedia(url);
    } else if (url.includes('tiktok.com')) {
      result = await extractTikTokMedia(url);
    } else if (url.includes('youtube.com') || url.includes('youtu.be')) {
      result = await extractYouTubeMedia(url);
    } else {
      return NextResponse.json(
        { success: false, message: 'Unsupported platform. We currently support Instagram, Facebook, Twitter, TikTok, and YouTube' },
        { status: 400 }
      );
    }
    
    return NextResponse.json({
      success: true,
      mediaUrl: result.mediaUrl,
      mediaType: result.mediaType
    });
    
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : 'An unknown error occurred' },
      { status: 500 }
    );
  }
}